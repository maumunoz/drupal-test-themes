// Avoid problems with empty sidebars and the height equalizer in Site Factory
(function ($) {
    $(document).ready(function () {
        $('#sidebar-a:empty, #sidebar-b:empty').remove();

        var sidebarB = $('#sidebar-b'),
            main,
            minWidth = Drupal.sidebarBreakpoint || 400,
            mobile = false;

        if (sidebarB.length > 0) {
            if (minWidth > 0) {
                main = $('#main');
                $(window).bind('resize', function () {
                    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    if (width < minWidth && !mobile) {
                        mobile = true;
                        sidebarB.after(main);
                    } else if (width >= minWidth && mobile) {
                        mobile = false;
                        sidebarB.before(main);
                    }
                });
            }
        }
    });
})(jQuery);