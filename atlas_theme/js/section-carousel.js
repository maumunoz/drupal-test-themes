/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.vista-carrusel-fotos', {
        process: function ($, node) {
            node.find('ul').slick({
                infinite: true,
                speed: 500,
                fade: true,
                slide: 'li',
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 3000
            });
        }
    });
}(jQuery2));