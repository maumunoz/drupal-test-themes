(function ($) {

    //Initialize Page content
    $.initModule(".sommelier .webform-client-form", function ($, sommform) {
        sommform = $(sommform);
        sommform.find(".form-item").addClass("input-group").each(function(i,group){
            $(group).find("label").addClass("input-group-addon");
            var span = $("<span class='glyphicon'></span>");
            span.addClass( $(group).find(".description").text() );
            $(group).find(".form-text").addClass("form-control").removeClass("form-text").attr("placeholder", $(group).find("label").text() );
            $(group).find("label").html( span );
            $(group).find(".description").remove();
        });
        sommform.find("textarea").addClass("form-control");
        
    });

})(jQuery2);