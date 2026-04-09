
import {products} from "./products.js"

document.querySelector('#categorias').addEventListener('change', updateCategory)

const cart = []

function updateCategory(){
    const valor_categoria = document.querySelector('#categorias').value
    if(valor_categoria === 'All'){
        updateList(products)
    } else{
    const productsInCategoria = products.filter((obj)=>{
        if(obj.category === valor_categoria){
            return obj
        }
    })
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
        button_add_cart.addEventListener('click',()=>{
            cart.push(
                {id: obj.id}
            )
            updateCart()
            updateTot()
        })
        const price = document.createElement('p')
        price.innerHTML =`${obj.price}$` 

        container.appendChild(tittle)
        container.appendChild(image)
        container_info.appendChild(button_add_cart)
        container_info.appendChild(price)
        container.appendChild(container_info)
        document.querySelector('#products').appendChild(container)
    });
}

function updateCart(){
    let cart_list = document.querySelector('#List_cart')
    cart_list.innerHTML = ''

        cart.forEach((obj)=>{
        const product = products.find((p)=> p.id === obj.id)

        const container = document.createElement('div')

        const tittle = document.createElement('h2')
        tittle.innerText = product.name

        const image = document.createElement('img')
        image.src = product.img

        const container_info = document.createElement('div')

        const remove_button = document.createElement('button')
        remove_button.innerHTML = 'Delete'
        remove_button.addEventListener('click', () => {
        const index = cart.findIndex((item) => item.id === obj.id);
        cart.splice(index, 1);
        updateCart();
        updateTot()
    });

    const price = document.createElement('p')
    price.innerText = `${product.price}$`

    container.appendChild(tittle)
    container.appendChild(image)
    container_info.appendChild(price)
    container_info.appendChild(remove_button)
    container.appendChild(container_info)

    document.querySelector('#List_cart').appendChild(container)
    })
}
function updateTot(){
    const productsInCart = cart.map((obj)=>{
      const sla = products.find((produto)=>{
            if(produto.id === obj.id){
                return produto
            }
        })
        return sla
    })
    // só falta percorrer o array "productsInCart" somando todos os preços dos objetos nele
    const soma = productsInCart.reduce((tot,obj)=>{
      return tot+= obj.price
    },0)
    document.querySelector('#tot').innerText = soma
}
updateList(products)