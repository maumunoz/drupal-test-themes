/* globals jQuery, jQuery2 */

(function (jq, $) {
    'use strict';

    var node = '#age_checker_verification_popup',
        cookieName = 'age_checker',
        overlay,
        banner,
        bgContainer;

    //Initialize Age Gate
    $.initModule(node, 200, function ($, el) {
        // Hide module before transformation
        if (jq.cookie(cookieName) === null) {
            banner = el.find('.age_checker-banner');
            bgContainer = el.find('.bg-container');
            overlay = el.parent();

            // Convert Image to CSS Backgrounds
            if($(bgContainer).length && overlay.css('backgroundImage')) {
                bgContainer.removeAttr('style');
                bgContainer.css('backgroundImage', overlay.css('backgroundImage'));
                overlay.css('backgroundImage', '');
            }
            if($(banner).length) {
                setTimeout(function () {
                    banner.css('backgroundImage', 'url(' + banner.find('img').attr('src') + ')');
                    banner.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + banner.find('img').attr('src') + '", sizingMethod="scale")');
                    banner.addClass('animate-hidden');
                    banner.find('img').remove();
                }, 3000);
            }

        }
    });

})(jQuery, jQuery2);