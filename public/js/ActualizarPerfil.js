import { actualizarDatos, checkGet,mostrarDatosUsuario, setUserData } from "./FuncionesBd.js";
window.onload = init; 

 function init(){
    const actualizar = document.querySelector('#actualizar');
     const divs = {
         perfil:document.querySelector('#datos') ,               
         correo:document.querySelector('#correo') ,
         usuario:document.querySelector('#usuarion') ,
         nombre:document.querySelector('#nombre') ,
         apellido:document.querySelector('#apellido') ,
     }
    
     checkGet('Usuarios', mostrarDatosUsuario, divs);//funcoin para checar que este logeado y mostrar datos

     actualizar.addEventListener('click',(e)=>{
         e.preventDefault()
         actualizarDatos(divs);
     });
     const contra = document.querySelector('#con');
     contra.addEventListener('click',()=>{
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