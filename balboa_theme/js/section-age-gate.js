/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '#age_checker_verification_popup',
        dateTxt = {
            day: 'día(00)',
            month: 'mes(00)',
            year: 'año(0000)'
        };

    $.initModule(node, function ($, ageGate) {
        // Reset default values
        $(ageGate).find('.form-item-day input').removeAttr('onblur').removeAttr('onfocus').val(dateTxt.day).bind("keyup change blur input",function() {
            this.value=this.value.replace(/[\D]+/g,'');
        });
        $(ageGate).find('.form-item-month input').removeAttr('onblur').removeAttr('onfocus').val(dateTxt.month).bind("keyup change blur input",function() {
            this.value=this.value.replace(/[\D]+/g,'');
        });
        $(ageGate).find('.form-item-year input').removeAttr('onblur').removeAttr('onfocus').val(dateTxt.year).bind("keyup change blur input",function() {
            this.value=this.value.replace(/[\D]+/g,'');
        });

        // Day field events
        $(ageGate).on('focusin', '.form-item-day input', function(e) {
            if ($(this).val() === dateTxt.day) setTextFieldVal($(this), '');
            e.preventDefault();
        });
        $(ageGate).on('focusout', '.form-item-day input', function(e) {
            if ($(this).val() === '') setTextFieldVal($(this), dateTxt.day);
            e.preventDefault();
        });

        // Month field events
        $(ageGate).on('focusin', '.form-item-month input', function(e) {
            if ($(this).val() === dateTxt.month) setTextFieldVal($(this), '');
            e.preventDefault();
        });
        $(ageGate).on('focusout', '.form-item-month input', function(e) {
            if ($(this).val() === '') setTextFieldVal($(this), dateTxt.month);
            e.preventDefault();
        });

        // Year field events
        $(ageGate).on('focusin', '.form-item-year input', function(e) {
            if ($(this).val() === dateTxt.year) setTextFieldVal($(this), '');
            e.preventDefault();
        });
        $(ageGate).on('focusout', '.form-item-year input', function(e) {
            if ($(this).val() === '') setTextFieldVal($(this), dateTxt.year);
            e.preventDefault();
        });
    });

    function setTextFieldVal (el, value) {
        el.val(value);
    }

}(jQuery2));

