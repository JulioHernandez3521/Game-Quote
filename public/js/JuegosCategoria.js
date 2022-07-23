let categoria = '';
window.onload = ()=>{
    (localStorage.getItem('Cat')) 
    ?  categoria = localStorage.getItem('Cat')
    :  categoria = 'Aventura';

    console.log(categoria)
}

