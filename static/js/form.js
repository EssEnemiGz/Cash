'use strict';

// Global const

const REGISTER_OPTION = 'register';
const LOGIN_OPTION = 'login';
const register_url = "https://admio-system-lovat.vercel.app/register/verify";
const login_url = "https://admio-system-lovat.vercel.app/register/verify";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const form = params.get('form');

// Displays

const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');

function change(){
	registerForm.classList.toggle('show');
	loginForm.classList.toggle('show');
};

// Visibility

if (form === REGISTER_OPTION){
	// Pass
} else if (form === LOGIN_OPTION){
	registerForm.classList.toggle('show');
	loginForm.classList.toggle('show');
};

// Forms 

async function options(){
	let url, response, result, option_element, login_element;

	url = `https://${document.domain}/render/centros`;
	response = await fetch(url, { method:"GET", headers:{"Content-Type":"application/json", "Accept":"application/json", mode:"cors", credentials:"same-origin"}});
	result = await response.json();

	const node = document.getElementsByClassName("centro-list");
	for (let cont = 0; cont<result.length; cont++){
		option_element = document.createElement("option");
		option_element.value = result[cont]['id_centro'];
		option_element.innerText = result[cont]['nombre_centro'];
		const copy = option_element.cloneNode(true)

		node[0].appendChild(option_element);
		node[1].appendChild(copy);
	}
}

options()

async function send(data, option){
	let response, url, result;

	if (option === REGISTER_OPTION){
		url = `https://${document.domain}/register/verify`;
	}else{
		url = `https://${document.domain}/login/verify`;
	};

	data = JSON.stringify(data);
	response = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json", "Accept":"application/json", mode:"cors", credentials:"same-origin"} , body:data });
	result = await response.json();

	if (response.ok){
		window.location.href = result['redirect'];
		return 200;
	} else {
		if (response.status === 401){
			alert("¡El usuario no existe o hay información incorrecta!")
		}
		else{
			alert("Error del servidor, intente de nuevo.")
		}
	};
};

function register(){
	let username, password, email, confirmation, id_centro;
	username = document.querySelector(".register-form .username").value 
	password = document.querySelector(".register-form .password").value 
	confirmation = document.querySelector(".register-form .confirm").value
	email = document.querySelector(".register-form .email").value
 
	let json = {
		'username':username,
		'password':password,
		'confirm':confirmation,
		'email':email
	}

	if ( username.length < 1  &&  password.length < 1 ){ // CREATE A ERROR MENSAJE
		return "ERROR";
	} else if (password !== confirmation){
		return "ERROR";
	};

	send(json, REGISTER_OPTION, username);
	return 0;
}

function login(){
	let username, password, email, id_centro;
	username = document.querySelector(".login-form .username").value 
	password = document.querySelector(".login-form .password").value 
	email = docuemnt.querySelector(".login-form .email").value
 
	let json ={
		'username':username,
		'password':password,
		'email':email,
		'id_centro':id_centro
	}

	send(json, LOGIN_OPTION, username);
	return 0;
}

