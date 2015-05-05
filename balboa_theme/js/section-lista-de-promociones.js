/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '.lista-promos',
        now = moment(),
        offset = 4,
        items = 0,
        finalDate,
        dueDate,
        list,
        i;

    $.initModule(node, function ($, promoList) {
        list = promoList.find('.item-list ul');
        items = (list.find('li').length) ? list.find('li').length : 0;

        if (items > 0) {
            for (i = offset; i > items; i--) {
                list.find('li').eq(0).clone().addClass('placeholder').appendTo(list);
            }
        }

        $(list).on('click touch', '.placeholder a', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });


    });

}(jQuery2));

