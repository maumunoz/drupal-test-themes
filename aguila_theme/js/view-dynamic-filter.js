/*global jQuery2 */
(function ($, jq) {
    var node = '.view-dynamic-filter';

    // Transform filters to content region
    function transform (el) {
        node = el.parents('.block-views')[0] || el;
        $.transform(node, {
            target: "#content-inner",
            type: 'prepend',
            globalTarget: true
        });
    }

    $.initModule(node, function ($, filters) {
        filters.find('a.filter').on('click', function (e) {
            var $this = $(this),
                widgets = jq('.views-exposed-widgets'),
                select = widgets.find('select'),
                submit = widgets.find('input[type=submit]'),
                text = $this.hasClass('all') ? null : $(this).text();
                $this.siblings().removeClass('active');
                $this.addClass('active');

            e.preventDefault();
            if (!text) {
                select.val(select.find('option:first').val());
            } else {
                select.val(select.find('option:contains("' + $(this).text() + '")').val());
            }
            submit.click();
        });
        transform(filters);
    });
}(jQuery2, jQuery));