import { mostrarDatosJuego } from "./FuncionesBd.js";

window.onload = init;
function init (){
    const estrellas = 
    [
        ``,
        `<i class="fas fa-star"></i>`,
        `<i class="fas fa-star"></i><i class="fas fa-star"></i>`,
        `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`,
        `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`,
        `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
    ]
    const divs =
    {
        descripcion:document.querySelector('#descripcion') ,
        estrellaCont:document.querySelector('#estrellas') ,
        titulo:document.querySelector('#titulo') ,
        imagencont:document.querySelector('#imagen') ,
    }
    const  contenido = document.querySelector('#contenido');
    
    (localStorage.getItem('juegoId')&& localStorage.getItem('Cat'))
    ? mostrarDatosJuego(localStorage.getItem('Cat'),localStorage.getItem('juegoId'),contenido,estrellas,divs,'')
    : Swal.fire("No hay elementos que mostrar", "", "info");
    
}