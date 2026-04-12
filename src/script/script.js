import { products } from "./products.js"

document.querySelector('#categorias').addEventListener('change', updateCategory)

let cart = JSON.parse(localStorage.getItem('cart')) || []

function updateCategory(){
    const valor_categoria = document.querySelector('#categorias').value

    if(valor_categoria === 'All'){
        updateList(products)
    } else {
        const productsInCategoria = products.filter(obj => obj.category === valor_categoria)
        updateList(productsInCategoria)
    }
}

function updateList(array){
    document.querySelector('#products').innerHTML = ''

    array.forEach(obj => {
        let container = document.createElement('div')
        container.classList.add('card')

        let tittle = document.createElement('h2')
        tittle.innerText = obj.name

        let image = document.createElement('img')
        image.src = obj.img

        let container_info = document.createElement('div')
        container_info.classList.add('info-card')
        
        let button_add_cart = document.createElement('button')
        button_add_cart.innerText = 'Add'
        button_add_cart.addEventListener('click', () => {

            const existingProduct = cart.find(item => item.id === obj.id)

            if (existingProduct) {
                existingProduct.quantity++
            } else {
                cart.push({ id: obj.id, quantity: 1 })
            }

            updateCart()
            updateTot()
            saveCart()
        })

        const price = document.createElement('p')
        price.innerHTML = `${obj.price}$`

        container.appendChild(tittle)
        container.appendChild(image)
        container_info.appendChild(button_add_cart)
        container_info.appendChild(price)
        container.appendChild(container_info)

        document.querySelector('#products').appendChild(container)
    })
}

function updateCart(){
    let cart_list = document.querySelector('#List_cart')
    cart_list.innerHTML = ''

    cart.forEach((obj) => {
        const product = products.find(p => p.id === obj.id)

        const container = document.createElement('div')

        const tittle = document.createElement('h2')
        tittle.innerText = product.name

        const image = document.createElement('img')
        image.src = product.img

        const quantity = obj.quantity
        const qtyText = document.createElement('p')
        qtyText.innerText = `Qtd: ${quantity}`  

        const container_info = document.createElement('div')

        const remove_button = document.createElement('button')
        remove_button.innerText = 'Delete'
        remove_button.addEventListener('click', () => {
            if (obj.quantity > 1) {
                obj.quantity--
            } else {
                const index = cart.findIndex(item => item.id === obj.id)
                cart.splice(index, 1)
            }

            updateCart()
            updateTot()
            saveCart()
        })

        const price = document.createElement('p')
        price.innerText = `${product.price}$`

        container.appendChild(tittle)
        container.appendChild(image)
        container_info.appendChild(price)
        container_info.appendChild(remove_button)
        container.appendChild(container_info)
        container.appendChild(qtyText)

        cart_list.appendChild(container)
    }) 
}

function updateTot(){
    const soma = cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id)
        return total + (product.price * item.quantity)
    }, 0)

    document.querySelector('#tot').innerText = soma
}

document.querySelector('#search_input').addEventListener('input', handleSearch)

function handleSearch(){
    const searchValue = document.querySelector('#search_input').value.toLowerCase()

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    )

    updateList(filteredProducts)
}
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

updateList(products)
updateCart()
updateTot()