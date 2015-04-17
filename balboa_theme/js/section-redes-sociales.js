/*global jQuery2 */
(function ($) {
    'use strict';
    var pageClass = '.node-type-redes-sociales',
        wrapper = '#content-area',
        videos;

    // Detect page type
    $.initModule(pageClass, function ($, $page) {
        wrapper = $page.find(wrapper);
        if (wrapper.length) {
            videos = wrapper.find('.yt-embed')
            $(videos).each(function(index, el) {
                $(this).replaceWith('<iframe class="video" allowfullscreen="" frameborder="0" src="'+$(this).attr('data-src')+'"></iframe>');
            });
        }
    });

}(jQuery2));

