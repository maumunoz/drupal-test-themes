/*global jQuery2 */
(function ($) {
    var node = '.banner-cerveza';

    $.initModule(node, function ($, el) {
        var bgNode = el.find('.views-field.views-field-field-cerveza-imagen-fondo');
        if($(bgNode).length) {
            el.css('backgroundImage', 'url(' + bgNode.find('img').attr('src') + ')');
            bgNode.find('img').remove();
        }
    });

}(jQuery2));