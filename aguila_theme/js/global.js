WebFontConfig = {
    google: {
        families: ['Open+Sans:300italic,400italic,600italic,700,300,600,400:latin']
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

(function ($) {
    $(document).ready(function () {
        // Transform Newsletter Form
        $.transform("#block-views-formulario-aguila-news-block-1", {
            target: "#web-form-aguila-news-container",
            type: 'append'
        });

        //Transform Logo
        $("#block-system-main-menu .menu li:eq(2)").after('<li class="leaf item-logo"></li>');
        $.transform(".site-name-wrapper", {
            target: "#block-system-main-menu .menu .item-logo",
            type: 'append'
        });
    });

})(jQuery2);

