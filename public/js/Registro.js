window.onload = iniciar;
import { limpiaCampos, valRegistro } from './Funciones.js';
import { CreateUserEmail, Google, setUserData } from './FuncionesBd.js';


function iniciar() {

   

    const form = document.querySelector('#formR');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let contenido = document.querySelector("#oculto");
        let nombre = document.getElementsByClassName("campo")[0].value;
        let apellido = document.getElementsByClassName("campo")[1].value;
        let correo = document.getElementsByClassName("campo")[2].value;
        let contraseña = document.getElementsByClassName("campo")[3].value;
        let contraseña1 = document.getElementsByClassName("campo")[4].value;
        let { mensaje, entrar } = valRegistro(contraseña, contraseña1, nombre, apellido, correo);
        const datos ={
            nombre: nombre,
            correo: correo,
            apellido: apellido,
            usuario: '',
        };

        if (entrar == true) {
            contenido.style.setProperty('display', 'block');
            contenido.style.setProperty('color', 'red');
            contenido.innerHTML = mensaje;
            mensaje = '';
            setTimeout(function () { contenido.innerHTML = mensaje; }, 1500);
        }

        else {
            //Llamar funcion para validar el usuario
            const registro = async () => {
                const { val } = await CreateUserEmail(correo, contraseña);
                if (val.val) {
                    setUserData(val.Id,'Usuarios',datos)
                    .then(()=>{
                        Swal.fire("Usuario Registrado", "Se envio un correo de confirmacion a la direccion de correo registrada", "success");
                        limpiaCampos();
                    })
                    .catch((err)=>Swal.fire("¡Registro cancelado", err, "error"));
                    
                } else {
                    Swal.fire("¡Registro cancelado", "el correo ya se encuentra registrado", "error");
                    limpiaCampos();
                }
            }
            registro();

            //getUser(url,campo_email_login,campo_contraseña_login);
        }

    });

    const googleRegistro = document.querySelector('#Go');
    googleRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        Google();
    })

}

