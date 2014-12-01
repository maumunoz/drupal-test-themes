/*global jQuery2 */
(function ($, jq) {

    $.initModule('.view-dynamic-filter', function ($, filters) {
        filters.find('a.filter').on('click', function (e) {
            var $this = $(this),
                widgets = jq('.views-exposed-widgets'),
                select = widgets.find('select'),
                submit = widgets.find('input[type=submit]'),
                text = $this.hasClass('all') ? null : $(this).text();

            e.preventDefault();
            if (!text) {
                select.val(select.find('option:first').val());
            } else {
                select.val(select.find('option:contains("' + $(this).text() + '")').val());
            }
            submit.click();
        })
    });
}(jQuery2, jQuery));