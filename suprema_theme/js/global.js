(function ($) {
    
    //Initialize Page content
    $.initModule(".region-content", function ($, pageContent) {
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
    });

    $.initModule("#search-block-form", function ($, searchblock) {
        $(searchblock).before( $(".btn-menu-mobile") );
        $(searchblock).before( $(".social-header-left").parent().children() );
        $(".social-header-left").find('br').remove();
    });
    
    jQuery(window).scroll(function() {
        var _scrollTop = jQuery(window).scrollTop();
        if(_scrollTop<20) {
            jQuery("#site-name").removeClass("hideMe");
        }else{
            jQuery("#site-name").addClass("hideMe");
        }
    });

    
    


})(jQuery2);