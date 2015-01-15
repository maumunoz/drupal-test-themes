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

    $.initModule("#edit-profile-user-profile-form", function ($, el) {
        el.find("#edit-field-edad-und-0-value-datepicker-popup-0").attr("disabled", "disabled");
    });

    $.initModule("#user-register-form", function ($, el) {
        el.find(".form-item-mail").after('<div class="form-item form-type-textfield form-item-mail-validation">' +
                                            '<label for="edit-mail-validation">Confirmar correo electr&oacute;nico <span class="form-required" title="Este campo es obligatorio.">*</span></label>' +
                                            '<input type="text" id="edit-mail-validation" name="mail" value="" size="60" maxlength="254" class="form-text required">' +
                                        '</div>');

        /*$("#user-register-form").submit(function(){
            if(el.find("#edit-mail").val() !== el.find("#edit-mail-validation").val()) {
                return false;
            }
        });*/

        $("#user-register-form").validate();

        $("#edit-mail-validation").rules("add", {
            equalTo: "#edit-mail",
            messages: {
                equalTo: "Los correos electr&oacute;nicos no coinciden"
            }
        });

        jQuery("#edit-field-edad-und-0-value-datepicker-popup-0").addClass("checkAge").change(function(event){
            event.preventDefault();
            jQuery2(this).valid(); 
        });

        $.validator.addMethod("checkAge", function(value, element){
            var monthList = {
                "01": "Jan",
                "02": "Feb",
                "03": "Mar",
                "04": "Apr",
                "05": "May",
                "06": "Jun",
                "07": "Jul",
                "08": "Aug",
                "09": "Sep",
                "10": "Oct",
                "11": "Nov",
                "12": "Dec"
            };
            var ageUserList = ($(element).val()).split("/");
            var dateToday = new Date();
            var dateBirthUser = new Date(monthList[ageUserList[1]] + " " + ageUserList[0] + ", " + ageUserList[2]);

            if((dateToday.getFullYear() - dateBirthUser.getFullYear()) > 18) {

                return true;

            } else if((dateToday.getFullYear() - dateBirthUser.getFullYear()) === 18) {

                if(dateToday.getMonth() <= dateBirthUser.getMonth()) {

                   return true;

                } else if(dateToday.getMonth() === dateBirthUser.getMonth()) {

                    if(dateToday.getDate() <= dateBirthUser.getDate()) {
                    
                        return true;

                    } else {

                        return false;

                    }

                }
            } else {

                return false;
            }
        }, "Tienes que ser mayor de edad"); 

        $.validator.classRuleSettings.checkAge = { checkAge: true };

    });

}(jQuery2));

(function($){
    var originalVal = $.fn.val;
    $.fn.val = function(){
        var ogValue = this[0].value;
        var result =originalVal.apply(this,arguments);
        if(arguments.length>0 && ogValue!=arguments[0])
            $(this).change();
        return result;
    };
})(jQuery);

(function($){
    var originalVal = $.fn.val;
    $.fn.val = function(){
        var ogValue = this[0].value;
        var result =originalVal.apply(this,arguments);
        if(arguments.length>0 && ogValue!=arguments[0])
            $(this).change();
        return result;
    };
})(jQuery2);