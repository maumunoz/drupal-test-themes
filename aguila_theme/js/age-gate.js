function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

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
                    
                    
                    if( isMobile() )
                    {
                        popup.find("input.form-text").each(function(i, el) {
                           $("<input type='number' />").attr({ name: this.name, placeholder: this.value, id: this.id, size: this.size, maxlength: this.maxlength, "class": this["class"] }).attr("maxlength",$(this).attr("maxlength")).data("i",i+1).keyup(function(){ age_checker.nextbox(this, jQuery(this).data("i") ); }).addClass("whiteplaceholder").insertBefore(this);
                        }).remove();
                    }
                    
                    var submit = popup.find("input[type='submit']");
                    submit.before( $(".agegate_pre_submit") );
                    $(".agegate_pre_submit").before( $('#age_checker_error_message') );
                    submit.bind('click', function () {
                        var recordarDetalles = popup.find('#rememberme').is(':checked');
                        setTimeout(function () {
                            if (jQuery.cookie('age_checker') === '1') {
                                jQuery.cookie('age_checker', '1', { path: '/', expires: (recordarDetalles ? parseInt(Drupal.settings.age_checker.cookie_expiration, 10) : undefined) });
                            }
                        }, 150);
                    });
                }
            }, 150);
        };
    }
})(jQuery);