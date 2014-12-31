/*global jQuery2 */
(function ($) {
    var node = ".calendar-calendar",
        eventos, fechas, dias, colorEvento,
        fechaEvento, overlays, dia, evento, banner;
        
    function checkOverlayPosition($) {
        $(".evento-calendario-overlay").each(function(i,overlay){
            overlay = $(overlay);
            monthview = overlay.closest(".monthview");
            //reset
            overlay.removeClass("forceup");
            overlay.attr("style","");
            overlay.find(".box-arrow").attr("style","");
            //test
            if(monthview.offset().left+monthview.width()/2<220) {
                overlay.addClass("forceup");
                if(overlay.offset().left<0) {
                    if (overlay.css("left").indexOf("px")>-1) {
                        overlay.css("left", parseInt(overlay.css("left")) - overlay.offset().left )
                    }
                }
                var arrowx = monthview.width()/2 - parseInt(overlay.css("margin-left")) - overlay.position().left;
                overlay.find(".box-arrow").css("left",arrowx);

            }
            
        });
    }

    $.initModule(node, function ($, calendar) {
        fechas = calendar.find("tr.date-box");
        dias = calendar.find("tr.single-day");
        eventos = dias.find(".evento-calendario");
        overlays = $('.evento-calendario-overlay');

        // Add some Evento styles and markup modifications
        eventos.each(function(i, el) {
            colorEvento = $(el).find(".color").text().toLowerCase();
            fechaEvento = $(el).closest("td").attr("data-date");
            dia = fechas.find("td[data-date*="+fechaEvento+"]");
            evento = dias.find("td[data-date*="+fechaEvento+"]");
            // Add color based on selection
            dia.addClass(colorEvento);
            evento.addClass(colorEvento);
            // Duplicate day on overlay
            evento.find('.evento-calendario-overlay .date').text(dia.find('.day').text());
            // Add custom banner as background
            banner = evento.find('.bg');
            if($(banner).length) {
                banner.closest('.banner').css('backgroundImage', 'url(' + banner.find('img').attr('src') + ')');
            }
        });

        // Reusing some variables
        fechaEvento = "";
        dia = "";
        evento = "";
        // Add click event to display Evento overlay
        fechas.find('td').on('click touchend', function(event) {
            fechaEvento = $(this).attr('data-date');
            evento = dias.find("td[data-date*="+fechaEvento+"]");
            // Hide all overlays and show the correct overlay
            overlays.addClass("hidden");
            evento.find(".evento-calendario-overlay").removeClass("hidden");
            checkOverlayPosition($);
            // Deactivate selected state in Dias and Eventos and activate only for the correct
            fechas.find('td').removeClass('evento-selected');
            dias.find('td').removeClass('evento-selected');
            $(this).addClass('evento-selected');
            evento.addClass('evento-selected');
            event.preventDefault();
        });
        dias.find('td').on('click touchend', function(event) {
            fechaEvento = $(this).attr('data-date');
            dia = fechas.find("td[data-date*="+fechaEvento+"]");
            // Hide all overlays and show the correct overlay
            overlays.addClass("hidden");
            $(this).find(".evento-calendario-overlay").removeClass("hidden");
            checkOverlayPosition($);
            // Deactivate selected state in Dias and Eventos and activate only for the correct
            fechas.find('td').removeClass('evento-selected');
            dias.find('td').removeClass('evento-selected');
            $(this).addClass('evento-selected');
            dia.addClass('evento-selected');
            event.preventDefault();
        });
    });
}(jQuery2));