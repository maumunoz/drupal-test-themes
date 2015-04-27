/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '.node-type-webform',
        banner = '.field-name-field-contenido-previo',
        form = '.webform-client-form',
        $page,
        formFields = [{
            node: '#edit-submitted-new-1429653904277',
            placeholder: 'Nombre',
            css: 'required lettersonly'
        },
        {
            node: '#edit-submitted-new-1429653949677',
            placeholder: 'Apellidos',
            css: 'required lettersonly'
        },
        {
            node: '#newsletter_day',
            placeholder: 'Día (00)',
            css: 'required'
        },
        {
            node: '#newsletter_month',
            placeholder: 'Mes (00)',
            css: 'required'
        },
        {
            node: '#newsletter_year',
            placeholder: 'Año (0000)',
            css: 'required'
        },
        {
            node: '#edit-submitted-new-1429654452284',
            placeholder: 'Correo electrónico',
            css: 'required email'
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
        form = ($(node) && $(node).length) ? $(node).find(form) : [];
        if (form.length > 0) {
            $.each(formFields, function(index, val) {
                if ($(val.node).length) {
                    $(val.node).attr('placeholder', val.placeholder);
                    $(val.node).addClass(val.css);
                }
            });

            // Date Validation
            $.validator.addMethod('validate', function(value, element, params) {
                var day = parseInt($(params[0]).val(), 10),
                    month = parseInt($(params[1]).val(), 10),
                    year = parseInt($(params[2]).val(), 10),
                    dob = new Date(year, month-1, day);
                return ((!day && !month && !year) || (!isNaN(dob.getTime())));
            }, 'You should enter a valid date');

            // Letters only validation
            $.validator.addMethod('lettersonly', function(value) {
                return /^[ñáéíóúÁÉÍÓÚa-zA-Z\s]+$/i.test(value);
            }, 'Letters only please');

            $(form).validate({
                rules: {
                    'newsletter_day': {
                        number: true,
                        min: 1,
                        max: 31,
                        validate: ['#newsletter_day', '#newsletter_month', '#newsletter_year']
                    },
                    'newsletter_month': {
                        number: true,
                        min: 1,
                        max: 12,
                        validate: ['#newsletter_day', '#newsletter_month', '#newsletter_year']
                    },
                    'newsletter_year': {
                        number: true,
                        minlength: 4,
                        validate: ['#newsletter_day', '#newsletter_month', '#newsletter_year']
                    }
                }
            });

            $(form).on('click touch', '.form-submit', function(e) {
                e.preventDefault();
                $(form).validate();
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

