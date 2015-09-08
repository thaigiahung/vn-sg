$( document ).ready(function() {
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