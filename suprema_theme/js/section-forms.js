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
    
    $("#commentForm").validate();
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
    $.extend($.validator.messages, {
        required: 'Este campo es obligatorio.',
    });
})(jQuery2);


