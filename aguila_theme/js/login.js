(function ($) {
    var node = ".hybridauth-widget-wrapper";

    $.initModule(node, function ($, el) {
        el.find("h3").remove();
        el.appendTo( $(".share-section").empty() );
    });

    $.initModule(".form-wrapper", function ($, el) {
        el.find("option[value='_none']").attr("label","Seleccione ");
        $("select").find("option[value='_none']").html("Seleccione ");

        el.find("#edit-field-tel-fono-und-0-value").after("<p class='description'>El campo de ¨Tel&eacute;fono¨ solo permite caracteres n&uacute;mericos</p>");

        el.find("#edit-field-tel-fono-und-0-value").on("keypress", function(e){
        	var regex = new RegExp("^[0-9]+$");
		    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		    if (!regex.test(key)) {
		       e.preventDefault();
		       return false;
		    }
        });
    });

    $.initModule("#user-profile-form", function ($, el) {
        el.find("#edit-mail").attr("disabled", "disabled");
    });

    $.initModule("#user-register-form", function ($, el) {
        el.find(".form-item-mail").after('<div class="form-item form-type-textfield form-item-mail-validation">' +
                                            '<label for="edit-mail-validation">Confirmar correo electr&oacute;nico <span class="form-required" title="Este campo es obligatorio.">*</span></label>' +
                                            '<input type="text" id="edit-mail-validation" name="mail" value="" size="60" maxlength="254" class="form-text required">' +
                                        '</div>');

        $("#user-register-form").submit(function(){
            if(el.find("#edit-mail").val() !== el.find("#edit-mail-validation").val()) {
                return false;
            }
        });

    });

}(jQuery2));