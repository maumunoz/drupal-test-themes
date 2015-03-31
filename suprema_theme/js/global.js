(function ($) {
    
    //Initialize Page content
    $.initModule(".region-content", function ($, pageContent) {
        //Add css class to page based on URL
        var contentAttr = pageContent.find("*[typeof*='foaf:Document']"),
            titleAttr = pageContent.find("*[property*='dc:title']"),
            classList;
        if(contentAttr.length) {
            contentAttr = contentAttr.attr('about');
            if(typeof contentAttr !== typeof undefined && contentAttr !== false) {
                classList = contentAttr.split( '/' );
                $.each(classList, function(i, val) {
                    $('body').addClass(val);
                });
            }
        }
        if(titleAttr.length) {
            titleAttr = "title-"+titleAttr.attr('content').replace(" ","-");
            $('body').addClass(titleAttr);
        }
    });

    $.initModule("#search-block-form", function ($, searchblock) {
        $(searchblock).after( $(".btn-menu-mobile") );
        $(searchblock).before( $(".social-header-left").parent().children() );
        $(".social-header-left").find('br').remove();
    });
    
    $.initModule("#block-system-main-menu", function ($, mainmenu) {
        var itemArray = $("#block-system-main-menu .menu > li"),
            sum1 = 0,
            sum2 = 0;
        
        itemArray.each(function(i,e) {
            if (i<itemArray.length/2) {
                sum1+= $(e).width();
            }else{
                sum2+= $(e).width();
            }
        });
        diff = sum1-sum2;
        if (diff>0) {
            $(mainmenu).find(".content").css("margin-right",diff);
        }else{
            $(mainmenu).find(".content").css("margin-left",diff);
        }
        
        var total = itemArray.length;
        if(total%2==0) {
            $( itemArray[ total/2-1 ] ).css("margin-right",100);
            $( itemArray[ total/2 ] ).css("margin-left",100);
        }else{
            //todo
            $( itemArray[ Math.floor( total/2 ) ] ).css("margin-right",100);
            $( itemArray[ Math.ceil( total/2 ) ] ).css("margin-left",100);
        }
    });
    
    jQuery(window).scroll(function() {
        var _scrollTop = jQuery(window).scrollTop();
        if(_scrollTop<20) {
            jQuery("#site-name").removeClass("hideMe");
        }else{
            jQuery("#site-name").addClass("hideMe");
        }
    });
    
    var slideBarInterval = setInterval(function($) {
        if ( jQuery2.slidebars.init() && !$(".mobile-main-menu").hasClass("modified") ) {
            clearInterval( slideBarInterval );
            $(".mobile-main-menu ul").append( $("#copyright .menu li").clone() );
            $(".mobile-main-menu ul").append( $("#footer .menu li").clone() );
            $(".mobile-main-menu ul").append( $("<li></li>").append($(".social-header-right-mobile")) );
            $(".mobile-main-menu").addClass("modified");
        }else{
        }
        
    },300,$);    
    

    
    


})(jQuery2);