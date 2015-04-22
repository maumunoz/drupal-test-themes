/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '.node-type-webform',
        banner = '.field-name-field-contenido-previo',
        form = '.webform-client-form';

    // Detect page type
    $.initModule(node, function ($, $page) {
        banner = $page.find(banner);
        form = $page.find(form);
        if (banner.length) {
            banner.find('p').each(function() {
                if ($(this).is(':empty')) {
                    $(this).remove();
                }
            });
        }
        if (form.length) {
            console.log('form exists');
        }
    });

}(jQuery2));

