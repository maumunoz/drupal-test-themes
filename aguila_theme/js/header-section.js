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
}(jQuery2));

