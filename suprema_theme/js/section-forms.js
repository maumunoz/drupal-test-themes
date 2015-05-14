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
    }else if ($("body").hasClass("page-node-121")) {
        $("#content .webform-client-form").validate({
            submitHandler: function(form) {
                if(grecaptcha.getResponse() == '') {
                    return;
                } else {
                    form.submit();
                }
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
        
        function concatFecha() {
            string = $("#subs_dia").val()+"/"+$("#subs_mes").val()+"/"+$("#subs_ano").val();
            $("#edit-submitted-new-1431635757252").val(string);
        }
        
        var dia = $("<input type='text' id='subs_dia' class='form-text inputfecha' pattern='[0-9]{1,2}' />").bind("keyup change", concatFecha); 
        var mes = $("<input type='text' id='subs_mes' class='form-text inputfecha' pattern='[0-9]{1,2}' />").bind("keyup change", concatFecha); 
        var ano = $("<input type='text' id='subs_ano' class='form-text inputfecha' pattern='[0-9]{2,4}' />").bind("keyup change", concatFecha); 

        $("#edit-submitted-new-1431635757252").hide().after(ano).after(mes).after(dia);
        


    });


})(jQuery2);


