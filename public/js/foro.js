import { mostarMensajes, validarForo } from "./FuncionesBd.js";

window.onload = init ;
function init(){
    mostarMensajes();
    validarForo();
}