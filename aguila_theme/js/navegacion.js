/*global jQuery2 */
(function ($) {

    $('.menu a:contains("Cervezas")').attr("href","#");

        
    function setActive() {
        var menuItems = $('#block-system-main-menu ul.menu > li > a'),
            active = menuItems.filter('.active'),
            seccion;

        if (active.length === 0) {
            seccion = $('.view-seccion-navegacion .global-seccion').text();

            if (seccion && seccion !== '') {
                seccion = seccion.toLowerCase();

                if (seccion.indexOf('ruta') >= 0) {
                    active = menuItems.filter('[href="/ferias-y-fiestas"]');
                } else if (seccion.indexOf('en vivo') >= 0) {
                    active = menuItems.filter('[href="/aguila-en-vivo"]');
                } else if ((seccion.indexOf('futbol') >= 0) || (seccion.indexOf('fútbol') >= 0)) {
                    active = menuItems.filter('[href="/fubtol"]');
                } else if (seccion.indexOf('chicas') >= 0) {
                    active = menuItems.filter('[href="/chicas-aguila"]');
                } else if (seccion.indexOf('cerveza') >= 0) {
                    active = menuItems.filter('[href^="/cerveza/"]');
                }

                active.first().addClass('active').parent().addClass('active-trail');
            }
        }
    }

    function adjust() {
        var header = $('.site-name-wrapper'),
            items = $("#block-system-main-menu .content>ul>li"),
            count = items.length,
            center = Math.ceil(count/2)-1;
            
        $(items[center]).after( header );
        header.wrap("<li></li>");
        offset = $("#block-system-main-menu").width()/2-header.width()/2-header.parent().position().left;
        offset_slice = Math.round(offset/(center+1)/2);
        for(var i=0; i<=center; i++) {
            var currentPadding = parseInt( $(items[i]).find("a").css("padding-right") );
            currentPadding += offset_slice;
            $(items[i]).find("a").css("padding-left", currentPadding)
            $(items[i]).find("a").css("padding-right", currentPadding)
        }
        for(var i=center+1; i<count; i++) {
            currentPadding = parseInt( $(items[i]).find("a").css("padding-right") );
            currentPadding += offset_slice;
            $(items[i]).find("a").css("padding-left", currentPadding)
            $(items[i]).find("a").css("padding-right", currentPadding)
        }
    }
    
    
    function adjustOld() {
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
                beforeAfterPadding*=0.91;
                beforeNode.css('paddingRight', beforeAfterPadding);
                items.eq(after).css('paddingLeft', beforeAfterPadding);
            }
        }
    }

    
    setActive();
    
    $.ogSlidebars = $.slidebars;
    $.slidebars = function (options) {
        jQuery2.ogSlidebars(options);
        adjust();
        jQuery2(".sb-slidebar").prepend( jQuery2('.site-name-wrapper').clone() );
    }
    
    //$(document).ready(adjust);
    //$(window).on('load', adjust);
    //$(window).on('resize', adjust);

}(jQuery2));