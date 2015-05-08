/*global jQuery2 */
(function ($) {
    'use strict';
    var node = '#age_checker_verification_popup',
        dateTxt = {
            day: 'día(00)',
            month: 'mes(00)',
            year: 'año(0000)'
        };
    
    function clearFormStyles(time) {
        if(!time) time=300;
        setTimeout( function() {
            jQuery("#age-checker-getform").attr("style",""); 
        }, time);
    }
    
    $(window).on('resize', clearFormStyles);

    $.initModule(node, function ($, ageGate) {
        // Reset default values
        $(ageGate).find('.form-item-day input').removeAttr('onblur').removeAttr('onfocus').val(dateTxt.day).attr("pattern","[0-9]{1,2}").attr("max","99").attr("maxlength","2").bind("keyup change input",function() {
            this.value=this.value.replace(/[\D]+/g,'');
        });
        $(ageGate).find('.form-item-month input').removeAttr('onblur').removeAttr('onfocus').val(dateTxt.month).attr("pattern","[0-9]{1,2}").attr("max","99").attr("maxlength","2").bind("keyup change input",function() {
            this.value=this.value.replace(/[\D]+/g,'');
        });
        $(ageGate).find('.form-item-year input').removeAttr('onblur').removeAttr('onfocus').val(dateTxt.year).attr("pattern","[0-9]{4}").attr("max","2999").attr("maxlength","4").bind("keyup change input",function() {
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
        
        clearFormStyles(1000);
        clearFormStyles(2000);
        clearFormStyles(3000);
    });

    function setTextFieldVal (el, value) {
        el.val(value);
    }

}(jQuery2));

