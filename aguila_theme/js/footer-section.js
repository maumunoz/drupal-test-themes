function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function onSubscriptionSubmit(event) {
    var _form = jQuery(event.target);
    var _inputEmail = _form.find('.form-text').val();
    console.log(_inputEmail);
    if (IsEmail(_inputEmail)) {
        jQuery.ajax({
            type:'post',
            url:_form.attr("action"),
            data:_form.serialize(),
            success: function() {
              //alert("Success");
              message = jQuery('<div class="alert alert-success"/>');
              message.html("Gracias por registrarse!");
              message.insertBefore(_form);
              _form.remove();
            },
        });
    }else{
        //alert("Error");
        _form.find('.form-text').addClass("error");
    }
    event.preventDefault();
}
    
    /*global jQuery2 */
(function ($) {
    // Transform Newsletter Form
    $.transform("#block-views-formulario-aguila-news-block-1", {
        target: "#web-form-aguila-news-container",
        type: 'append',
        globalTarget: true,
        afterEach: function ($, node) {
            node.find('input[type="text"]').attr('placeholder', 'Tucorreo@mail.com');
            node.find('form').submit(onSubscriptionSubmit);
            
        }
    });
    

}(jQuery2));

