(function ($) {
      var original = Drupal.behaviors.age_checker.attach;
      Drupal.behaviors.age_checker.attach = function (context, settings)  {
        original(context, settings);
        setTimeout(function () {
            var popup = $('#age_checker_verification_popup');
            if (popup.is(':visible')) {
                console.log('age gate is shown');
                console.log(popup);
            }
        }, 15);
      };
})(jQuery);