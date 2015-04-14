/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '#footer';

    $.initModule(node, function ($, footer) {
        // Make all the footer links which target starts with "http" to open in a new window
        $(footer).find('a[href^="http"]').attr({target: '_blank'});
    });

    // Set Footer as a Sticky Footer
    $(window).on('resize', function() {
        $('#page .page-width > .lining').css('paddingBottom', $('#footer').outerHeight());
    });
    $(document).ready(function () {
        $(window).resize();
        setTimeout(function () {
            $(window).resize();
        }, 1000);
    });

}(jQuery2));

