/*global jQuery2 */
(function ($) {
    var node = "#header";

    $.initModule(node, function ($, header) {
        // Transform Navigation
        $.transform("#navigation", {
            target: "#preheader .col-2 .col-first",
            type: 'after',
            globalTarget: true
        });
    });
}(jQuery2));