$( document ).ready(function() {
  if($('#tableCategory').length > 0){
    $('#tableCategory').DataTable();
  }
});


/* --------------- Button Click --------------- */
$('.manage-category-name').focusout(function() {
  var modelName = $('#modelName').val();
  var id = $(this).parent().children().first().val();
  var field = $(this).parent().children().eq(1).val();
  var value = this.innerText;

  var data = {
    model_name: modelName,
    id: id,
    field: field,
    value: value
  }
  
  $.post( "/entity/update", data).done(function( result ) {
    $('#modalMessageBody').text(result.message);
    $('#modalMessage').modal();
  });  
});

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
      $(ele).parent().parent().children('td').eq(2).text('Disabled')
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
      $(ele).parent().parent().children('td').eq(2).text('Active')
      $(ele).parent().children().last().hide();
      $(ele).parent().children().first().show();
    }    
  });
}