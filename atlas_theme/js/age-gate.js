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
                    
                    var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
                    if( isMobile )
                    {
                        popup.find("input.form-text").each(function(i, el) {
                           $("<input type='tel' />").attr({ name: this.name, placeholder: this.value, id: this.id, size: this.size, maxlength: this.maxlength, "class": this["class"] }).attr("maxlength",$(this).attr("maxlength")).data("i",i+1).keyup(function(){ jQuery(this).val( this.value.substr(0,4) ); age_checker.nextbox(this, jQuery(this).data("i") ); }).attr("max","2999").addClass("whiteplaceholder").insertBefore(this);
                        }).remove();
                        //document.getElementById('edit-submitted-new-1416608538262-new-1416608591397').setAttribute('pattern',"\\d*");
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
                    
                    age_checker.lastNext = 0;
                    age_checker.originalNextbox = age_checker.nextbox;
                    age_checker.nextbox = function( fldobj, nbox ) {
                        var time = new Date().getTime();
                        if( time > age_checker.lastNext + 800) {
                            age_checker.originalNextbox( fldobj, nbox );
                            age_checker.lastNext = time;
                        }
                        
                    }
                }
            }, 150);
        };
    }
})(jQuery);