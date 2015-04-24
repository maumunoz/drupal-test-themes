/*global jQuery2 */
(function ($) {
    'use strict';

    // Split content
    function onResizeSplit() {
        if ($(window).width() > 768) {
            var props = $(".node-type-cerveza .field-name-field-propiedades > .field-items > .field-item"),
                h = $(".field-name-field-imagen .field-item img").height()/3;
            props.each(function(i,el) {
                $(el).css('height', h);
                
                if (i>=props.length-2) $(el).addClass("noborder");
            });
        }
    }
    $(window).on('resize', onResizeSplit);
    $(document).ready(function () {
        onResizeSplit();
        setTimeout(function () {
            $(window).resize();
        }, 1000);
    });
    
    
    
    //Content images, with link inside image
    $.initModule(".field-name-field-link-bot-n", function ($, field_link) {
        var label = $(".field-name-field-t-tulo-bot-n").text();
        var link = $("<p><a href='"+field_link.text()+"'>"+label+"</a></p>");
        
        $(".field-name-field-imagen").addClass("field-name-field-contenido-previo").append(link);
    });
    

}(jQuery2));

