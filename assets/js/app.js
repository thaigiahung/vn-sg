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

        var img = '/images/products/default.jpg';
        if(product.images.length > 0) {
          img = product.images[0].url;
        }

        if(i == productsLength-1) {
          $('#cart-sidebar').append(
            '<li class="item last">' +
              '<a class="product-image" href="/product/'+product.id+'">' +
                '<img src="'+img+'" width="80">' +
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
                '<img src="'+img+'" width="80">' +
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

        var img = '/images/products/default.jpg';
        if(product.images.length > 0) {
          img = product.images[0].url;
        }

        $('#shopping-cart-table-body').append(
          '<tr>' +
            '<td class="image">' + 
              '<a class="product-image" title="'+product.name+'" href="/product/'+product.id+'">' +
                '<img alt="'+product.name+'" src="'+img+'">' +
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
              '<input maxlength="4" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="input-text qty" title="'+product.id+'" size="4" value="'+quantity+'">' +
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

    // If this is view Checkout
    if($('#btnCheckout').length > 0) {
      //Hide side-nav-categories
      $('#side-nav-categories').remove();

      //If personalInfo exist => append it to frmCheckout
      var personalInfo = localStorage.personalInfo;

      if(personalInfo) {
        personalInfo = JSON.parse(personalInfo);
        
        $('#txtFirstName').val(personalInfo.firstName),
        $('#txtLastName').val(personalInfo.lastName),
        $('#txtEmail').val(personalInfo.email),
        $('#txtAddress').val(personalInfo.address),
        $('#txtLat').val(personalInfo.lat),
        $('#txtLng').val(personalInfo.lng),
        $('#txtPhone').val(personalInfo.phone)
      }     
    }

    // If this is view product detail
    if($('#txtQty').length > 0) {
      mixpanel.track(
        "View Product",
        { 
          "ip_address": $('#hdIP').val(),
          "product": $('#h1ProductName').text()
        }
      );
    }
  } 
  else {
    $('#modalMessageBody').text("Sorry! Your browser does not support Web Storage");
    $('#modalMessage').modal();
  }
});



/* --------------- Button Click --------------- */
$('.btn-checkout').click(function (event) {
  mixpanel.track(
    "View Checkout",
    { 
      "ip_address": $('#hdIP').val()
    }
  );

  redirect("/checkout");
});

$('.view-cart').click(function (event) {
  mixpanel.track(
    "View Cart",
    { 
      "ip_address": $('#hdIP').val()
    }
  );

  redirect("/cart");
});

$('.btn-continue').click(function (event) {
  mixpanel.track(
    "Continue Shopping",
    { 
      "ip_address": $('#hdIP').val()
    }
  );

  // redirect("/");
});

$('#empty_cart_button').click(function (event) {
  mixpanel.track(
    "Empty Cart",
    { 
      "ip_address": $('#hdIP').val()
    }
  );

  clearCart();
});

$('#btnOk').click(function (event) {
  //Clear localStorage and redirect to index
  clearCart();
  redirect('/');
});

$('#frmCheckout').submit(function(event){
  // cancels the form submission
  event.preventDefault();

  var firstName = $('#txtFirstName').val();
  var lastName = $('#txtLastName').val();
  var email = $('#txtEmail').val();
  var address = $('#txtAddress').val();
  var lat = $('#txtLat').val();
  var lng = $('#txtLng').val();
  var phone = $('#txtPhone').val();

  // do whatever you want here
  var data = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    address: address,
    lat: lat,
    lng: lng,
    phone: phone,
    products: localStorage.products,
    quantities: localStorage.quantities,
    total: parseFloat(localStorage.total)
  }

  //Save receiver info in localStorage
  var personalInfo = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    lat: lat,
    lng: lng,
    phone: phone
  }
  localStorage.personalInfo = JSON.stringify(personalInfo);  

  $.post( "/order", data).done(function( result ) {
    if(result.status == 1) {//If success: 
      $('#btnOk').show();
      $('#btnCancel').remove();
    }
    
    mixpanel.track(
      "Checkout",
      { 
        "ip_address": $('#hdIP').val(),
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "address": address,
        "phone": phone,
        "status": (result.status == 1) ? 'Success' : 'Fail'
      }
    );

    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });
});

$(document).on("click", "a.remove-element" , function() {
  var productName = $(this).siblings().eq(0).text();
  mixpanel.track(
    "Remove Product",
    { 
      "ip_address": $('#hdIP').val(),
      "product": productName
    }
  );

  // Get product id
  var id = this.title;
  updateCartAfterRemoveEle(id);
});

$(document).on("click", "a.remove-item" , function() {
  var productName = $(this).parent().parent().children("td").eq(1).children().eq(0).children().eq(0).text()

  mixpanel.track(
    "Remove product",
    { 
      "ip_address": $('#hdIP').val(),
      "product": productName
    }
  );

  // Get product id
  var id = this.title;
  updateCartAfterRemoveEle(id);  
});

$(document).on("change", "input.qty" , function() {
  checkQuantity(this);

  var newQty = Number(this.value);
  var id = this.title;

  var products = JSON.parse(localStorage.products);
  var quantities = JSON.parse(localStorage.quantities);
  var total = parseFloat(localStorage.total);

  //Find product with id in localStorage
  var pos = arrayObjectIndexOf(products, Number(id), "id");
  if(pos != -1) {
    
    var oldQty = parseFloat(quantities[pos]);
    var price = parseFloat(products[pos].price);
    var oldSubTotal = oldQty * price;
    var newSubTotal = newQty * price;
    total = total - oldSubTotal + newSubTotal;

    mixpanel.track(
      "Change quantity",
      { 
        "ip_address": $('#hdIP').val(),
        "product": products[pos].name,
        "old_quantity": oldQty,
        "new_quantity": newQty
      }
    );

    //Update cart body
    $('#shopping-cart-table-body').children().eq(pos).children().eq(4).children().children().text(newSubTotal + " SGD");

    //Update cart-sidebar
    $('#total').text(total + " SGD"); 
    $('.product-details-bottom').eq(pos).children().first().text(newSubTotal + " SGD");
    $('.product-details-bottom strong').eq(pos).text(newQty);

    //Update grand total
    $('#cartSubTotal').text(total + " SGD");
    $('#cartGrandTotal').text(total + " SGD");

    //Store new values in localStorage
    quantities[pos] = newQty;
    localStorage.quantities = JSON.stringify(quantities);
    localStorage.total = JSON.stringify(total);
  }  
});

$(document).on("change", "#txtQty" , function() {
  checkQuantity(this);
});

$('#btnSearchMobile').click(function (event) {
  search('Mobile', $('#txtSearchMobile').val());
});

$("#txtSearch").on( "keydown", function(event) {  
  if(event.which == 13) {
    search('Mobile', $('#txtSearch').val());
    event.preventDefault();
  }
});

$("#txtSearchMobile").on( "keydown", function(event) {  
  if(event.which == 13) {
    search('Mobile', $('#txtSearchMobile').val());
    event.preventDefault();
  }
});

/* --------------- Custom function --------------- */
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
  var img = '/images/products/default.jpg';
  if(product.images.length > 0) {
    img = product.images[0].url;
  }
  $('#cart-sidebar').append(
                            '<li class="item last">' +
                              '<a class="product-image" href="/product/'+product.id+'">' +
                                '<img src="'+img+'" width="80">' +
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
  qty = parseInt(qty);
  var status;

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

    var img = '/images/products/default.jpg';
    if(product.images.length > 0) {
      img = product.images[0].url;
    }

    $('#modalCartBody').html(
                              '<tr>' +
                                '<td id="modalCartPreviewTd">' +
                                  '<a href="/product/'+product.id+'">' +
                                    '<img width="150" src="'+img+'" />' +
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

    status = 'Success';
  } 
  else {
    $('#modalMessageBody').text("Sorry! Your browser does not support Web Storage");
    $('#modalMessage').modal();

    status = 'Fail';
  }

  mixpanel.track(
    "Add To Cart",
    { 
      "ip_address": $('#hdIP').val(),
      "product": product.name,
      "quantity": qty,
      "status": status
    }
  );
};

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

function checkQuantity (ele) {
  //Qty must always be integer AND > 0
  var qty = parseInt(ele.value);
  if(isNaN(qty) || qty <= 1) {
    ele.value = 1;
  }
}

function search (layout, keyword) {
  mixpanel.track(
    "Search",
    { 
      "ip_address": $('#hdIP').val(),
      "layout": layout,
      "keyword": keyword
    }
  );

  redirect("/search?keyword="+keyword);
}