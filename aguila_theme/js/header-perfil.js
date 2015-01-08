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
        
        $("#edit-actions--2").append($("<a href='/user/logout'>Cerrar Sesi&oacute;n</a>"));
    });

    $.initModule(".profile", function ($, el) {
        el.prepend("<div class='header-form'></div>");
        $(".header-form").after("<h2>Datos ingresados</h2>");
         $("<p>¡Hola " + $(".field-name-field-first-name").find(".field-item").text() + "!</p><p>Bienvenido a la tierra de la alegr&iacute;a</p>").appendTo(".header-form");
        el.find(".field-name-field-thumbnail").appendTo(".header-form");

        el.append($("#edit-actions--2"));
        el.find("[type='submit']").hide();
        $("#edit-actions--2").append($(".tabs.primary").find("[href$='edit-profile']"));
        $("[href$='edit-profile']").text("Editar perfil");
        $("#edit-actions--2").append($(".tabs.primary").find("[href$='edit']"));
        $("[href$='edit']").text("Editar cuenta");
        $("#edit-actions--2").append($("<a href='/user/logout'>Cerrar Sesi&oacute;n</a>"));
    });        

}(jQuery2));