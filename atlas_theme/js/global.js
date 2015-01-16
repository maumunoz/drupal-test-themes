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
    });

})(jQuery2);