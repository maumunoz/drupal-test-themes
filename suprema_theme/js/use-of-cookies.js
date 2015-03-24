(function ($) {

    //Initialize Page content
    $.initModule(".cookie-close", function ($, closebutton) {
        if (jQuery.cookie("cookie-use-accepted")=="yes") $(closebutton).parent().hide();
        closebutton.bind("click touch", function(event) {
            jQuery.cookie("cookie-use-accepted","yes")
            jQuery(this).parent().slideUp();
        });
    });

})(jQuery2);