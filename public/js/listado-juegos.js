import { mostrarListadoJuegos } from "./FuncionesBd.js";
window.onload= init;
function init(){
    
    (localStorage.getItem('Cat'))
    ? mostrarListadoJuegos(localStorage.getItem('Cat'))
    : Swal.fire("No hay elementos que mostrar", "", "info");
    
}