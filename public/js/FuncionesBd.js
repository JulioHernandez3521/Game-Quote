//Inicio de Sesion Si funbcoina pero no se usa por que es mas pedo
const getUser = async (url, correo, contraseña) => {
    let datos = {
        email: correo,
        password: contraseña,
        returnSecureToken: true
    };
    const resp = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(datos)
    })
    console.log(resp)
    if (resp.status === 200) {
        const data = await resp.json();
        const { idToken, localId, displayName, email } = data;
        console.log(data)
        //Enves de imprimir guardar en localStorage 
        console.log(`token: ${idToken}`)
        console.log(`IdUser: ${localId}`)
    }
}

//Guardar datos de usuario
// Add a new document in collection "cities"
export const setUserData = async (Id, coleccion, datos) => {
    return await fs.collection(coleccion).doc(Id).set(datos)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

}
export const addDatos = async (coleccion, datos) => {
    return await fs.collection(coleccion).add(datos)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

}

//Registro de usuarios
export const CreateUserEmail = async (correo, contra) => {

    let val = await auth
        .createUserWithEmailAndPassword(correo, contra)
        .then(result => {
            auth.currentUser.sendEmailVerification();
            console.log('succes')
            return { val: true, Id: result.user.uid };
        })
        .catch(resp => {
            console.log(resp.message)
            return false;
        })
    return { val: val }
}


//Registro con google
export const Google = () => {
    const provaider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provaider)
        .then(result => {
            Swal.fire("Usuario Registrado", "", "success");
            setUserData(result.user.uid, 'Usuarios', {
                nombre: result.user.displayName,
                correo: result.user.email,
                apellido: '',
                usuario: ''
            })
                .then((res) => {
                    if (result.user.emailVerified === true) {
                        Swal.fire("Bienvenido", "", "success");
                        window.location.href = 'index.html'
                    } else {
                        Swal.fire("El correo no ha sido verificado", "", "error");
                    }
                })
                .catch(err => console.log(err))
            // console.log(result.credential)
            // console.log(result.credential.accessToken)
            // console.log(result.user)
            // console.log(result.user.displayName)
            // console.log(result.user.email)
            // console.log(result.user.uid)
            // console.log(result.user.emailVerified)
        })
        .catch(err => {
            console.log(err)
        })
}

//Inicio de sesion Correo
export const InicioCorreo = (email, password) => {
    // Authenticate the User
    auth.signInWithEmailAndPassword(email, password).then((result) => {
        // clear the form
        // console.log(result.user);
        // console.log(result.user.displayName)
        // console.log(result.user.email)
        // console.log(result.user.uid)
        // console.log(result.user.emailVerified)
        if (result.user.emailVerified === true) {
            Swal.fire("Bienvenido", "", "success");
            window.location.href = 'index.html'
        } else {
            Swal.fire("El correo no ha sido verificado", "", "error");
        }

    }).catch(resp => {
        console.log(resp.code)
        console.log(resp.message)
        Swal.fire(resp.message, "", "error");
    })
}

//Cerrar Sesion
export const cerrarSesion = () => {
    auth.signOut().then((resp) => {
        Swal.fire("Secion cerrada", "", "success");
    })
        .catch((err) => console.log(err));

}

//Mostrar datos de usuario
export const mostrarDatosUsuario = (userId, data, divs) => {
    const { perfil, correo, usuario, nombre, apellido } = divs;
    let plantilla = '';
    if (data.length) {
        data.forEach((doc) => {
            // console.log(doc.id)
            let datos = doc.data()
            if (doc.id === userId) {
                correo.value = datos.correo;
                usuario.value = datos.usuario;
                nombre.value = datos.nombre;
                apellido.value = datos.apellido;
                plantilla = `
                        <p><span>Nombre:</span>  ${datos.nombre}</p>
                        <p><span>Apellido:</span>${datos.apellido}</p>
                        <p><span>Correo:</span>  ${datos.correo}</p>
                        <p><span>Usuario:</span> ${datos.usuario}</p>
                   `;
                perfil.innerHTML = plantilla;
            }
            // else 
            //     datos = 'Inicia sesion';

        });
    } else {
        console.log('Inicia secion para ver')
        perfil.innerHTML = '<p>Inicia Sesion para actualizar datos</p>';
        correo.value = '';
        usuario.value = '';
        nombre.value = '';
        apellido.value = '';
    }
};

///Mostrar lista de juegos por categoria
export const mostrarListadoJuegos = (coleccion) => {
    const div = document.querySelector('#container-juegos');
    fs.collection(coleccion)
        .get()
        .then((snapshot) => {
            let data = snapshot.docs;
            if (data.length) {
                data.forEach((doc) => {
                    // console.log(doc.id)
                    const post = doc.data();
                    // console.log(post)
                    div.innerHTML += `
                <div class="foro-description">
                    <div class="foro-preguntas">
                        <img src="${post.archivo}" alt="">
                    </div>
                    <div class="foro-preguntas-respuesta">
                        <p class="foro-user"><a class="juego" id="${doc.id}" href="mostrar-juego.html">${post.nombre}</a></p>
                        <p>${post.sipnosis}</p>
                    </div>
                 </div>
                `
                });
                //postList.innerHTML = html;
                let indice = document.querySelectorAll(".juego");
                for (let i = 0; i < indice.length; i++) {
                    let a = document.getElementsByClassName('juego')[i];
                    a.addEventListener('click', () => {
                        localStorage.setItem('juegoId', a.getAttribute('id')); // este es para guardar que categoria es
                        // localStorage.removeItem('Cat')
                        // window.location.href = "../html/mostrar-juego.html";
                    });
                }
            } else {
                console.log('No hay contenido que mostrar')
                Swal.fire("No hay elementos que mostrar", "", "info");
                //postList.innerHTML = '<h4 class="text-white">Login to See Posts</h4>';
            }
        });
};
//Mostar juego 
export const mostrarDatosJuego = (coleccion, docId, contenedor, estrellasN, divs, imagen) => {
    const { titulo, estrellaCont, descripcion, imagencont } = divs;
    // console.log(divs)
    let plantilla = '';
    fs.collection(coleccion)
        .get()
        .then((snapshot) => {
            let data = snapshot.docs;
            if (data.length) {
                data.forEach((doc) => {
                    // console.log(doc.id)
                    let datos = doc.data()
                    if (doc.id === docId) {
                        let num = datos.estrellas;
                        descripcion.innerHTML = datos.descripcion;
                        titulo.innerHTML = datos.nombre;
                        estrellaCont.innerHTML = estrellasN[num];
                        imagencont.src = datos.archivo;

                    }

                });
            } else {
                console.log('Inicia secion para ver')

            }

        });
}


//Editar datos de usuario
//Checar si el usuario se autentifico  y devolevr datos de usuario
export const check = (menu, usuario) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            //console.log(user)
            usuario.innerHTML = `${user.email}`
            menu.style.visibility = "visible";
        } else {
            console.log('logeate')
            menu.style.visibility = "hidden";
            usuario.innerHTML = `IniciaSesion`
            usuario.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
            //loginCheck(user);
        }
    });
}
export const checkR = (menu, usuario) => {
    auth.onAuthStateChanged((user) => {
        // console.log(user)
        if (user && user.emailVerified ) {
            //console.log(user)
            usuario.innerHTML = `${user.email}`
            menu.style.visibility = "visible";
        } else {
            console.log('logeate')
            menu.style.visibility = "hidden";
            usuario.innerHTML = `IniciaSesion`
            usuario.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
            //loginCheck(user);
        }
    });
}
//Checar si el usuario se autentifico retorna true 
export const checkUsuario = async () => {
    let x = false;
    await auth.onAuthStateChanged((user) => {
        if (user) {
            return x = true;
        }
        else {
            return x = false;
        }
    });
    return x;

}
//Checar si el usuario esta autentificado  y llamar una funcion de peticion de datos
export const checkGet = (coleccion, callback, divs) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("signin");
            fs.collection(coleccion)
                .get()
                .then((snapshot) => {
                    callback(user.uid, snapshot.docs, divs);//Calquier funcion que pida datos
                    //loginCheck(user);
                });
        } else {
            callback([], [], divs);
            //loginCheck(user);
        }
    });
}
//checkGet('Usuarios', mostrarDatosUsuario);
//Restablecimiento de contrasaeña
export const resetPass = (correo) => {

    auth.sendPasswordResetEmail(correo).then(function () {
        Swal.fire("", `Se ha enviado un enlace de recuperacion a su correo: ${correo} `, "success");
    }).catch((error) => {
        Swal.fire("No pudimos restablecer su contraseña", "", "error");
    });
}

///Actualiar datos
export const actualizarDatos = (divs) => {
    const { perfil, correo, usuario, nombre, apellido } = divs;
    let datos = {
        correo: correo.value,
        usuario: usuario.value,
        nombre: nombre.value,
        apellido: apellido.value,
    }
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("signin");
            fs.collection('Usuarios')
                .get()
                .then((snapshot) => {
                    setUserData(user.uid, 'Usuarios', datos);//Calquier funcion que pida datos
                    checkGet('Usuarios', mostrarDatosUsuario, divs);
                });
        } else {
            Swal.fire("Inicie sesion para actualizar", "", "error");
            //loginCheck(user);
        }
    });
}

///Foro
export const mostarMensajes = () => {

    let body = document.querySelector('#coment');
    fs.collection("Foro").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let datos = doc.data();
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            body.innerHTML += `<div id="${doc.id}" class="foro-description">
            <div class="foro-preguntas">
                <p class="foro-user">${datos.usuario}</p>
                <p class="foro-user">${datos.fecha}</p>
            </div>
            <div class="foro-preguntas-respuesta">
                <p>${datos.mensaje}</p>
            </div>
        </div>`
        });
    });
}

export const validarForo = () => {
    const add = document.querySelector('#f');
    auth.onAuthStateChanged((user) => {
        if (user) {
            //Show mostrar el div para comentarios
            add.innerHTML = `
                <div id="add" class="foro-inputs">
                    <div class="foro-inputs-add">
                         <textarea name="" id="mensaje" cols="30" rows="10" placeholder="Ingrese su pregunta"></textarea>
                            <div class="foro-inputs-add-button">
                                <button id="agregar">Agregar</button>
                            </div>
                    </div>
                </div>
            `;
            const mensaje = document.querySelector('#mensaje');
            const boton = document.querySelector('#agregar');
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                const f = new Date();
                console.log(mensaje.value)
                let datos = {
                    fecha: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
                    mensaje: mensaje.value,
                    usuario: user.email
                }

                fs.collection('Foro').add(datos)
                    .then(() => {
                        console.log("Document successfully written!");
                        mostarMensajes();
                        mensaje.value = '';
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            });
        } else {
            //loginCheck(user);
            add.innerHTML = '';
        }
    });
}

//obtener colecciones
// fs.collection('Usuarios')
//     .get()
//     .then((snapshot) => {

//     });

//Subcolecciones
// fs.collection('Foro').doc(user.uid).collection('Mensaje').add(datos)//Accede ala coleccion luego al documento y luego a otra coleccion donde agrega documentos con id automatico
// .then(() => {
//     console.log("Document successfully written!");
// })
// .catch((error) => {
//     console.error("Error writing document: ", error);
// });