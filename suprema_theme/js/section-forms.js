(function ($) {

    //Initialize Page content
    $.initModule(".webform-client-form .columndivide", function ($, divisor) {
        divisor = $(divisor).parent();
        var col1 = $("<div class='col-xs-12 col-md-6'></div>");
        var col2 = $("<div class='col-xs-12 col-md-6'></div>");
        
        col1.append( divisor.prevAll().toArray().reverse() );
        col2.append( divisor.nextAll() );
        
        var row = $("<div class='row'></div>");
        row.append(col1);
        row.append(col2);
        
        row.insertAfter(divisor);
        
        divisor.remove();
    });
    
    if ($("body").hasClass("sommelier")) {
        $("#content .webform-client-form").validate({
            errorPlacement: function(error, element) {
                error.insertAfter(element.parent());
            }
        });
    }else{
        $("#content .webform-client-form").validate();
    }
    
    $.extend($.validator.messages, {
        required: 'Este campo es obligatorio.',
    });

    //form sommelier
    $.initModule("#webform-client-form-71", function ($, formcontact) {
        $("#edit-submitted-new-1428351158684").rules( "add", {
            email: true,
            messages: {
                email: "Correo inválido",
            }
        });
    });
    //form contactenos
    $.initModule("#webform-client-form-61", function ($, formcontact) {

        $("#edit-submitted-new-1427900283227").rules( "add", {
            email: true,
            messages: {
                email: "Correo inválido",
            }
        });
        $("#edit-submitted-new-1427900286632").rules( "add", {
            equalTo: "#edit-submitted-new-1427900283227",
            messages: {
                email: "No coincide con el correo",
            }
        });
    }); 
    //form suscribete
    $.initModule("#webform-client-form-121", function ($, formcontact) {

        $("#edit-submitted-new-1428600719667").rules( "add", {
            email: true,
            messages: {
                email: "Correo inválido",
            }
        });
        $("#edit-submitted-new-1428600726345").rules( "add", {
            equalTo: "#edit-submitted-new-1428600719667",
            messages: {
                email: "No coincide con el correo",
            }
        });
    });
        
        
})(jQuery2);


