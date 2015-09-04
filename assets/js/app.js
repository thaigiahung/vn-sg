$( document ).ready(function() {  
  if(typeof(Storage) !== "undefined") {
    var products = localStorage.products;
    var quantities = localStorage.quantities;
    var total = localStorage.total;

    if(!products || !quantities) { //Haven't store products
      products = [];
      quantities = [];
      total = 0;
    }
    else {
      products = JSON.parse(products);
      quantities = JSON.parse(quantities);
    }
    
    var productsLength = products.length;
    if(productsLength > 0) { //If cart has product

      //Add products to cart-sidebar
      $('#cart-total').text(products.length);
      $('#total').text(total + " SGD");

      $('#cartDetailTitle').text("YOUR SHOPPING CART");

      //Add products to cart-sidebar
      for(var i = 0; i < productsLength; i++) {
        var product = products[i];
        var quantity = quantities[i];

        if(i == productsLength-1) {
          $('#cart-sidebar').append(
            '<li class="item last">' +
              '<a class="product-image" href="/product/'+product.id+'">' +
                '<img src="'+product.images[0].url+'" width="80">' +
              '</a>' +
              '<div class="detail-item">' +
                '<div class="product-details">' +
                  '<a href="#" title="'+product.id+'" class="btn-remove1 remove-element">Remove This Item</a>' +
                  '<p class="product-name">' +
                    '<a href="/product/'+product.id+'">' +
                      product.name +
                    '</a>' +
                  '</p>' +
                '</div>' +
                '<div class="product-details-bottom">' +
                  '<span class="price">'+product.price+' SGD</span>' + 
                  '<span class="title-desc">Quantity:</span>' +
                  '<strong>'+quantity+'</strong>' +
                '</div>' +
              '</div>' +
            '</li>'
          );
        }
        else {
          $('#cart-sidebar').append(
            '<li class="item">' +
              '<a class="product-image" href="/product/'+product.id+'">' +
                '<img src="'+product.images[0].url+'" width="80">' +
              '</a>' +
              '<div class="detail-item">' +
                '<div class="product-details">' +
                  '<a href="#" title="'+product.id+'" class="btn-remove1 remove-element">Remove This Item</a>' +
                  '<p class="product-name">' +
                    '<a href="/product/'+product.id+'">' +
                      product.name +
                    '</a>' +
                  '</p>' +
                '</div>' +
                '<div class="product-details-bottom">' +
                  '<span class="price">'+product.price+' SGD</span>' + 
                  '<span class="title-desc">Quantity:</span>' +
                  '<strong>'+quantity+'</strong>' +
                '</div>' +
              '</div>' +
            '</li>'
          );
        }
      }
    }
    else { //If cart has no product
      emptyCart();
    }

    // If this is view Cart
    if($('#shopping-cart-table').length > 0) {
      for(var i = 0; i < productsLength; i++) {
        var product = products[i];
        var quantity = quantities[i];

        $('#shopping-cart-table-body').append(
          '<tr>' +
            '<td class="image">' + 
              '<a class="product-image" title="'+product.name+'" href="/product/'+product.id+'">' +
                '<img alt="'+product.name+'" src="'+product.images[0].url+'">' +
              '</a>' +
            '</td>' +
            '<td>' +
              '<h2 class="product-name">' +
                '<a href="/product/'+product.id+'">'+product.name+'</a>' +
              '</h2>' +
            '</td>' +
            '<td class="a-right">' +
              '<span class="cart-price"> <span class="price">'+product.price+' SGD</span> </span>' +
            '</td>' +
            '<td class="a-center movewishlist">' +
              '<input maxlength="12" class="input-text qty" title="Qty" size="4" value="'+quantity+'">' +
            '</td>' +
            '<td class="a-right movewishlist">' +
              '<span class="cart-price"> <span class="price">'+ (product.price * quantity) +' SGD</span> </span>' +
            '</td>' +
            '<td class="a-center last">' +
              '<a class="button remove-item" title="'+product.id+'" href="#">' +
                '<span><span>Remove item</span></span>' +
              '</a>' +
            '</td>' +
          '</tr>'
        );
      }

      $('#cartSubTotal').text(total + " SGD");
      $('#cartGrandTotal').text(total + " SGD");
    }

    // If this is view Checkout => hide side-nav-categories
    if($('#btnCheckout').length > 0) {
      $('#side-nav-categories').remove();
    }
  } 
  else {
    $('#modalMessageBody').text("Sorry! Your browser does not support Web Storage");
    $('#modalMessage').modal();
  }
});

//Search an item in an array of object
function arrayObjectIndexOf(myArray, searchTerm, property) {
  for(var i = 0; i < myArray.length; i++) {
      if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}

function updateSidebarCart (product, qty) {
  //Remove attribute last from last <li>
  $('#cart-sidebar li:last-child').removeClass('last');

  //Append new products to cart-sidebar
  $('#cart-sidebar').append(
                            '<li class="item last">' +
                              '<a class="product-image" href="/product/'+product.id+'">' +
                                '<img src="'+product.images[0].url+'" width="80">' +
                              '</a>' +
                              '<div class="detail-item">' +
                                '<div class="product-details">' +
                                  '<a href="#" title="'+product.id+'" class="btn-remove1 remove-element">Remove This Item</a>' +
                                  '<p class="product-name">' +
                                    '<a href="/product/'+product.id+'">' +
                                      product.name +
                                    '</a>' +
                                  '</p>' +
                                '</div>' +
                                '<div class="product-details-bottom">' +
                                  '<span class="price">'+product.price+' SGD</span>' + 
                                  '<span class="title-desc">Quantity:</span>' +
                                  '<strong>'+qty+'</strong>' +
                                '</div>' +
                              '</div>' +
                            '</li>'
                          );
}

function addCart (product, qty) {
  //Add this item to localStorage
  if(typeof(Storage) !== "undefined") {
    var products = localStorage.products;
    var quantities = localStorage.quantities;
    var total = parseFloat(localStorage.total);

    
    if(!products || !quantities) { //Haven't store products
      products = [product];
      quantities = [qty];

      total = qty * product.price;
    }
    else {
      total += parseFloat(qty * product.price);      
      products = JSON.parse(products);
      quantities = JSON.parse(quantities);

      //Get index of this item in array products (Check if already added to cart)
      var pos = arrayObjectIndexOf(products, product.id, "id");
      
      if(pos != -1) { //If it exist in cart
        //Sum qty
        qty += parseInt(quantities[pos]);

        //Remove it from array
        products.splice(pos,1);
        quantities.splice(pos,1);

        //Remove it from cart-sidebar
        $('#cart-sidebar').children().eq(pos).remove();
      }

      //Add this product and qty to array
      products.push(product);
      quantities.push(qty);      
    }

    //Store them in localStorage
    localStorage.products = JSON.stringify(products);
    localStorage.quantities = JSON.stringify(quantities);
    localStorage.total = JSON.stringify(total);

    updateSidebarCart(product, qty);

    //Add products to cart-sidebar
    $('#cart-total').text(products.length);
    $('#total').text(total + " SGD");    

    $('#modalCartBody').html(
                              '<tr>' +
                                '<td id="modalCartPreviewTd">' +
                                  '<a href="/product/'+product.id+'">' +
                                    '<img width="150" src="'+product.images[0].url+'" />' +
                                  '</a>' +                            
                                '</td>' +
                                '<td>' +
                                  '<a href="/product/'+product.id+'">' +
                                    product.name +
                                  '</a>' +
                                '</td>' +
                                '<td>' +
                                  product.price +
                                '</td>' +
                                '<td>' +
                                 qty +
                                '</td>' +
                              '</tr>'
                            );
    $('#modalCart').modal();
  } 
  else {
    $('#modalMessageBody').text("Sorry! Your browser does not support Web Storage");
    $('#modalMessage').modal();
  }
};

/* --------------- Button Click --------------- */
$('.btn-checkout').click(function (event) {
  redirect("/checkout");
});

$('.view-cart').click(function (event) {
  redirect("/cart");
});

$('.btn-continue').click(function (event) {
  redirect("/");
});

$('#empty_cart_button').click(function (event) {
  clearCart();
});

$('#btnProceedCheckout').click(function (event) {
  redirect('/checkout');
});

$('#btnOk').click(function (event) {
  //Clear localStorage and redirect to index
  clearCart();
  redirect('/');
});

$('#frmCheckout').submit(function(event){
  // cancels the form submission
  event.preventDefault();

  // do whatever you want here
  var data = {
    first_name: $('#txtFirstName').val(),
    last_name: $('#txtLastName').val(),
    email: $('#txtEmail').val(),
    address: $('#txtAddress').val(),
    lat: $('#txtLat').val(),
    lng: $('#txtLng').val(),
    phone: $('#txtPhone').val(),
    products: localStorage.products,
    quantities: localStorage.quantities,
    total: parseFloat(localStorage.total)
  }

  $.post( "/order", data).done(function( result ) {
    if(result.status == 1) {//If success: 
      $('#btnOk').show();
      $('#btnCancel').remove();
    }
    
    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });
});

$(document).on("click", "a.remove-element" , function() {
  // Get product id
  var id = this.title;
  updateCartAfterRemoveEle(id);
});

$(document).on("click", "a.remove-item" , function() {
  // Get product id
  var id = this.title;
  updateCartAfterRemoveEle(id);  
});


/* --------------- Custom function --------------- */
function clearLocalStorage () {
  localStorage.removeItem("products");
  localStorage.removeItem("quantities");
  localStorage.removeItem("total");
}

function redirect (url) {
  window.location.href = url;
}

function clearCart () {
  clearLocalStorage();

  //Clear cart-sidebar
  $('#cart-total').text("0");
  $('#total').empty();
  $('#cart-sidebar').empty();

  emptyCart();
}

function emptyCart () {
  $('#cartDetail').remove();
  $('#cartDetailTotal').remove();

  $('#cartDetailTitle').text("YOUR CART IS EMPTY");
}

function removeElement (ele) {
  console.log(ele);
  $(this).remove();
}

function updateCartAfterRemoveEle (id) {
  var products = JSON.parse(localStorage.products);
  var quantities = JSON.parse(localStorage.quantities);
  var total = parseFloat(localStorage.total);

  //Find product with id in localStorage
  var pos = arrayObjectIndexOf(products, Number(id), "id");

  //Remove it from localStorage
  total -= products[pos].price * quantities[pos];
  products.splice(pos,1);
  quantities.splice(pos,1);

  //Store new values in localStorage
  localStorage.products = JSON.stringify(products);
  localStorage.quantities = JSON.stringify(quantities);
  localStorage.total = JSON.stringify(total);

  $('#shopping-cart-table-body tr:nth-child('+(pos+1)+')' ).remove();
  $('#cartSubTotal').text(total + " SGD");
  $('#cartGrandTotal').text(total + " SGD");

  //Update cart-sidebar  
  $('#cart-sidebar li:nth-child('+(pos+1)+')' ).remove();
  $('#cart-total').text(products.length);
  $('#total').text(total + " SGD");
}