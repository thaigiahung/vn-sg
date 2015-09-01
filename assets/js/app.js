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

function addCart (product, qty) {
  //Add this item to localStorage
  if(typeof(Storage) !== "undefined") {
    var products = localStorage.products;
    var quantities = localStorage.quantities;
    var total = Number(localStorage.total);

    if(!products || !quantities) { //Haven't store products
      products = [];
      quantities = [];
      total = (qty * product.price);
    }
    else {
      products = JSON.parse(products);
      quantities = JSON.parse(quantities);
      total += (qty * product.price);      
    }

    products.push(product);
    quantities.push(qty);

    localStorage.products = JSON.stringify(products);
    localStorage.quantities = JSON.stringify(quantities);
    localStorage.total = JSON.stringify(total);

    //Add products to cart-sidebar
    $('#cart-total').text(products.length);
    $('#total').text(total + " SGD");

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