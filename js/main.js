


let stockProductos = [
    {id: 1, nombre: "Red Label"    ,cantidad: 1 ,precio: 4000   , img: './img/red_new.png'},
    {id: 2, nombre: "Black Label"  ,cantidad: 1 ,precio: 5900  , img: './img/black_new.png'},
    {id: 3, nombre: "Double Black" ,cantidad: 1 ,precio: 7500   , img: './img/double_black_new.png'},
    {id: 4, nombre: "Gold Reserve" ,cantidad: 1 ,precio: 9500   , img: './img/glr_new.png'},
    {id: 5, nombre: "Green Label"  ,cantidad: 1 ,precio: 11500  ,  img: './img/green_new.png'},
    {id: 6, nombre: "18 Years"     ,cantidad: 1 ,precio: 19500  , img: './img/ager18yrs.png'},
    {id: 7, nombre: "Blue Label"   ,cantidad: 1 ,precio: 29650  , img: './img/blue_new.png'},
]
//modalCarrito
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonPagar = document.getElementById('vaciar-carrito')
const botonVaciar = document.getElementById('vaciar-carrito2')
const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonPagar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    Toastify({
        text: "GRACIAS POR SU COMPRA , HASTA LUEGO!",
        duration: 4000,
        gravity: "top",
        position: "center",
        className: "info",
        style: {
          background: "gold",
        }
      }).showToast();
    
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    Toastify({
        text: "CARRITO VACIO",
        duration: 3000,
        gravity: "top",
        position: "right",
        className: "info",
        style: {
          background: "black",
        }
      }).showToast();
    
})

//productos
const stock = document.querySelector('#carrito-contenedor')


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <img src=${producto.img} alt= "">
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>
    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
        Toastify({
            text: "PRODUCTO AGREGADO",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            className: "info",
            style: {
              background: "brown",
            }
          }).showToast();
        
    })
})

//filtros productos
let precioMenor = stockProductos.filter((stockProductos) => stockProductos.precio <= 9900)
console.table(precioMenor)

let precioMayor = stockProductos.filter((stockProductos) => stockProductos.precio >= 10200)
console.table(precioMayor)


//carrito

const agregarAlCarrito = (prodId) => {

    
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    
    actualizarCarrito()
    
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    Toastify({
        text: "PRODUCTO ELIMINADO",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        className: "info",
        style: {
          background: "black",
        }
      }).showToast();

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 
    
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
}