(function ($) {
    var node = ".hybridauth-widget-wrapper";

    $.initModule(node, function ($, el) {
        el.find("h3").remove();
        el.appendTo( $(".share-section").empty() );
    });

}(jQuery2));