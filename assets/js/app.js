$( document ).ready(function() {
  clearLocalStorage();
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
                                          '<a href="#" title="Remove This Item" onClick="" class="btn-remove1">Remove This Item</a>' +
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
                                          '<a href="#" title="Remove This Item" onClick="" class="btn-remove1">Remove This Item</a>' +
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
                                  '<a href="#" title="Remove This Item" onClick="" class="btn-remove1">Remove This Item</a>' +
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

      total = (qty * product.price);
    }
    else {
      total += (qty * product.price); 
      
      products = JSON.parse(products);
      quantities = JSON.parse(quantities);

      //Get index of this item in array products (Check if already added to cart)
      var pos = arrayObjectIndexOf(products, product.id, "id");
      
      if(pos != -1) { //If it exist in cart
        //Sum qty
        qty += parseFloat(quantities[pos]);

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
                                '<td>' +
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

$('.btn-checkout').click(function (event) {
  alert("B")
});

function clearLocalStorage () {
  localStorage.removeItem("products");
  localStorage.removeItem("quantities");
  localStorage.removeItem("total");
}