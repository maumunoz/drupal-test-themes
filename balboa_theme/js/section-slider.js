/*global jQuery2 */
(function ($) {
    'use strict';
    $(document).ready(function(){
        var slider = $('.homepage-slider .slick-slider'),
            slideImage,
            slideLink;

        //Set slider images as css background images
        slider.find('.views-row').each(function() {
            slideImage = $(this).find('img');
            slideLink = $(this).find('.url-destino');
            if (slideLink.length) {
                slideLink = $('<a href="'+$.trim(slideLink.text())+'"></a>');
                slideImage.wrap(slideLink);
            }
        });
    });

}(jQuery2));

