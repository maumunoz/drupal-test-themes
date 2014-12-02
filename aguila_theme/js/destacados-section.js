/*global jQuery2 */
(function ($) {
    var viewDestacados = $(".view-descatados");

    if (viewDestacados.length) {
        viewDestacados.find('.views-row').each(function(index, el) {
            var nodeCategoria = $(this).find('span.categoria'),
                nodeDate = $(this).find('.views-field-create span.field-content'),
                cssClass,
                publishDate = moment(nodeDate.text().trim()),
                numDays;

            //Set the background color for each categoria element.
            switch (nodeCategoria.text().trim().toUpperCase()) {
                case "LAS CHICHAS AGUILA":
                    cssClass = 'btn-pink';
                break;
                case "LA RUTA":
                    cssClass = ($(this).hasClass('amarillo') ? 'btn-yellow' : 'btn-gold');
                break;
                case "AGUILA EN VIVO":
                    cssClass = 'btn-medium-blue';
                break;
                case "FUTBOL":
                    cssClass = 'btn-red';
                break;
                default:
                    cssClass = 'btn-gold';
            }

            nodeCategoria.addClass(cssClass);

            //Set time in days.
            numDays = moment().diff(publishDate, 'days');
            nodeDate.text((numDays === 0 ? "Hoy" : "Hace " + numDays + " Día" + (numDays.length === 1 ? "" :  "s")));


            //Add arrow
            $(this).append('<div class="views-field views-field-arrow"><span class="arrow"></span></div>');
        });
    }
}(jQuery2));