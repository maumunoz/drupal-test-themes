(function ($) {
    if(typeof Drupal.behaviors.age_checker != "undefined") {
        var original = Drupal.behaviors.age_checker.attach;
        Drupal.behaviors.age_checker.attach = function (context, settings)  {
            original(context, settings);
            setTimeout(function () {
                var popup = $('#age_checker_verification_popup');
                if (popup.is(':visible')) {                
                    popup.addClass("aguila");
                    var cont = $("<div id='age_checker_content' class='agegate_content'></div>");
                    cont.append(popup.children());
                    popup.append( cont.find(".media-thumbnail-frame") );
                    popup.append( cont );
                    var overlay = $('#age_checker_overlay');
                    overlay.append($(".agegate_footer"));
                    
                    $("#age_checker_verification_popup input[type='submit']").before( $(".agegate_pre_submit") );
                }
            }, 150);
        };
    }
})(jQuery);