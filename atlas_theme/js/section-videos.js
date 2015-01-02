/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.vista-lista-videos', {
        process: function ($, node) {
            var videoArea = node.find('.video-area'),
                videoWrapper = $('<div class="wrapper"></div>'),
                videoIframe = $('<iframe class="hidden" />'),
                videoTitle = $('<div class="title"></div>'),
                playBtn = $('<a href="#" class="play-btn"></a>'),
                videoList = node.find('.item-list li a'),
                currentVideo;

            function setVideoArea() {
                //clean video area
                videoArea.empty();
                videoWrapper.empty();

                //add large image
                currentVideo.find('.large img').clone().appendTo(videoWrapper).addClass('large-thumb');

                //Add play button
                playBtn.appendTo(videoWrapper);

                //Add wrapper to video area
                videoWrapper.appendTo(videoArea);

                //set video title and add
                videoTitle.text(currentVideo.data('title')).appendTo(videoArea);
            }

            function init() {
                currentVideo = videoList.first();
                setVideoArea();
            }

            //events
            videoList.on('click', function (e) {
                e.preventDefault();
                var el = $(e.currentTarget);
                currentVideo = el;
                setVideoArea();
            });

            videoArea.on('click', '.play-btn', function (e) {
                e.preventDefault();
                videoIframe.attr('src', currentVideo.attr('href'));
                videoIframe.insertAfter(videoArea.find('.large-thumb'));

                videoIframe.removeClass('hidden');
                videoArea.find('.large-thumb').remove();
                videoArea.find('.play-btn').remove();
            });

            init();
        }
    });
}(jQuery2));