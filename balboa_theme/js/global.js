/* globals jQuery2 */
(function ($) {
'use strict';
//Initialize Page content
$.initModule('.region-content', function ($, pageContent) {
    //Add css class to page based on URL
    var contentAttr = pageContent.find('*[typeof*="foaf:Document"]'),
        titleAttr = pageContent.find('*[property*="dc:title"]'),
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
    if(titleAttr.length) {
        titleAttr = 'title-'+titleAttr.attr('content').replace(/\s/g,'-');
        $('body').addClass(titleAttr);
    }
});

})(jQuery2);