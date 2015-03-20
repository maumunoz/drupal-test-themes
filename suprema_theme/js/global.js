(function ($) {

    //Initialize Page content
    $.initModule("#search-block-form", function ($, searchblock) {
        $(searchblock).insertAfter( $(".social-header-left").parent().children() );
        $(".social-header-left").find('br').remove();
    });


})(jQuery2);