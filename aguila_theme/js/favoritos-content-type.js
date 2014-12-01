/*global jQuery2 */
(function ($, jq) {

    $.transform('.favoritos-content-type', {
        type: 'append',
        process: function ($, container) {
            var fav = jq('.node-flag-counter'),
                anchor = fav.find('a'),
                node;

            if (anchor.length > 0) {
                node = anchor.clone(true);
            } else {
                node = $('<a href="/user/login" class="flag flag-action flag-link-toggle"></a>').text(fav.find('.counter-summary').text());
            }

            return node;
        }
    });
}(jQuery2, jQuery));