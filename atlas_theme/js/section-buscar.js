/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.search-info', {
        process: function ($, node) {
            node.find("a").remove();
            node.html( node.html().replace(" - ","") );
        }
    });
}(jQuery2));