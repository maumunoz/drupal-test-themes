/*global jQuery2, moment*/
(function ($) {
    var node = ".encabezado-media .fecha";

    $.initModule(node, function ($, dateNode) {
        dateNode.text(moment($.trim(dateNode.text()), "YYYY-MM-DD").format('D MMMM YYYY'));
    });

}(jQuery2));