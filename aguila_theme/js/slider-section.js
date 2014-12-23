/*global jQuery2 */
(function ($) {
    $(document).ready(function(){
        var slider = $('.view-banner-principal .view-content'),
            sliderNode = $('.view-banner-principal'),
            borderClass,
            imagePath,
            win,
            scrollBtn,
            scrollBtnVisible = true;

        //Set slider images as css background images
        slider.find(".views-row").each(function(index, el) {
            borderClass = $.trim($(this).find('.slider-border').text());
            imagePath = $.trim($(this).find('.slider-background img').attr('src'));
            $(this).css({'background-image': 'url('+imagePath+')'});
            $(this).addClass(borderClass);
        });
        //Initialize Slick slider
        slider.slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            onSetPosition: function (slickSlider) {
                var slideContent = slider.find('.slide-content');

                if (slideContent.length) {
                    //Set size for slide-content.
                    slider.find('.slide-content').width(slickSlider.$slider.width());
                }
            }
        });
        //Add down arrow below the banner
        if(sliderNode.length) {
            scrollBtn = $('<div class="btn to-scroll btn-md btn-sky-blue btn-radius-none btn-text-no btn-symbol btn-symbol-down hidden"></div>');
            sliderNode.append(scrollBtn);
            win = $(window);
            win.on('scroll', function () {
                var position = win.scrollTop();
                if (position <= 150 && !scrollBtnVisible) {
                    scrollBtn.animate({ opacity: 1 });
                    scrollBtnVisible = true;
                } else if (position > 150 && scrollBtnVisible) {
                    scrollBtn.animate({ opacity: 0 });
                    scrollBtnVisible = false;
                }
            });
        }
    });
}(jQuery2));

