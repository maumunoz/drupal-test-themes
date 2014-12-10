/*global jQuery2, moment*/
(function ($) {
    var viewDestacados = $(".view-descatados");

    if (viewDestacados.length) {
        viewDestacados.find('.views-row').each(function () {
            var nodeDate = $(this).find('.views-field-created span.field-content'),
                publishDate = moment($.trim(nodeDate.text()), "YYYY-MM-DD"),
                numDays;

            //Set time in days.
            numDays = moment().diff(publishDate, 'days');
            nodeDate.text((numDays === 0 ? "Hoy" : "Hace " + numDays + " día" + (numDays === 1 ? "" :  "s")));
            nodeDate.addClass('show');

            //Add arrow
            $(this).find(".views-field-field-thumbnail").append('<div class="views-field views-field-arrow"><span class="arrow"></span></div>');
        });
    }
}(jQuery2));