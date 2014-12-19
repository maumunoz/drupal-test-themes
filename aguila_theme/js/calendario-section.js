/*global jQuery2 */
(function ($) {
    var node = ".calendar-calendar",
        eventos, fechas, dias, colorEvento,
        fechaEvento, overlays;

    $.initModule(node, function ($, calendar) {
        fechas = calendar.find("tr.date-box");
        dias = calendar.find("tr.single-day");
        eventos = dias.find(".evento-calendario");
        overlays = $('.evento-calendario-overlay');

        // Add color via CSS class to Evento
        eventos.each(function(i, el) {
            colorEvento = $(el).find(".color").text().toLowerCase();
            fechaEvento = $(el).closest("td").attr("data-date");
            fechas.find("td[data-date*="+fechaEvento+"]").addClass(colorEvento);
            dias.find("td[data-date*="+fechaEvento+"]").addClass(colorEvento);
        });

        // Add click event to display Evento overlay
        fechaEvento = "";
        fechas.find('td').on('click touchend', function(event) {
            fechaEvento = $(this).attr('data-date');
            overlays.addClass("hidden");
            dias.find("td[data-date*="+fechaEvento+"] .evento-calendario-overlay").removeClass("hidden");
            event.preventDefault();
        });
        dias.find('td').on('click touchend', function(event) {
            overlays.addClass("hidden");
            $(this).find(".evento-calendario-overlay").removeClass("hidden");
            event.preventDefault();
        });
    });
}(jQuery2));