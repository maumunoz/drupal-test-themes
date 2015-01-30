/*global jQuery2 */
(function ($) {
    // Transform login Block;
    $.transform("#block-system-user-menu", {
        target: ".btn-login-search .btn-icon-login",
        type: 'append',
        globalTarget: true
    });

    // Transform Search Block
    $.transform("#block-search-form", {
        target: ".btn-login-search .btn-icon-search",
        type: 'append',
        globalTarget: true
    });
    
    $.initModule(".btn-login-search .btn-icon-search", function ($, searchBtn) {
        btn = $("<input type='button' value='' class='form-submit' />");
        btn.click(function() {
            $("#block-search-form").hide();
        });
        $("#edit-search-block-form--2").before(btn);
        searchBtn.hover(function() {
            $("#block-search-form").show();
        });
    });
}(jQuery2));

