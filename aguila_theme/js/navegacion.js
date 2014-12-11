/*global jQuery2 */
(function ($) {

    function adjust() {
        var header = $('.site-name-wrapper'),
            headerOffset = header.offset().left,
            headerWidth = header.outerWidth(),
            menu = $('#block-system-main-menu'),
            items = menu.find('ul.menu > li > a'),
            navOffset = items.first().offset().left,
            itemPadding,
            before,
            beforeWidth = 0,
            after;

        if (menu.is(':visible')) {
            // reset items padding
            items.css('paddingLeft', '').css('paddingRight', '');
            itemPadding = parseInt(items.first().css('paddingLeft'), 10);

            // find the items before and after the logo
            items.each(function (index) {
                if (before === undefined || after === undefined) {
                    var item = $(this),
                    offset = item.offset().left,
                    width = item.outerWidth();

                    if ((offset + width - itemPadding) < headerOffset) {
                        beforeWidth += width;
                        before  = index;
                    } else if (before !== undefined) {
                        after = index;
                    }
                }
            });

            if (before !== undefined && after !== undefined) {
                var newItemPadding = (headerOffset - navOffset - (beforeWidth - itemPadding * before * 2 + itemPadding / 2)) / before / 2,
                    beforeNode = items.eq(before),
                    beforeAfterPadding;

                items.css('paddingLeft', newItemPadding).css('paddingRight', newItemPadding);
                beforeAfterPadding = (headerOffset + headerWidth / 2) - (beforeNode.offset().left + beforeNode.outerWidth() - newItemPadding);
                beforeNode.css('paddingRight', beforeAfterPadding);
                items.eq(after).css('paddingLeft', beforeAfterPadding);
            }
        }
    }

    adjust();
    $(window).on('resize', adjust);

}(jQuery2));