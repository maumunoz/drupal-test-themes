(function ($) {


    //Initialize Page content
    $.initModule(".region-content", function ($, pageContent) {
    
        $('a:contains("Chelada"):not(.menu-dropdown-with-ul)').attr("href","#");
        $('a:contains("Chicas ATLAS"):not(.menu-dropdown-with-ul)').attr("href","#");

        //Add css class to page based on URL
        var contentAttr = pageContent.find("*[typeof*='foaf:Document']"),
            classList;
        if(contentAttr.length) {
            contentAttr = contentAttr.attr('about');
            if(typeof contentAttr !== typeof undefined && contentAttr !== false) {
                classList = contentAttr.split( '/' );
                $.each(classList, function(i, val) {
                    $('body').addClass(val);
                });
            }
        }
        
        setTimeout(function($) {
            $(".sb-slidebar").prepend( $("#search-block-form").clone() );
            $(".sb-slidebar").find("#edit-search-block-form--2").attr('autocomplete','off');
            $( '.sb-slidebar' ).on( 'touchend click', 'input[type="submit"]', function ( event ) {
                $( '.sb-slidebar' ).find("form").submit();
            });
        },500,jQuery2);
    });

})(jQuery2);