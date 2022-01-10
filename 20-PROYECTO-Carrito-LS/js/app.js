// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners (){
    //Cuando agregas un curso precionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //eliminacursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos del localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //Vaciar carrito
    vaciarCarrito.addEventListener('click', limpiarTodo);
};

//Funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
};

//Elimina el curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo por el id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    };
};

//Limpiar todo el carrito
function limpiarTodo(e){
    e.preventDefault();
    if(e.target.id === 'vaciar-carrito'){
        articulosCarrito = [];
        limpiarHTML();
    };
       
};

//Lee el contenido del HTML donde dimos click
function leerDatosCurso(curso){
    console.log(curso);

    //Crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        total: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Revisa si ya un elemento existe en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualiza la cantidad
        const cursos = articulosCarrito.map( curso => {    
            if(curso.id === infoCurso.id){
                let totalSuma = parseInt(curso.precio.slice(1)) * (curso.cantidad + 1);
                curso.total = `$ ${totalSuma}`;
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
        
    }else{
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
};


//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y agrega el html
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, total, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${imagen}" width = "100px">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${total}</td>
            <td>${cantidad}</td>
            <td>
                <a href = "#" class = "borrar-curso" data-id = "${id}" > X </a>
            </td>
         `;
    //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito de compras al localStorage
    sirconizarStorage();
};

function sirconizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina cursos del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};