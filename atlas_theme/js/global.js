(function ($) {

    //Initialize Page content
    $.initModule(".region-content", function ($, pageContent) {

        $('a:contains("Chelada"):not(.menu-dropdown-with-ul)').attr('href', '#');
        $('a:contains("Chicas ATLAS"):not(.menu-dropdown-with-ul)').attr('href', '#');

        //Slidebars special class for fixed elements
        $('.stack-breadcrumb').addClass('sb-slide');
        $('.stack-navigation').addClass('sb-slide');
        $('.stack-preheader .col-second').addClass('sb-slide');

        //Add css class to page based on URL
        var contentAttr = pageContent.find('*[typeof*="foaf:Document"]'),
            classList;
        if (contentAttr.length) {
            contentAttr = contentAttr.attr('about');
            if (typeof contentAttr !== typeof undefined && contentAttr !== false) {
                classList = contentAttr.split( '/' );
                $.each(classList, function (i, val) {
                    $('body').addClass(val);
                });
            }
        }

        // Duplicate search and place it in mobile menu
        setTimeout(function ($) {
            $('.sb-slidebar').prepend( $('#search-block-form').clone() );
            $('.sb-slidebar').find('#edit-search-block-form--2').attr('autocomplete','off');
            $('.sb-slidebar').on( 'touchend click', 'input[type="submit"]', function (e) {
                $('.sb-slidebar').find("form").submit();
            });

            $('.sb-slidebar').on( 'touchend click', 'input[type="text"]', function (e) {
                e.stopPropagation();
            });
        }, 500, jQuery2);
    });

})(jQuery2);