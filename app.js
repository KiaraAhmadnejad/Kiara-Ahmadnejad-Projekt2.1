2022-03-29
/* get new cart total on load */
updateCartTotal();

document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* ADD TO CART functions */
function addToCart(elem) {
    //init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
    var stringCart;
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue;
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        productname : getproductName,
        price : getprice
    };

    var stringProduct = JSON.stringify(product);

    if(!sessionStorage.getItem('cart')){
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
       cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}

/* Calculate Cart Total */
function updateCartTotal(){
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        items = cart.length;
        for (var i = 0; i < items; i++){
            var x = JSON.parse(cart[i]);
            price = parseFloat(x.price.split('$')[1]);
            productname = x.productname;
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
    }
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/ User Manually empty cart */
function emptyCart() {
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}