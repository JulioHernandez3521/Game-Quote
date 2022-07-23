import {check} from "../FuncionesBd.js";
window.onload = init;
function init(){
    Swal.fire({
		title: 'Desea continuar con un pequeño tutorial?',
		// text: "You won't be able to revert this!",
		icon: 'info',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si,continuar'
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Mover arriba',
				text: "Para moverse hacia arriba precione la tecla flecha arriba de su teclado",
				showCancelButton: false,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Continuar'
			}).then((result) => {
				Swal.fire({
					title: 'Mover abajo',
					text: `Para moverse hacia abajo precione la tecla abajo de su teclado`,
					showCancelButton: false,
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Continuar'
				}).then((result) => {
					Swal.fire({
						title: 'instrucciones',
						text: "rebote la pelota y evite dejarla pasar",
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Continuar'
					}).then((result) => {
						
					})
				})
			})
		}
		else {
			
		}
	})


	//Funcoionamiento del nav
//Pagina de inicio
const pagInicio = document.querySelector('#inic');
pagInicio
? pagInicio.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = '../../../index.html';
})
:console.log('No existe el div');

//Agregar enlaces a las categorias 
let indice = document.querySelectorAll(".categoria");
for(let i=0;i<indice.length;i++){
    let a = document.getElementsByClassName('categoria')[i];
     a.addEventListener('click',()=>{
        localStorage.setItem('Cat', a.getAttribute('category')); // este es para guardar que categoria es
        window.location.href = '../../../listado-juegos.html';
      });
}
//contacto
const contacto = document.querySelector('#contacto');
contacto.addEventListener('click',()=>{
    window.location.href = '../../../contacto1.html';
});
const usuarioNav = document.querySelector('#usuario');
const MenuUsuario = document.querySelector('#MenuUsuario');
const agregarjuego = document.querySelector('#agregar-juego');
const editarperfil = document.querySelector('#editar-perfil');
const cerrarsesion = document.querySelector('#cerrar-sesion');
const foro = document.querySelector('#foro');
const historia = document.querySelector('#historia');

check(MenuUsuario, usuarioNav);//boton de inicio de sesion 


//Usuario
agregarjuego.addEventListener('click', ()=>{
    window.location.href = '../../../agregar_juego.html';
});
editarperfil.addEventListener('click', ()=>{
    window.location.href = '../../../editar-perfil.html';
});
cerrarsesion.addEventListener('click', ()=>{
    cerrarSesion();
});

//Parar los tutos e historia
const pacman = document.querySelector('#pacman');
const naves  = document.querySelector('#naves');
const pong = document.querySelector('#tuto2');
naves.addEventListener('click',()=>{
    window.location.href= '../../../canvasInvader.html';
})
pacman.addEventListener('click',()=>{
    window.location.href= '../../pacman/pacman.html';
})
pong.addEventListener('click',()=>{
    window.location.href = '../../../pong.html'
})
//Foro
foro.addEventListener('click',()=>{
    window.location.href = '../../../foro.html'; 
});
//Historia
historia.addEventListener('click',()=>{
    window.location.href = '../../../historia-games.html';
});

}