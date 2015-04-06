/*global jQuery2, jQuery, document */
(function ($, jq) {

    var map;
    var markers = [];
    var centerLatlng;
    var node = '.lista-lugares-fiesta',
        columns = 3;

    function transformar() {
        var list,
            listIndex = 0,
            orderedElements,
            unorderedElements;

        // Add wrapper loading class
        $(node).addClass('loading');

        list = $(node).find('.fiesta-lugares-list');
        orderedElements = $(list).find('.views-column .views-row');
        unorderedElements = $(list).find('> .views-row');

        //Set format to publish date.
        formatDate($, node+' .date-display-single', 'D MMMM YYYY');
        $(node).find('.date-display-single').removeClass('date-display-single');

        // Attaching social share events
        $('.widget-bar').on('click touch', '.social-share a', function(e) {
            socialShare($(this).attr('class'),$(this).attr('href'));
            e.preventDefault();
        });

        // Add columns if don't exist
        if ($(list).find('.views-column').length === 0) {
            for (var i = columns; i >= 1; i--) {
                $(list).prepend('<li class="views-row-0"><ul class="views-column views-column-'+i+'"></ul></li>')
            };
        }

        // Set the initial index to add items if Load More is clicked
        if ($(orderedElements).length) {
            listIndex = orderedElements.length%columns;
        }

        // Add the items
        if ($(unorderedElements).length) {
            unorderedElements.each(function(index, el) {
                listIndex++;
                $(list).find('.views-column-'+listIndex).append($(this));
                if (listIndex >= columns) {
                    listIndex = 0;
                }
            });
        }

        // Remove wrapper loading class
        $(node).removeClass('loading');
    }

    function validGeolocation(value) {
        return value !== undefined && value !== null && value !== '';
    }
    function centerMap() {
        var latlngbounds = new google.maps.LatLngBounds();
        $(markers).each(function(i,data) {
           latlngbounds.extend(data.marker.getPosition());
        });
        centerLatlng = latlngbounds.getCenter();
        map.setCenter(centerLatlng);
        map.fitBounds(latlngbounds);
    }

    function updateMapMarkers() {


        mapOptions = {
            zoom: 6,
            styles: $.mapStyles.grayscale,
            center: new google.maps.LatLng(4.6194477,-74.110567),
            scrollwheel: false,
        },
        map = new google.maps.Map($('.mapa-lugar-detalle')[0], mapOptions);
        $('.mapa-lugar-detalle').removeClass("hidden");

        var linksWithCoords = $('.lista-lugares-fiesta').find('.view-map');
        linksWithCoords.each(function(i, node) {
            node = $(node);
            if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
                var position = new google.maps.LatLng(parseFloat(node.data('latitude')),parseFloat(node.data('longitude')));
                var marker = new google.maps.Marker({
                    position: position,
                    title: node.data('placename')
                });
                infowindow = new google.maps.InfoWindow({
                    content: '<div class="lugar-info-window map-info-window"><h1>' + node.data('placename') + '</h1></div>'
                });
                node.data("marker",marker);
                node.data("position",position);
                node.data("infowindow",infowindow);
                markers.push({marker:marker, infowindow: infowindow});
                node.bind("click", function(event ) {
                    event.preventDefault();
                    jQuery("body").scrollTo('.mapa-lugar-detalle',800);
                    $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                    var position = $(this).data("position");
                    var marker = $(this).data("marker");
                    map.panTo(position);
                    map.setZoom(16);
                    $(this).data("infowindow").open(map, marker);
                });

                marker.setMap(map);
                google.maps.event.addListener(marker, 'click', function () {
                    $(markers).each(function(j,alldata) {
                        if(alldata.marker == marker) {
                            alldata.infowindow.open(map, marker);
                        }else{
                            alldata.infowindow.close();
                        }
                    });
                });

            }else{
                node.addClass("hidden");
            }
        });
        if (markers.length>0) {
            $('.view-map-all').bind("click",function(){
                event.preventDefault();
                map.setZoom(6);
                $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                map.panTo(centerLatlng);
                jQuery("body").scrollTo('.mapa-lugar-detalle',800);

            });
            google.maps.event.addListener(map, 'click', function () {
                map.setOptions({
                    scrollwheel: true,
                });
            });
            google.maps.event.addDomListener(window, "resize", function() {
                centerMap();
            });
            centerMap();
        }
    }

    function socialShare(social, path) {
        switch(social) {
            case 'facebook':
            window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(path),
                '', 'status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
            case 'twitter':
            window.open( 'http://twitter.com/share?url='+encodeURIComponent(path),
                '','status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
        }
    }

    $.initModule(node, function (el) {
        transformar();
        jq(document).ajaxComplete(function () {
            setTimeout(transformar, 50)
        });
        $.mapsLoaded.promise().then(function () {
            updateMapMarkers();
        });
    });


}(jQuery2, jQuery));