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
                var overlay = $('#age_checker_overlay');
                if (popup.is(':visible')) {                
                    popup.addClass("atlas");
                    popup.prepend($("#agegate_logo").parent());
                    popup.append($("#agegate_beer"));
                    $("div[id='age_checker_message']").each(function(i,el){
                        $(el).attr("id","age_checker_message"+i);
                        $(el).addClass("agegate_message");
                    });
                    overlay.append("<div class='agegate_header'></div>");
                    overlay.append("<div class='agegate_beer'></div>");
                    overlay.append($(".agegate_footer"));
                    $(".agegate_footer").find("p").each(function(i,el){
                        el=jQuery(el);
                        if(el.html()=="") el.remove();
                    });
                    if( isMobile() )
                    {
                        popup.find("input.form-text").each(function(i, el) {
                           $("<input type='number' />").attr({ name: this.name, placeholder: this.value, id: this.id, size: this.size, maxlength: this.maxlength, "class": this["class"] }).attr("maxlength",$(this).attr("maxlength")).data("i",i+1).keyup(function(){ age_checker.nextbox(this, jQuery(this).data("i") ); }).addClass("whiteplaceholder").insertBefore(this);
                        }).remove();
                    }
                    
                    var submit = popup.find("input[type='submit']");
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