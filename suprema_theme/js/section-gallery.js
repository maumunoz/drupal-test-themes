(function ($) {
    
    function centerButtons() {
        $=jQuery2;
        $(".pager-previous").css("top", ($(".field-name-media-gallery-media").height() - $(".pager-previous").height())/2 );
        $(".pager-next").css("top", ($(".field-name-media-gallery-media").height() - $(".pager-next").height())/2 );
    }

    //Initialize Page content
    $.initModule(".view-menu-galerias", function ($, closebutton) {
        $(window).on('resize', centerButtons);
        centerButtons();
        setTimeout(function () {
            $(window).resize();
        }, 1000);
    });


})(jQuery2);