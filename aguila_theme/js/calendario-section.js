/*global jQuery2 */
(function ($, jq) {
    var eventos, fechas, dias, colorEvento, fechaEvento, overlays, dia, evento, banner;
        
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
    
    function transformarCal() {
        $(".view-calendario-chicas-aguila").find(".calendar-calendar:not(.transformado)").transform({
            process: function ($, calendar) {
                calendar.addClass('transformado');
                
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

                var fecha = $(".date-heading h3").html().replace(/[A-Za-z\u00C0-\u017F]+, ([A-Za-z\u00C0-\u017F]+) [0-9]+, ([0-9]+)/gi, "$1, $2");
                $(".date-heading h3").html(fecha).addClass("formatted");
                
                
               $("td.single-day:not(.no-entry):not(.empty)").each(function(i,el){
                    var evento = $("<div class='event-tobe'></div>");
                    var partesFecha = $(el).attr("data-date").split("-");
                    evento.attr("data-date", partesFecha[1]+"-"+partesFecha[2]+"-"+partesFecha[0]);
                    evento.append($(el).find(".evento-calendario-overlay").clone().removeClass("hidden"));
                    
                    jQuery("#mobile-calendar .events").append(evento);
                });

                var partesFecha = $($("td.single-day")[10]).attr("data-date").split("-");
                jQuery("#mobile-calendar").dzscalendar({ 
                    settings_alwaysinclude6rows: "on",
                    start_month: partesFecha[1],
                    start_year: partesFecha[0]
                 });

            }
        });
    }

    $.initModule(".view-calendario-chicas-aguila", function () {
        transformarCal();
        jq(document).ajaxComplete(function () {
            setTimeout(transformarCal, 50);
        });
    });
}(jQuery2, jQuery));