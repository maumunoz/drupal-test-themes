(function ($) {

    //Initialize Page content
    $.initModule("#search-block-form", function ($, searchblock) {
        $(searchblock).before( $(".btn-menu-mobile") );
        $(searchblock).before( $(".social-header-left").parent().children() );
        $(".social-header-left").find('br').remove();
    });


})(jQuery2);