/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.stack-navigation', {
        process: function ($, node) {
            /*
             * Disable link on menu elements with children
             */
            jQuery2('#block-system-main-menu li.expanded > a').on('click', function(e){
                e.preventDefault();
                console.log('do nothing')
            });
        }
    });
}(jQuery2));