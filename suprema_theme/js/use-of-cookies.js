(function ($) {

    //Initialize Page content
    $.initModule(".cookie-close", function ($, closebutton) {
        if (jQuery.cookie("cookie-use-accepted")!="yes") $("body").addClass("accept-cookie");
        closebutton.bind("click touch", function(event) {
            jQuery.cookie("cookie-use-accepted","yes")
            jQuery("body").removeClass("accept-cookie");
        });
    });

})(jQuery2);