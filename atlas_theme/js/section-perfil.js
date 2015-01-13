/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.vista-perfil-chica', {
        process: function ($, node) {
            var iframeContainer = node.find('.video-perfil-chica .iframe');
            iframeContainer.append($('<iframe src="'+ iframeContainer.data('src') + '"/>'));
        }
    });
}(jQuery2));