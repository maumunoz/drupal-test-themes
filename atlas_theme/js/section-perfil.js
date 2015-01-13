/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.vista-perfil-chica', {
        process: function ($, node) {
            //Add iframe for video below to profile info
            var iframeContainer = node.find('.video-perfil-chica .iframe');
            iframeContainer.append($('<iframe src="'+ iframeContainer.data('src') + '"/>'));

            //Add no-padding class to display the background image properly
            $('#content-inner').addClass('no-padding');
        }
    });
}(jQuery2));