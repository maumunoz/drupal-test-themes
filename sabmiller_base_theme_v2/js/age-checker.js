/*global jQuery, Drupal */

/*
To add a new component must use the DIV Special Container via CKEditor.

All components name must follow this format:
- Use always a class attribute
- Use the age checker prefix: 'age_checker-''
-- Examples: 'age_checker-banner', 'age_checker-image'

- In order to make appear the date, submit and error message components,
  the following components must be present (DIV Special Container):
  'age_checker-date', 'age_checker-submit', 'age_checker-errors'

- To modify the components groups/wrappers use the following extra classes
-- 'contained': element grouped inside a 'container-fluid' element
-- 'sibling contained': consecutive components using this class will be grouped inside a 'container-fluid' element

- If "Remember Preferences" checkbox need to be displayed, add the id="age_checker_expiration" to input[type='checkbox'] element
- By default, 'age_checker-footer' class is reserved and fixed to the bottom via CSS

*/

(function (jq, $) {
    'use strict';
    var original,
        config = {},
        content = '#age_checker_verification_popup',
        overlay = '#age_checker_overlay',
        msgFieldNode = 'age_checker_message',
        ageCheckerPrefix = 'age_checker-',
        expiration = '#age_checker_expiration',
        cookieName = 'age_checker',
        form,
        mobile,
        siblings = [];

    // Base configuration for Age Checker module
    Drupal.age_checker = {
        config: {
            date: {
                node: '.age_checker-date',
            },
            submit: {
                node: '.age_checker-submit',
            },
            errors: {
                node: '.age_checker-errors',
            },
            footer: {
                node: '.age_checker-footer'
            }
        }
    };

    age_checker.lastNext = 0;
    age_checker.originalNextbox = age_checker.nextbox;
    age_checker.nextbox = function( fldobj, nbox ) {
        var time = new Date().getTime();
        if( time > age_checker.lastNext + 800) {
            age_checker.originalNextbox( fldobj, nbox );
            age_checker.lastNext = time;
        }
    }

    if(typeof Drupal.behaviors.age_checker !== 'undefined') {
        original = Drupal.behaviors.age_checker.attach;

        Drupal.behaviors.age_checker.attach = function (context, settings)  {
            original(context, settings);

            setTimeout(function () {
                content = $(content);
                overlay = $(overlay);
                mobile = isMobile();
                config = Drupal.age_checker.config;

                // Responsive Desing presets
                if (jq.cookie(cookieName) === null) {
                    $('html').css('overflow', 'hidden');
                    if ($(overlay).length && $(config.footer.node).length) {
                        overlayHeight();
                        $(window).on('resize', overlayHeight);
                    }
                } else {
                    $('html').css('overflow', 'auto');
                }

                // Verify Age Checker content is been loaded
                if (content.is(':visible')) {
                    content.hide();
                    content.removeAttr('style');

                    // Transform Date widget
                    $.transform('#age_checker_widget', {
                        process: function ($, node) {
                            var form = node.find('form'),
                                errors = node.find('#age_checker_error_message');

                            if (mobile) {
                                form.find("input.form-text").each(function(i, el) {
                                    $("<input type='tel' />").attr({ name: this.name, placeholder: this.value, id: this.id, size: this.size, maxlength: this.maxlength, "class": this["class"] }).attr("maxlength",$(this).attr("maxlength")).data("i",i+1).keyup(function(){ jq(this).val( this.value.substr(0,4) );
                                    age_checker.nextbox(this, jq(this).data("i") ); }).attr("max","2999").addClass("whiteplaceholder").insertBefore(this);
                                }).remove();
                            }

                            form.find('.form-item').appendTo(config.date.node);
                            form.find('> div > input').appendTo(config.submit.node);
                            errors.appendTo(config.errors.node);

                            form.empty();
                            $('div[id='+msgFieldNode+']').wrapAll(form);
                            node.remove();
                        }
                    });

                    // Override form submit
                    $(config.submit.node+" .form-submit").on('click touch', function () {
                        var expire = false;

                        if ($(expiration).length && $(expiration).is(':checked')) {
                            expire = true;
                        }

                        setTimeout(function () {
                            if (jq.cookie(cookieName) === '1') {
                                jq.cookie(cookieName, '1', { path: '/', expires: (expire ? parseInt(Drupal.settings.age_checker.cookie_expiration, 10) : undefined) });
                            }
                        }, 150);
                    });

                    // Run through each component to add DOM wrappers based on configuration
                    $('div[id='+msgFieldNode+']').each(function(index, el) {
                        $(this).find('div[class^="'+ageCheckerPrefix+'"]').each(function(index, el) {
                            el = $(this);

                            var hasContainer = el.hasClass('contained'),
                                isSibling = el.hasClass('sibling');

                            if(hasContainer && !isSibling) {
                                addSiblings();
                                el.wrap('<div class="container-fluid"></div>');
                            } else if (!hasContainer && isSibling) {
                                addSiblings();
                            } else if (hasContainer && isSibling) {
                                siblings.push(el);
                            } else {
                                addSiblings();
                            }
                        });
                        addSiblings();
                    });

                    // Markup Cleanup
                    content.find('p, '+'div[class^="'+ageCheckerPrefix+'"]').each(function(index, el) {
                        el = $(this);
                        el.removeAttr('style');
                        if (el.html() === '&nbsp;' || el.html() === '') {
                            el.remove();
                        }
                    });

                    // Show content after transfomation ends
                    content.show();
                    overlayHeight();
                }

            }, 150);
        };
    }

    function isMobile () {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }

    function addSiblings() {
        var siblingsSelector = '';

        if (siblings.length) {
            siblingsSelector = $(siblings).map (function () {return this.toArray(); } );
            siblingsSelector.wrapAll('<div class="container-fluid clearfix"></div>');
            siblings = [];
        }
    }

    function overlayHeight() {
        var vSize = $(window).height() - $(config.footer.node).outerHeight()+'px';
        console.log($(config.footer.node).outerHeight());
        overlay.css('height', vSize);
        overlay.css('min-height', vSize);
    }

})(jQuery, jQuery2);