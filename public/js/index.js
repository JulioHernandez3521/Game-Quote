import { cerrarSesion,checkGet,mostrarDatosUsuario } from "./FuncionesBd.js";

const cerrar = document.querySelector('#bt');
//console.log(cerrar)
cerrar.addEventListener('click',()=>{
   cerrarSesion();
});


// checkGet('Usuarios', mostrarDatosUsuario);