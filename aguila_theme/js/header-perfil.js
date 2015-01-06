(function ($) {
    var node = "#user-register-form";

    $.initModule(node, function ($, el) {
        el.find("div:first").prepend("<div class='header-form'></div>");
        $("<p>Bienvenido a la tierra de la alegr&iacute;a</p>").appendTo(".header-form");
        el.find("#edit-field-thumbnail").appendTo(".header-form");
    });

    $.initModule("#edit-profile-user-profile-form", function ($, el) {
        el.find("div:first").prepend("<div class='header-form'></div>");
        $("<p>¡Hola " + $("#edit-field-first-name-und-0-value").val() + "!</p><p>Bienvenido a la tierra de la alegr&iacute;a</p>").appendTo(".header-form");
        el.find("#edit-field-thumbnail").appendTo(".header-form");
        
        $("#edit-actions--2").append($("[href='/user/logout']"));
    });    

}(jQuery2));