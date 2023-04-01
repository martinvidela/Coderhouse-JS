
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})
const showAlert = () => {
  Swal.fire('Enhorabuena!', 'Compra realizada con exito!', 'success')
}


//FUNCION PARA AGREGAR AL CARRO
function addToCarritoItem(e) {
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem) {

  const alert = document.querySelector('.alert')

  setTimeout(function () {
    alert.classList.add('hide')
  }, 2000)
  alert.classList.remove('hide')



  const InputElemento = tbody.getElementsByClassName('input__elemento')
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemento[i]
      inputValue.value++
      CarritoTotal()
      return null;
    }
  }

  carrito.push(newItem)

  renderCarrito()
}
//RENDER
function renderCarrito() {
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
      
      <th scope="row">1</th>
              <td class="table__productos">
                <img src=${item.img}  alt="">
                <h6 class="title">${item.title}</h6>
              </td>
              <td class="table__price"><p>${item.precio}</p></td>
              <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
              </td>
      
      `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}
//TOTAL DEL CARRITO
function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio * item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}
//REMOVER ITEM DEL CARRITO
function removeItemCarrito(e) {
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {

    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1)
    }
  }
  tr.remove()
  CarritoTotal()
}
//SUMA DE PRECIO SI CAMBIA EL VALUE
function sumaCantidad(e) {
  const sumaInput = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}


//LOCALSTORAGE
window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage;
    renderCarrito()
  }
}

const botoncomprar = document.querySelector('.botoncomprar')
botoncomprar.onclick = showAlert

// API PRECIO DOLAR ACTUAL BLUE

fetch('https://criptoya.com/api/dolar')
  .then(response => response.json())
  .then((data) => {

    const dolar1 = document.querySelectorAll('#dolar1')
    dolar1.forEach((zapatillas) => {
      zapatillas.textContent = `USD: ${Math.round(70000/data.blue)}`
    })
    const dolar2 = document.querySelectorAll('#dolar2')
    dolar2.forEach((zapatillas) => {
      zapatillas.textContent = `USD: ${Math.round(80000/data.blue)}`
    })
    const dolar3 = document.querySelectorAll('#dolar3')
    dolar3.forEach((zapatillas) => {
      zapatillas.textContent = `USD: ${Math.round(87000/data.blue)}`
    })
    const dolar4 = document.querySelectorAll('#dolar4')
    dolar4.forEach((zapatillas) => {
      zapatillas.textContent = `USD: ${Math.round(100000/data.blue)}`
    })
  });





