(function ($) {
    $(document).ready(function () {
        $.transform("#block-views-formulario-aguila-news-block-1", {
            target: "#web-form-aguila-news-container",
            type: 'append'
        });

        //Transform Logo
        transform_logo();
    });

    function transform_logo () {
        var node = $("#block-system-main-menu .menu li:eq(2)").after('<li class=" leaf item-logo"></li>');

        $.transform(".site-name-wrapper", {
            target: "#block-system-main-menu .menu .item-logo",
            type: 'append'
        });
    }

})(jQuery2);