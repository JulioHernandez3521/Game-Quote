import { validaCorreYContra } from './Funciones.js';
import {  Google, InicioCorreo, resetPass } from './FuncionesBd.js';
// const url =  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;

window.onload = init;

function init(){
    
    //Dar funcionalidad boton de registro
    const registro = document.querySelector('#registro');
        registro.addEventListener('click',()=>{
            window.location = 'Register.html';
        });

    //obtener el form
    const form = document.querySelector('#formLog');
    //Validar campos del formulario
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        
        let contenido = document.querySelector("#oculto");	
        let campo_email_login =  document.querySelector("#correo").value.trim();
        let campo_contraseña_login =  document.querySelector("#contraseña").value.trim();
        let {mensaje, entrar} = validaCorreYContra(campo_email_login,campo_contraseña_login);

        if (entrar == true) {
            contenido.style.setProperty('display', 'block');;
            contenido.innerHTML=mensaje;
            contenido = "";
        }

        else {
            // console.log('Esta funcionando')
            contenido.innerHTML= '';
            InicioCorreo(campo_email_login,campo_contraseña_login)
        }   
    });
    ///Loging con Google
    const google = document.querySelector('#Goo');
    google.addEventListener('click', (e)=>{
        e.preventDefault();
        Google();
    })

    //Restablecer contraseña
    const reset = document.querySelector('#reset');
    reset.addEventListener('click', ()=> {
        let correo = '';
        obtenerCorreo().then((email)=>{
            resetPass(email);
       })
   
    });

    const obtenerCorreo = async() =>{
        const { value: email } = await Swal.fire({
            title: 'Ingrese su correo',
            input: 'email',
            inputLabel: 'Tu direccion email ',
            inputPlaceholder: 'Ingrese aqui su correo'
          })
          return email;
    }

}

