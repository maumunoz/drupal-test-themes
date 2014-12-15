(function ($) {
      var original = Drupal.behaviors.age_checker.attach;
      Drupal.behaviors.age_checker.attach = function (context, settings)  {
        original(context, settings);
        setTimeout(function () {
            var popup = $('#age_checker_verification_popup');
            if (popup.is(':visible')) {
                console.log('age gate is shown');
                console.log(popup);
                
                var overlay = $('#age_checker_overlay');
                overlay.append($(".agegate_footer_links"));
                overlay.append($(".agegate_footer_disclaimer"));
                
                $("#age_checker_verification_popup input[type='submit']").before( $(".agegate_pre_submit") );
            }
        }, 150);
      };
})(jQuery);