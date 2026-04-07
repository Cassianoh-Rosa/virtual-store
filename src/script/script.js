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
    document.querySelector()
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
        button_add_cart.addEventListener('click',()=>{
            cart.push(
                {id: obj.id,
                quantity: quantity+1,
                }
            )
        })
    });
}