/*global jQuery2 */
(function ($) {
    //Initialize Contact
    $.initModule(".webform-client-form", function ($, pageContent) {
        //Add css class to page based on URL
            $("#webform-client-form-86").validate({
                submitHandler: function(_form) {
                    jQuery2.ajax({
                        type:'post',
                        url:_form.attr("action"),
                        data:_form.serialize(),
                        success: function() {
                          //alert("Success");
                            jQuery2("#block-system-main").hide();
                            jQuery2("#block-block-41").show();
                        },
                    });
                },
                showErrors: function(errorMap, errorList) {
                    this.defaultShowErrors();
                    jQuery2("label.error").each(function(i,el) {
                        jQuery2(el).parent().prepend(el);
                    });
                    
                },
                messages: {
                    required: "Este campo es requerido",
                },

            });
            $("#edit-submitted-new-1420833971714").rules( "add", {
              rangelength: [5, 8],
              digits: true,
              messages: {
                digits: "Debe ser un nümero de teléfono",
                email: "Requiere de 5 a 8 digitos",
              }
            });
            $("#edit-submitted-new-1420479095779").rules( "add", {
              email: true,
              messages: {
                email: "Email inválido",
              }
            });
            $("#edit-submitted-new-1421337358404").rules( "add", {
              equalTo: "#edit-submitted-new-1420479095779",
              messages: {
                email: "No coincide con el email",
              }
            });
            jQuery2.extend(jQuery2.validator.messages, {
              required: 'El siguiente campo es obligatorio.',
            });
    });
}(jQuery2));
