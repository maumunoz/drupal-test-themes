/*global jQuery2 */
(function ($) {
    $.transform('.galeria-empotrada-source', {
        target: '.galeria-empotrada',
        type: 'append',
        globalTarget: true,
        process: function ($, node) {
            node.find('h2.media_gallery-header').remove();
            return node;
        },
        afterEach: function ($, node) {
            node.removeClass('hidden');
        }
    });
}(jQuery2));