import {products} from "./products.js"

document.querySelector('#categorias').addEventListener('change', updateCategory)

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
}
    updateList(productsInCategoria)
}

function updateList(array){
    document.querySelector()
    array.array.forEach(obj => {
        let container = document.createElement('div')
        container.classList.add('card')

        let tittle = document.createElement('h2')
        tittle.innerText = array.name

        let image = document.createElement('img')
        image.src = array.img

        let container_info = document.createElement('div')
        container_info.classList.add('info-card')
        
        let button_add_cart = document.createElement('button')
        button_add_cart.addEventListener('click',()=>{
            
        })
    });
}