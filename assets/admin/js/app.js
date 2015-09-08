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