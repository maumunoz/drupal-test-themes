/*global jQuery2 */
(function ($) {
    'use strict';
    $.transform('.vista-lista-videos', {
        process: function ($, node) {
            var videoArea = node.find('.video-area'),
                videoIframe = $('<iframe />'),
                videoTitle = $('<div class="title"></div>'),
                playBtn = $('<a href="#" class="play-btn"></div>'),
                videoList = node.find('.item-list li a'),
                currentVideo;

            node.on('click', node.find('.play-btn'), function (e) {
                //var el = e.currentTarget;
                e.preventDefault();
                //videoIframe.attr('src', currentVideo.attr('href'));
                //videoIframe.appendTo(videoArea);
                //videoIframe.insertAfter(videoArea.find('.large-thumb'));
            });

            node.on('click', videoList, function (e) {
                e.preventDefault();
                var el = e.currentTarget;
                currentVideo = el;
                setVideoArea();
            });

            function setVideoArea() {
                //clean video area
                videoArea.html('');

                //set iframe values
                //videoIframe.attr('src', currentVideo.attr('href'));
                //videoIframe.appendTo(videoArea);

                //add large image
                currentVideo.find('.large img').clone().appendTo(videoArea).addClass('large-thumb');

                //Add play button
                playBtn.appendTo(videoArea);

                //set video title and add
                videoTitle.text(currentVideo.data('title')).appendTo(videoArea);
            }

            function init() {
                currentVideo = videoList.first()
                setVideoArea();
            }

            init();
        }
    });
}(jQuery2));