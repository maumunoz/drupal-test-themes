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

}(jQuery2));