import { addDatos, checkUsuario } from "./FuncionesBd.js";

window.onload = init;
function init() {

    let boton = document.querySelector('#add');

    boton.addEventListener('submit', (e) => {
        e.preventDefault();
        const file = document.querySelector('#file').files[0];
        const name = new Date() +'-'+ file.name;
        let datos =
        {
            nombre: document.querySelector('#nombre').value,
            sipnosis: document.querySelector('#sipnosis').value,
            categoria: document.querySelector('#categoria').value,
            estrellas: document.querySelector('#input-estrellas').value,
            descripcion: document.querySelector('#descripcion').value,
            archivo: '',
        }
        
        const imagen = ()=>{
            const metadata = {
                contentType: file.type
            }
            const task = storage.child(name).put(file,metadata);
            task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url =>{
                datos.archivo = url;
                // console.log(datos)
                addDatos(datos.categoria, datos)
                .then(() => {
                    Swal.fire("Datos Registrado", "", "success");
                    document.querySelector('#nombre').value = '';
                    document.querySelector('#sipnosis').value = '';
                    document.querySelector('#categoria').value = '';
                    document.querySelector('#input-estrellas').value = '';
                    document.querySelector('#descripcion').value = '';
                    document.querySelector('#file').value = '';
                }).catch(error=> Swal.fire(error, "", "error"))
            }).catch(error =>  Swal.fire(error, "", "error"))
        }
        checkUsuario()
            .then((x) => {
                (x)
                    ? (file != null)
                        ?
                            imagen()
                            
                        :  Swal.fire("Debe seleccionar un archivo jpg o png", "", "info")
                    :
                        Swal.fire("Inicia sesion", "", "error")
                        document.querySelector('#nombre').value = '';
                        document.querySelector('#sipnosis').value = '';
                        document.querySelector('#categoria').value = '';
                        document.querySelector('#input-estrellas').value = '';
                        document.querySelector('#descripcion').value = '';
                        document.querySelector('#file').value = '';    
                    ;
            }).catch((x) => x)

    });
}