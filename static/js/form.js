'use strict';

// Global const

const REGISTER_OPTION = 'register';
const LOGIN_OPTION = 'login';
const register_url = "https://admio-system-lovat.vercel.app/register/verify";
const login_url = "https://admio-system-lovat.vercel.app/register/verify";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const form = params.get('form');

// Forms
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
	let username, password, email, confirmation;
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
	let username, password, email;
	username = document.querySelector(".login-form .username").value 
	password = document.querySelector(".login-form .password").value 
	email = docuemnt.querySelector(".login-form .email").value
 
	let json ={
		'username':username,
		'password':password,
		'email':email,
	}

	send(json, LOGIN_OPTION, username);
	return 0;
}

