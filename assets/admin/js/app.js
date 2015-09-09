$( document ).ready(function() {
  if($('#tableCategory').length > 0){
    $('#tableCategory').DataTable();
  }

  if($('#tableProduct').length > 0){
    $('#tableProduct').DataTable();
  }
});


/* --------------- Inline edit (contenteditable) --------------- */
$('.inline-edit-name').focusout(function() {
  var data = {
    model_name: $('#modelName').val(),
    id: $(this).parent().parent().children('td').eq(0).children().eq(0).text(),
    field: 'name',
    value: this.innerText
  }
  
  $.post( "/entity/update", data).done(function( result ) {
    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });  
});

$('.inline-edit-price').focusout(function() {
  var data = {
    model_name: $('#modelName').val(),
    id: $(this).parent().children('td').eq(0).children().eq(0).text(),
    field: 'price',
    value: this.innerText
  }
  
  $.post( "/entity/update", data).done(function( result ) {
    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });
});

$('.inline-edit-quantity').focusout(function() {
  var data = {
    model_name: $('#modelName').val(),
    id: $(this).parent().children('td').eq(0).children().eq(0).text(),
    field: 'quantity',
    value: this.innerText
  }
  
  $.post( "/entity/update", data).done(function( result ) {
    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });
});

$('.inline-edit-priority').focusout(function() {
  var data = {
    model_name: $('#modelName').val(),
    id: $(this).parent().children('td').eq(0).children().eq(0).text(),
    field: 'priority',
    value: this.innerText
  }
  
  $.post( "/entity/update", data).done(function( result ) {
    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });
});
/* --------------- End Inline edit (contenteditable) --------------- */




/* --------------- Button Click --------------- */

//Create Category
$('#frmCreateCategory').submit(function(event){
  // cancels the form submission
  event.preventDefault();

  var data = {
    name: $('#txtName').val()
  }
  
  $.post( "/entity/create", {
    model_name: 'Category', 
    data: JSON.stringify(data)
  }).done(function( result ) {
    if(result.status == 0) {
      $('#lblModalError').text(result.message);
      $('#divModalError').show();
    }
    else {
      //Hide modal error
      $('#divModalError').hide();

      //Hide modal create category
      $('#modalCreateCategory').modal('hide');

      $('#tableCategoryBody').append(
        '<tr>' +
          '<td>' +
            '<p>' + result.data.id + '</p>' +
          '</td>' +
          '<td>' +
            '<input type="hidden" value="' + result.data.id + '">' +
            '<input type="hidden" value="name">' +
            '<p contenteditable="true" class="manage-category-name">' +
              result.data.name +
            '</p>' +    
          '</td>' +          
          '<td>Active</td>' +
          '<td>' +            
              '<button type="button" onclick="disableItem(this,\'Category\','+result.data.id+',\'status\')" class="btn btn-danger">Disable</button>' +
              '<button style="display: none;" type="button" onclick="activeItem(this,\'Category\','+result.data.id+',\'status\')" class="btn btn-success">Active</button>' +
          '</td>' +
        '</tr>'
      );
    }
  });
});


//Create Product
$('#frmCreateProduct').submit(function(event){
  // cancels the form submission
  event.preventDefault();

  var category = $('#ddlCategory').val();

  var data = {
    category: category,
    name: $('#txtName').val(),
    price: $('#txtPrice').val(),
    quantity: $('#txtQuantity').val(),
    priority: (!$('#txtPriority').val()) ? 0 : $('#txtPriority').val(),
    description: $('#txtDescription').val(),
  }
  
  $.post( "/entity/create", {
    model_name: 'Product', 
    data: JSON.stringify(data)
  }).done(function( result ) {
    if(result.status == 0) {
      $('#lblModalError').text(result.message);
      $('#divModalError').show();
    }
    else {
      //Hide modal error
      $('#divModalError').hide();

      //Hide modal create product
      $('#modalCreateProduct').modal('hide');

      $('#tableProductBody').append(
        '<tr>' +
          '<td>' +
            '<a href="/manage/product/'+result.data.id+'">'+result.data.id+'</a>' +
          '</td>' +          
          '<td>' +
            '<p contenteditable="true" class="inline-edit-name">' +
              result.data.name +
            '</p>' +   
          '</td>' +
          '<td>'+category+'</td>' +
          '<td contenteditable="true" class="inline-edit-price">' + result.data.price + '</td>' +
          '<td contenteditable="true" class="inline-edit-quantity">'+result.data.quantity+'</td>' +
          '<td><a href="/manage/product/'+result.data.id+'">'+result.data.sold+'</a></td>' +
          '<td><a href="/manage/product/'+result.data.id+'">'+result.data.revenue+'</a></td>' +
          '<td contenteditable="true" class="inline-edit-priority">'+result.data.priority+'</td>' +          
          '<td>Active</td>' +
          '<td>' +
            '<button type="button" onclick="disableItem(this,\'Product\','+result.data.id+',\'status\')" class="btn btn-danger">Disable</button>' +
            '<button style="display: none;" type="button" onclick="activeItem(this,\'Product\','+result.data.id+',\'status\')" class="btn btn-success">Active</button>' +
          '</td>' +
        '</tr>'
      );
    }
  });
});
/* --------------- End Button Click --------------- */




/* --------------- Custom function --------------- */
function redirect (url) {
  window.location.href = url;
}

function smoothScrollTo(to){
  $('html, body').animate({
    scrollTop: $(to).offset().top
  }, 500);
}

function disableItem(ele, modelName, id, field) {
  var data = {
    model_name: modelName,
    id: id,
    field: field,
    value: 2
  }
  $.post( "/entity/update", data).done(function( result ) {
    if(result.status == 0) {
      $('#modalMessageBody').text(result.message);
      $('#modalMessage').modal();
    }
    else {
      $(ele).parent().parent().children('td').eq(-2).text('Disabled')
      $(ele).parent().children().last().show();
      $(ele).parent().children().first().hide();
    }    
  });
}

function activeItem(ele, modelName, id, field) {
  var data = {
    model_name: modelName,
    id: id,
    field: field,
    value: 1
  }
  $.post( "/entity/update", data).done(function( result ) {
    if(result.status == 0) {
      $('#modalMessageBody').text(result.message);
      $('#modalMessage').modal();
    }
    else {
      $(ele).parent().parent().children('td').eq(-2).text('Active')
      $(ele).parent().children().last().hide();
      $(ele).parent().children().first().show();
    }    
  });
}
/* --------------- End Custom function --------------- */