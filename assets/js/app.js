function addCart (product, qty) {  
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
};

$('.btn-checkout').click(function (event) {
  alert("B")
});