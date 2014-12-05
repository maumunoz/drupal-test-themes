/*global jQuery, jQuery2 */
(function ($, jq) {

    $.transform('.favoritos-content-type', {
        type: 'replace',
        process: function ($, container) {
            var fav = jq('.node-flag-counter'),
                anchor = fav.find('a'),
                node;

            if (anchor.length > 0) {
                node = $('<span class="flag-wrapper" />').append(anchor.clone(true));
            } else {
                node = $('<span class="flag-wrapper"><a href="/user/login" class="flag flag-action flag-link-toggle"></a></span>').text(fav.find('.counter-summary').text());
            }

            return node;
        }
    });
}(jQuery2, jQuery));