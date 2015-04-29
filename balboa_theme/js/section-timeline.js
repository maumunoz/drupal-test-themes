/*global jQuery2 */
(function ($, jq) {
    'use strict';

    var node = '.view-timeline',
        sidebarB = '.node-type-l-nea-de-tiempo #sidebar-b',
        elements ='.view-content > .views-row',
        contentPane = $('<div class="timeline-content-pane"></div>'),
        track = $('<input class="timeline-slide-track" type="range" />'),
        years = [],
        offset = 100;

    // alert("test");
    console.log(jq.ui);
    console.log($.ui);

    // Transform Sidebar block
    $.transform(sidebarB, {
        target: "#content-inner .box",
        type: 'append',
        globalTarget: true
    });

    // Transform Timeline View
    $.transform(node, {
        process: function ($, node) {
            var year;
            elements = node.find(elements);
            if (elements && elements.length) {
                elements.each(function(index, el) {
                    if ($(this).find('.timeline-year')) {
                        year = parseInt($.trim($(this).find('.timeline-year').text()), 10);
                        years.push(year);
                        $(this).find('.views-field-field-imagen').addClass('timeline-year-'+year);
                        $(this).find('.timeline-content').addClass('timeline-year-'+year);
                    }
                });
            }
            console.log(years);
            node.append(track);
            node.append(contentPane);
            offset = offset/years.length;
        }
    });

    $(document).ready(function($) {
        console.log($('.timeline-slide-track').slider({
            range: true,
            min: 1
        }));
        $('.timeline-slide-track').on("change", function( event, ui ) {
            console.log('has changed');
        } );

        $('.timeline-slide-track').on("slide", function( event, ui ) {
            console.log('slide');
        } );
    });

}(jQuery2, jQuery));

