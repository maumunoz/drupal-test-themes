/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '.lista-promos-destacada',
        now = moment(),
        items = 0,
        finalDate,
        dueDate,
        list;

    $.initModule(node, function ($, promoDestacada) {
        list = promoDestacada.find('.item-list ul');
        items = (list.find('li').length) ? list.find('li').length : 0;

        $(list).find('li:not(.placeholder)').each(function() {
            finalDate = $(this).find('.dueDate');
            if (finalDate.length) {
                dueDate = moment($.trim(finalDate.text()));
                if (dueDate.isValid() && dueDate.isBefore(now)) {
                    $(this).find('.final-date').removeClass('hidden');
                }
            }
        });
    });

}(jQuery2));