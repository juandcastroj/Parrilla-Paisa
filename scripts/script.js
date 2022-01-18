let items = document.getElementById('items')
let template = document.getElementById('template-card').content;
let fragment = document.createDocumentFragment();

let productoModal = document.getElementById('modal-content')
let listarPlato = document.getElementById('listarPlato')
// let preparacion = document.getElementById('preparacion')


const url=('http://localhost:4000/productos')

//ejecuta la funcion mostrar  
document.addEventListener('DOMContentLoaded', () => {
    Mostrar(url)
})
// siempre que uso una api de json debo hacer promesas
//promesa
const Mostrar = async(url) =>
{
    const rest = await fetch(url); // fetch para poder llamar y conectar la api json 
    const data = await rest.json();// convierte el url en el dato a un json 
      console.log(data);
    // recorrer el Json
     data.forEach(element => {
        // primero desesturcturar el arreglo
        const { id, nombre  , foto } = element
        //despues de desesturcturar lo uso 
        template.querySelector('h5').textContent=nombre;
        template.querySelector('img').setAttribute('src',foto)
        template.querySelector('button').setAttribute('id',id)
        // crear una constante llamada clone para solo clonar en template
        const clone = template.cloneNode(true);
        // crea un clone que esta habilitado 
        fragment.appendChild(clone)
        // fragment es la variable donde se mostrara lo del json
    });

    // mostrar todo en el espcio de items 
    items.appendChild(fragment)
     // se llaman los nodos que se realizaron en fragment 
   }



//ahora para mostar los modales  

 items.addEventListener('click',(e)=>{
        if(e.target.classList.contains('Mostrar'))
        {console.log(e.srcElement.id)}
        
        let idProducto = e.target.id;
        mostrarRecetas(idProducto);
        console.log(idProducto)
    })
    const mostrarRecetas = async (idProducto) => {
        const rest = await fetch(url);
        const data = await rest.json();
      
        productoModal.innerHTML = '';
        listarPlato.innerHTML = '';
       

        data.forEach((producto) => {
          const { id, nombre, consta_de ,foto} = producto;
          if (id == idProducto) {

            productoModal.innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${nombre}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <img src="${foto}" width="100%" alt="">
                </div>
              <h5 class="px-5">Contiene</h5> <br/>`;
      
            for (let i = 0; i < consta_de.length; i++) {
            productoModal.innerHTML += `<li class="px-5">${consta_de[i]}</li>`;}
      
            }
        });
       }