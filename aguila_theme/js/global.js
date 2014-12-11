/*global jQuery2, moment, Drupal */

/*
 Setup moment.js
 locale : spanish (es)
*/
moment.locale('es', {
    months : 'Enero_Febrero_Marzo_abril_Mayo_Junio_Julio_Agosto_Septiembre_Ectubre_Noviembre_Diciembre'.split('_'),
    monthsShort : 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'LT:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY LT',
        LLLL : 'dddd, D [de] MMMM [de] YYYY LT'
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    },
    ordinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//Set spanish locale
moment.locale('es');

// Google Maps Promise
(function ($) {
    var btnCategories = $("span.btn.categoria");

    Drupal.sidebarBreakpoint = 768;
    Drupal.sidebarTarget = $('#block-views-banner-cervezas-block');
    Drupal.sidebarTargetPosition = 'before';

    $.mapsLoaded = $.Deferred();
    window.initMaps = function () {
        $.mapsLoaded.resolve();
    };

    //Set the background color for each categoria element.
    if (btnCategories.length) {
        btnCategories.each(function () {
            var nodeCategoria = $(this),
                cssClass;

            switch ($.trim(nodeCategoria.text()).toUpperCase()) {
            case "LAS CHICAS AGUILA":
                cssClass = 'btn-pink';
                break;
            case "LA RUTA":
                cssClass = ($(this).hasClass('amarillo') ? 'btn-yellow' : 'btn-gold');
                break;
            case "AGUILA EN VIVO":
                cssClass = 'btn-medium-blue';
                break;
            case "FUTBOL":
                cssClass = 'btn-red';
                break;
            default:
                cssClass = 'btn-gold';
            }

            nodeCategoria.addClass(cssClass);
        });
    }
}(jQuery2));

function formatDate($, selector, formatResult) {
    $(selector).each(function () {
        var nodeDate = $(this),
            publishDate = moment($.trim(nodeDate.text()), "YYYY-MM-DD").format(formatResult);

        //Set date in days.
        nodeDate.text(publishDate);
    });
}