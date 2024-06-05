// Datos para la gráfica de barras
const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let data = [];

let myChart = null;
let ganancias = null;
let horas_trabajadas = null;


function destruirGraficas() {
    if (myChart) {
        myChart.destroy();
    }
    if (ganancias){
        ganancias.destroy();
    }
    if (horas_trabajadas){
        horas_trabajadas.destroy();
    }
    return 0;
}

function generarGrafica(){
    destruirGraficas();
    // Crear la instancia de la gráfica
    let ctx = document.getElementById('myChart')
    if (ctx !== null){
        ctx = ctx.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ventas por mes',
                    data: data,
                    backgroundColor: 'black', // Color de las barras
                    borderColor: '#333333', // Borde de las barras
                    borderWidth: 1
                }]
            },
            options: {
                pointRadius: 0,
                tension: 0.3, // Smoth lines
                plugins:{
                    legend:{
                        display: false,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        beginAtZero: true, // Empezar desde cero en el eje Y
                    }
                }
        }});
    }
    return 0;
}

generarGrafica()

function cargarJSON() {
    const file = document.getElementById('up__input').files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(event) {
        try {
          const objetoJSON = JSON.parse(event.target.result);
          data = objetoJSON;
          generarGrafica();

        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsText(file);
    }
}
