/*global jQuery2 */
(function ($) {
    $(document).ready(function(){
        //Initialize Slick slider
        $('.view-banner-principal .view-content').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    });
}(jQuery2));

