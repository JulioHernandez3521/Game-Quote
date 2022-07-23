import { cerrarSesion, checkR } from "./FuncionesBd.js";

//Solo valida la contraseña y correo
export const validaCorreYContra = (correo, contraseña) => {

    let mensaje = '';
    let entrar = false;

    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(correo)) {
        mensaje += 'El correo no es valido <br>';
        entrar = true;
    }

    if (contraseña.length < 8 || contraseña.length > 16) {
        mensaje += 'La contraseña debe tener entre 8 y 16 caracteres <br>';
        entrar = true;
    }

    return { mensaje: mensaje, entrar: entrar }
};

//Validacion de campos de registro

export const valRegistro = (contraseña, contraseña1, nombre, apellido, correo) => {

    let mensaje = '';
    let entrar = false;


    if (nombre.length < 6 || nombre.length > 15) {

        mensaje += 'El nombre debe tener mínimo 6 caracteres y maximo 15 <br>';
        entrar = true;
    }
    if (apellido.length < 6 || apellido.length > 15) {

        mensaje += 'El apellido debe tener mínimo 6 caracteres y maximo 15 <br>';
        entrar = true;
    }
    if (contraseña != contraseña1) {
        mensaje += 'Las contraseñas no coinciden <br>';
        entrar = true;
    } else {
        const gh = validaCorreYContra(correo, contraseña);
        mensaje += gh.mensaje;
        entrar = gh.entrar;
    }
    return { mensaje: mensaje, entrar: entrar }

};

export const limpiaCampos = () => {
    document.getElementsByClassName("campo")[0].value = '';
    document.getElementsByClassName("campo")[1].value = '';
    document.getElementsByClassName("campo")[2].value = '';
    document.getElementsByClassName("campo")[3].value = '';
    document.getElementsByClassName("campo")[4].value = '';
}

//Funcoionamiento del nav
//Pagina de inicio
const pagInicio = document.querySelector('#inic');
pagInicio
? pagInicio.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = 'index.html';
})
:console.log('No existe el div');

//Agregar enlaces a las categorias 
let indice = document.querySelectorAll(".categoria");
for(let i=0;i<indice.length;i++){
    let a = document.getElementsByClassName('categoria')[i];
     a.addEventListener('click',()=>{
        localStorage.setItem('Cat', a.getAttribute('category')); // este es para guardar que categoria es
        window.location.href = 'listado-juegos.html';
      });
}
//contacto
const contacto = document.querySelector('#contacto');
contacto.addEventListener('click',()=>{
    window.location.href = 'contacto1.html';
});
const usuarioNav = document.querySelector('#usuario');
const MenuUsuario = document.querySelector('#MenuUsuario');
const agregarjuego = document.querySelector('#agregar-juego');
const editarperfil = document.querySelector('#editar-perfil');
const cerrarsesion = document.querySelector('#cerrar-sesion');
const foro = document.querySelector('#foro');
const historia = document.querySelector('#historia');

checkR(MenuUsuario, usuarioNav);//boton de inicio de sesion 


//Usuario
agregarjuego.addEventListener('click', ()=>{
    window.location.href = 'agregar_juego.html';
});
editarperfil.addEventListener('click', ()=>{
    window.location.href = 'editar-perfil.html';
});
cerrarsesion.addEventListener('click', ()=>{
    cerrarSesion();
});

//Parar los tutos e historia
const pacman = document.querySelector('#pacman');
const naves  = document.querySelector('#naves');
const pong = document.querySelector('#tuto2');
naves.addEventListener('click',()=>{
    window.location.href= 'canvasInvader.html';
})
pacman.addEventListener('click',()=>{
    window.location.href= './src/pacman/pacman.html';
})
pong.addEventListener('click',()=>{
    window.location.href = './src/pong-game-with-javascript/dist/pong.html'
})
//Foro
foro.addEventListener('click',()=>{
    window.location.href = 'foro.html'; 
});
//Historia
historia.addEventListener('click',()=>{
    window.location.href = 'historia-games.html';
});
