/*global jQuery2, jQuery, document */
(function ($, jq) {

    function transformar() {
        // no se puede utilizar la referencia a la lista porque el nodo en el DOM cambia
        $('.lista-lugares-fiesta').find('.view-content > .item-list > ul > li.views-row:not(.transformado)').transform({
            process: function ($, el) {
                var rating,
                    ratingText;

                el.addClass('transformado');

                if (el.find('.favoritos.logged-in').length === 0) {
                    el.find('.favoritos.hidden').removeClass('hidden');
                }
                if (el.find('.favoritos-hover.link')) {
                    el.find('.favorites-hover.hidden').removeClass('hidden');
                }

                // clean the rating field
                rating = el.find('.views-field-field-rating .clearfix');
                ratingParent = rating.parent();
                rating.remove();
                ratingParent.prepend('<span>' + rating.text().replace('/5', '') + '</span>');
            }
        });
    }

    $.initModule('.lista-lugares-fiesta', function () {
        transformar();
        jq(document).ajaxComplete(function () {
            setTimeout(transformar, 50)
        });
    });

}(jQuery2, jQuery));