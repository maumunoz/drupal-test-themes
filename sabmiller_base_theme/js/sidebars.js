// Avoid problems with empty sidebars and the height equalizer in Site Factory
(function ($) {
    $(document).ready(function () {
        $('#sidebar-a:empty, #sidebar-b:empty').remove();

        var sidebarB = $('#sidebar-b'),
            main,
            body,
            minWidth = Drupal.sidebarBreakpoint,
            mobile = false;

        if (sidebarB.length > 0 && minWidth > 0) {
            if (minWidth > 0) {
                main = $('#main');
                body = $('body');
                $(window).bind('resize', function () {
                    var width = body.width(); //window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    if (width < minWidth && !mobile) {
                        mobile = true;
                        main.after(sidebarB);
                    } else if (width >= minWidth && mobile) {
                        mobile = false;
                        main.before(sidebarB);
                    }
                });
            }
        }
    });
})(jQuery);