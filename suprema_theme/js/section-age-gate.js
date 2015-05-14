/* globals jQuery, jQuery2 */

(function (jq, $) {
    'use strict';
    
    
    age_checker.nextbox = function( fldobj, nbox )
    {
        var language_selectvalue = jQuery('#languagecode').val();
        if( language_selectvalue === undefined || language_selectvalue == null || language_selectvalue.length <= 0 )
        {
            if ( fldobj.value.length > 1 && nbox == 1 ) {
                document.forms['age_checker_form'].elements[2].focus();
            }
            else if ( fldobj.value.length > 1 && nbox == 2 ) {
                document.forms['age_checker_form'].elements[3].focus();
            }
        }
        else {
            if ( fldobj.value.length > 1 && nbox == 1 ) {
                document.forms['age_checker_form'].elements[3].focus();
            }
            else if ( fldobj.value.length > 1 && nbox == 2 ) {
                document.forms['age_checker_form'].elements[4].focus();
            }
        }
    }

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