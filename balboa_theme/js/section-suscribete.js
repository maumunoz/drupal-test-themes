/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '.node-type-webform',
        banner = '.field-name-field-contenido-previo',
        form = '.webform-client-form',
        $page,
        formFields = [{
            node: '#edit-submitted-new-1429653904277',
            placeholder: 'Nombre'
        },
        {
            node: '#edit-submitted-new-1429653949677',
            placeholder: 'Apellidos'
        },
        {
            node: '#newsletter_day',
            placeholder: 'Día'
        },
        {
            node: '#newsletter_month',
            placeholder: 'Mes'
        },
        {
            node: '#newsletter_year',
            placeholder: 'Año'
        },
        {
            node: '#edit-submitted-new-1429654452284',
            placeholder: 'Correo electrónico'
        }];

    // Detect page type
    $.initModule(node, function ($, page) {
        $page = page;
        banner = page.find(banner);
        if (banner.length) {
            banner.find('p').each(function() {
                if ($(this).is(':empty')) {
                    $(this).remove();
                }
            });
        }
    });

    $(document).ready(function($) {
        form = $page.find(form);

        if (form.length) {
            $.each(formFields, function(index, val) {
                if ($(val.node).length) {
                    $(val.node).attr('placeholder', val.placeholder);
                }
            });

            $(form).on('click touch', '.form-submit', function(e) {
                e.preventDefault();
                $(form).validate({
                    rules: {
                        'edit-submitted-new-1429653904277': {
                            required: true
                        },
                        'edit-submitted-new-1429653949677': {
                            required: true
                        },
                        'newsletter_day': {
                            required: true,
                            number: true,
                            minlength: 2
                        },
                        'newsletter_month': {
                            required: true,
                            number: true,
                            minlength: 2
                        },
                        'newsletter_year': {
                            required: true,
                            number: true,
                            minlength: 4
                        },
                        'edit-submitted-new-1429654452284': {
                            required: true,
                            email: true
                        }
                    }
                });

                if ($(form).valid()) {
                    $('.form-errors').addClass('hidden');
                    $(form).submit();
                } else {
                    $('.form-errors').removeClass('hidden');
                }
            });
        }
    });

}(jQuery2));

