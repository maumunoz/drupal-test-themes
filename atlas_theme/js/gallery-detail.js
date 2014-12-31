/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.media-gallery-detail-wrapper', {
        process: function ($, node) {
            var counter = node.find('.media-gallery-detail .media-gallery-image-count'),
                counterText = counter.text(),
                copyRightItem = node.find('.media-gallery-detail-info .media-license');

            //Translate texts to spanish
            node.find('.media-gallery-detail .media-gallery-back-link a').text('« Volver a la galería');
            node.find('.media-gallery-detail .media-gallery-controls a.prev').text('« Anterior');
            node.find('.media-gallery-detail .media-gallery-controls a.next').text('Siguiente »');
            counter.text(counterText.replace('of', 'de'));

            //Change Copy Right image styling
            if (copyRightItem.length > 0 && copyRightItem.hasClass('dark')) {
                copyRightItem.removeClass('dark').addClass('light');
            }
        }
    });
}(jQuery2));