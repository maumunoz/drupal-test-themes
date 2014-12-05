/*global jQuery2, moment*/
(function ($) {
    var sbNoticias = $(".sidebar-noticias");

    if (sbNoticias.length) {
        sbNoticias.find('.views-row').each(function () {
            var nodeDate = $(this).find('.views-field-created span.field-content'),
                publishDate = moment($.trim(nodeDate.text()), "YYYY-MM-DD").format('D MMMM YYYY');

            //Set date in days.
            nodeDate.text(publishDate);
        });
    }
}(jQuery2));