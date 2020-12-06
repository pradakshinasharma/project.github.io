
function display_products() {

    var cards = ''

    var all_products = JSON.parse(localStorage.getItem('itemsJson'))

    if (all_products != null) {
        for (let item of all_products) {
            cards = cards + `     
            <div class="card ">
            <button class="close-modal hidden">&times;</button>
            <h3 class="price"> ${item.title} </h3>
            <img src=" ${item.image}  "
                alt="" class="card-img">
                <h3 class="price">
                <span style='font-size:25px;'> &#8377; ${item.price}</span>
                </h3>
                <div class="rating"> `

            for (i = 0; i < item.rating; i++) {
                cards = cards + ' <span class="fa fa-star checked"></span>  '
            }

            for (i = 0; i < (5 - item.rating); i++) {
                cards = cards + ' <span class="fa fa-star "></span>  '
            }
            cards = cards + ` 
                
                </div>
             <a class="card-btn" onclick="add_cart( ${item.id}  )" >Add To Cart</a>
             </div>
             
        `
        }
        document.getElementById('shop_cards').innerHTML = cards
    }
    else {

        document.getElementById('shop_cards').innerHTML = '<h1> No Products in Shop </h1>'
    }

}


display_products()





// switching cart and shop sections 

function show_cart() {
    display_cart()
    document.getElementById('shop_cart').style.display = 'block'
    document.getElementById('shop_main').style.display = 'none'
}


function show_shop() {
    document.getElementById('shop_cart').style.display = 'none'
    document.getElementById('shop_main').style.display = 'block'
    document.getElementById('shop_cards').style.display = 'flex'
}



// Adding a product into cart 

var cart_products = {}




function add_cart(prod_id) {

    var all_products = JSON.parse(localStorage.getItem('itemsJson'))

    if (cart_products[prod_id]) {

        cart_products[prod_id]['quantity'] += 1
        cart_products[prod_id]['cart_price'] += cart_products[prod_id]['price']
        // console.log(cart_products)
        return
    }

    // For the first time adding in cart_products 
    for (let item of all_products) {
        if (item.id == prod_id) {
            cart_products[prod_id] = item
            cart_products[prod_id]['cart_price'] = cart_products[prod_id]['price']
            cart_products[prod_id]['quantity'] = 1
            return
        }
    }

}






function display_cart() {

    all_carts_item = ""

    console.log(cart_products)

    if (Object.keys(cart_products).length > 0) {


        for (item_key in cart_products) {
            all_carts_item += `
        
            <div class="cart_items">
            <h2 class="cart-title">${cart_products[item_key].title}</h2>
                <div class="cart-img">
                <img src="${cart_products[item_key].image}" alt="No Image">
                </div>
                <h2 class="cart-quantity">${cart_products[item_key].quantity}</h2>
                <h3 class="cart-price">${cart_products[item_key].cart_price}</h3>
                <a class="delete" onclick="delete_prod( ${item_key} )">Delete</a>
            </div>
        
            `
        }
        document.getElementById('shop_cart').innerHTML = all_carts_item
    }
    
    else {
        document.getElementById('shop_cart').innerHTML = ' <h1 id="no-cart">  No Products Added !!! </h1>'
    }
}




function delete_prod(prod_key) {
    delete cart_products[prod_key]
    display_cart()
}










// Model Js part for each card 

image_click = document.querySelectorAll('.card-img')
card = document.querySelectorAll('.card');
btnCloseModal = document.querySelectorAll('.close-modal');
before_blur = document.querySelector('.blur');



for (let i=0 ; i < image_click.length ; i++) {

    image_click[i].addEventListener('click', () => {
        
        card[i].classList.add('modal');
        before_blur.classList.add('overlay');
        btnCloseModal[i].classList.remove('hidden');

    });
    
}


for (let i=0 ; i < btnCloseModal.length ; i++) {

    btnCloseModal[i].addEventListener('click', () => {
        
        card[i].classList.remove('modal');
        btnCloseModal[i].classList.add('hidden');
        before_blur.classList.remove('overlay');

    });
    
}

