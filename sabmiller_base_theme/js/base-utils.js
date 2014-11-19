
(function ($) {

    // Base Configuration for Responsive Navigation
    Drupal.navigation = {
        elements: [{
            target: '#block-system-main-menu .content',
            css: 'mobile-main-menu',
            configure: function (node) {
                node.find('li.expanded > ul.menu').removeAttr('style');
                node.on('touchend click', 'li.expanded', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(e.currentTarget).toggleClass('open');
                });
            }
        }],
        linkTarget: '#block-system-main-menu',
        linkPosition: 'after',
        linkHTML: '<a id="mobile-menu-action"></a>',
        slidebarPosition: 'left'
    };


    $(document).ready(function () {
        var body = $('body');

        // Avoid problems with empty sidebars and the height equalizer in Site Factory
        $('#sidebar-a, #sidebar-b').filter(function () {
            return $.trim($(this).text()) === '';
        }).remove();

        // Makes Sidebar B behave in a responsive way
        var sidebarB = $('#sidebar-b'),
            main,
            minWidth = Drupal.sidebarBreakpoint,
            mobile = false;

        if (sidebarB.length > 0 && minWidth > 0) {
            if (minWidth > 0) {
                main = $('#main');

                function sidebarResize() {
                    var width = body.width(); //window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    if (width < minWidth && !mobile) {
                        mobile = true;
                        main.after(sidebarB);
                    } else if (width >= minWidth && mobile) {
                        mobile = false;
                        main.before(sidebarB);
                    }
                }

                $(window).on('resize', sidebarResize);
            }
        }



        // Navigation
        var nav = Drupal.navigation;
        if (nav) {
            $.transform(nav.linkTarget, {
                type: nav.linkPosition,
                process: function () {
                    return $(nav.linkHTML).addClass('.sb-toggle-' + nav.slidebarPosition); 
                }
            });
            var navSlidebarContainer = $('<div class="sb-slidebar sb-' + nav.slidebarPosition + '">abc</div>');
            $.each(nav.elements, function (el) {
                var clone = $(el).clone(el.cloneEvents);
                clone.removeAttr('id class');
                clone.addClass(el.css);
                navSlidebarContainer.append(clone);
            });
            navSlidebarContainer.after('#page');
            $.slidebars();
        }



        // Global Support for Custom Background Images
        var bgFields = $('.field-name-field_bg_image');
        if (bgFields.length > 0) {
            body.css('backgroundImage', 'url(' + bgFields.attr('src') + ')');
            bgFields.remove();
        } else {
            body.addClass('bg-default');
        }
    });
})(jQuery2);