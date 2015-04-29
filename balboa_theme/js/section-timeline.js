/*global jQuery2 */
(function ($) {
    'use strict';

    var node = '.view-timeline',
        sidebarB = '.node-type-l-nea-de-tiempo #sidebar-b',
        elements ='.view-content > .views-row',
        contentPane = $('<div class="timeline-content-pane"></div>'),
        altNav = $('<div class="nav-container"><span class="bg-line"></span><ul class="timeline-alt-nav"></ul><span class="bg-line"></span></div>'),
        selectedYear = $('<ul class="timeline-selected-year"></ul>'),
        track = $('<input class="timeline-slide-track" type="range" data-rangeslider min=0 max=100 />'),
        years = [];

    // Transform Timeline View
    $.transform(node, {
        process: function ($, node) {
            var year;
            elements = node.find(elements);

            // Append container element to display elements content
            node.append(contentPane);

            // Check if elements are present
            if (elements && elements.length) {

                // Run through all year elements to populate years array
                elements.each(function(index, el) {
                    if ($(this).find('.timeline-year')) {
                        year = parseInt($.trim($(this).find('.timeline-year').text()), 10);
                        years.push(year);
                        // Add prefixed css classes to content elements based on the year
                        $(this).find('.views-field-field-imagen').addClass('timeline-year-'+year);
                        $(this).find('.timeline-content').addClass('year-content timeline-year-'+year).prepend($(this).find('.timeline-year').removeClass('hidden'));
                        $(this).find('.timeline-content').clone().appendTo(contentPane);
                    }
                });

                // Rangeslider initialization
                track.attr({min: 0, max: years.length-1, value: years.length-1, step: 0.1});
                node.find('.view-content').append(track);
                $('[data-rangeslider]').rangeslider({
                    polyfill: false,
                    onSlide: function(position, value) {
                        updateSelected(years[Math.floor(value)]);
                    }
                });

                // Alternative Timeline navigation
                node.find('.view-content').prepend(altNav);
                node.find('.view-content').append(selectedYear);
                $.each(years, function(i, val) {
                    altNav.find('ul').append('<li class="timeline-year-'+val+'"><a href="#year-'+val+'">'+val+'</a></li>');
                    selectedYear.append('<li class="timeline-year-'+val+'">'+val+'</li>');
                });

                altNav.on('click touch', 'a', function(e) {
                    // Update rangeslider
                    updateSelected ($(this).text());
                    $('[data-rangeslider]').val($.inArray(parseInt($(this).text(), 10), years)).change();
                    $('[data-rangeslider]').rangeslider('update', true);
                    e.preventDefault();
                });
            }
        }
    });

    function updateSelected (year) {
        // Update visible content
        contentPane.find('.year-content').addClass('hidden');
        contentPane.find('.timeline-year-'+year).removeClass('hidden');

        // Update alternative nav
        altNav.find('li').removeClass('selected');
        altNav.find('.timeline-year-'+year).addClass('selected');

        // Update selected year
        selectedYear.find('li').removeClass('selected');
        selectedYear.find('.timeline-year-'+year).addClass('selected');
    }

}(jQuery2));

