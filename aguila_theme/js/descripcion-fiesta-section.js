/* globals jQuery2 */
(function ($) {
    'use strict';
    var node = '.descripcion-ferias-fiestas',
        social,
        links;

    $.initModule(node, function ($, el) {
        el.find('.links-list li:empty').remove();
        social = el.find('.social-share');
        if ($(social).find('ul').length > 0) {
            social.find('li').each(function(index, el) {
                $(el).html('<a href="#" class="'+$(el).text()+'">'+$(el).text()+'</a>');
            });

            $(social).on('click touch', 'a', function(e) {
                e.preventDefault();
                socialShare($(this).attr('class'), window.location.href);
            });
        } else {
            $(social).remove();
        }
        links = el.find('.links-list');
        if ($(links).html().trim() === '') {
            $(links).remove();
        }
    });

    function socialShare(social, path) {
        switch(social) {
            case 'facebook':
            window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(path),
                '', 'status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
            case 'twitter':
            window.open( 'http://twitter.com/share?url='+encodeURIComponent(path),
                '','status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
        }
    }
})(jQuery2);