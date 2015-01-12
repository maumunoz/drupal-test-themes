/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.contenido-articulo', {
        process: function ($, node) {
            /*
             * If the article has the 'no-padding' class then add it to
             * 'content-inner' div to remove paddings in parent divs of
             * '.contenido-articulo'
             */
            if(node.find('.no-padding').length > 0) {
                $('#content-inner').addClass('no-padding');
            }
        }
    });
}(jQuery2));