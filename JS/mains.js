
//Open Cart
function showCart(event) {
    let cart = document.querySelector(".cart")
    cart.classList.add('active')
};

//Close Cart
function closeCart(event) {
    let cart = document.querySelector(".cart")
    cart.classList.remove("active");
};

function addProduct(event) {
    let imgSrc = event.target.parentElement.querySelector('.product-img').src
    let productTitle = event.target.parentElement.querySelector('.product-title').innerText
    let price = event.target.parentElement.querySelector('.price').innerText


    let productHTML =
        `<div class="cart-box">
            <img src="${imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${productTitle}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!--Remove Cart-->
            <i class='bx bxs-trash-alt cart-remove' onclick="removeCartItem(this)"></i>
        </div>`

    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = productHTML;

    document.querySelector('.cart-content').appendChild(tempWrapper.firstChild);

    updateTotal()
    quantityChanges()
}


// Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

//Making Function
function ready() {

    var addCartButtons = document.getElementsByClassName('add-cart')

    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i]
        button.addEventListener('click', addProduct)
    }
}
//Quantity Changes
function quantityChanges() {
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);

    }
    //Add To Cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    
    }


}
//REmove Items from Cart
function removeCartItem(event) {
    event.parentElement.remove()
    updateTotal()
}
//Quantity Changed
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// //Add To Cart
// function addCartClicked(event) {
//     var button = event.target
//     var shopProducts = button.parentElement
//     var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
//     var price = shopProducts.getElementsByClassName("price")[0].innerText;
//     var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
//     addProductToCart(price, title, productImg);
//     updateTotal();
// }
// function addProductToCart(price, title, productImg) {
//     var cartShopBox = document.createElement("div")
//     cartShopBox.classList.add('cart-box')
//     var cartItems = document.getElementsByClassName('cart-content')[0];
//     var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
//     for (var i = 0; i < cartItemsNames.length; i++) {
//         alert("YOU HAVE ALREADY ADD THIS ITEM TO CART");
//     }

//     return;
// }
// var cartBoxContent = `
//     <img src="img/product2.jpg" alt="" class="cart-img">
//             <div class="detail-box">
//                 <div class="cart-product-title">Earbuds</div>
//                 <div class="cart-price">25.04}</div>
//                 <input type="number" value="1" class="cart-quantity">
//             </div>
//             <!--Remove Cart-->
//             <i class='bx bxs-trash-alt cart-remove' onclick="removeCartItem(this)"></i>
//     `;
// cartShopBox.innerHTML = cartBoxContent
// cartItems.append(cartBoxe)
// cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
// cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);


//Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBoxe = cartBoxes[i]
        var priceElement = cartBoxe.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBoxe.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity);
        //If Price Contain Some Cents Value
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
    
}

