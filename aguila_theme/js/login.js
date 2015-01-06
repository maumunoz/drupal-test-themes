(function ($) {
    var node = ".hybridauth-widget-wrapper";

    $.initModule(node, function ($, el) {
        el.find("h3").remove();
        el.appendTo( $(".share-section").empty() );
    });

    $.initModule(".form-wrapper", function ($, el) {
        el.find("option[value='_none']").attr("label","Seleccione ");
    });

}(jQuery2));