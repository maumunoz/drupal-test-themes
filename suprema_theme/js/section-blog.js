(function ($) {

    //Initialize Page content
    $.initModule(".view-id-navigator", function ($, sommform) {
        var linkArray = $(".view-id-navigator .views-row a");
        linkArray.each(function(i,e) {
            if( document.location.toString().indexOf( $(e).attr("href") )  > -1 ) {
                if(i>0) {
                    $(".next-post").attr("href", $( linkArray[i-1] ).attr("href") );
                }else{
                    $(".next-post").hide();
                }

                if(i<linkArray.length-1) {
                    $(".last-post").attr("href", $( linkArray[i+1] ).attr("href") );
                }else{
                    $(".last-post").hide();
                }

            }
        });
        
        
    });

})(jQuery2);