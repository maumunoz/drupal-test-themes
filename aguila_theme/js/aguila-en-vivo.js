/*global jQuery2, moment*/
(function ($) {
    var node = "#block-views-lista-de-galerias-block .date-display-single";

    $.initModule(node, function ($, dateNode) {
        dateNode.text(moment($.trim(dateNode.text()), "YYYY-MM-DD").format('MMMM D [de] YYYY'));
    });
    
    $.initModule("#tr1", function ($, node) {
        jQuery("#tr1").dzscalendar({});
    });
    
    

}(jQuery2));