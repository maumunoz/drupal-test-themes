/*global jQuery2 */
(function ($) {
    // Transform Newsletter Form
    $.transform("#block-views-formulario-aguila-news-block-1", {
        target: "#web-form-aguila-news-container",
        type: 'append',
        globalTarget: true,
        afterEach: function ($, node) {
            node.find('input[type="text"]').attr('placeholder', 'Tucorreo@mail.com');
        }
    });
}(jQuery2));

