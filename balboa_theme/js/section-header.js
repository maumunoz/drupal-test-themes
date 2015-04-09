/*global jQuery2 */
(function ($) {
    'use strict';
    var searchNode = '#block-search-form',
        closeSearchBtn,
        openSearchBtn,
        searchField,
        slidebar;

    // Transform Search Block
    $.transform(searchNode, {
        target: '.social-bar .search',
        type: 'append',
        globalTarget: true
    });

    // Initialize Social Bar
    $.initModule('#header-region .social-bar', function ($, social) {
        // Transform Search Element and effects
        searchField = $('#edit-search-block-form--2');
        openSearchBtn = social.find('.search > a').eq(0);
        closeSearchBtn = $('<a id="closeSearchBtn" class="form-submit glyphicon glyphicon-remove"></a>');

        $(openSearchBtn).on('mouseenter', function() {
            $(searchNode).css('display','block');
        });
        closeSearchBtn.on('click', function(e) {
            searchField.val('');
            $(searchNode).css('display','none');
            e.preventDefault();
        });
        searchField.before(closeSearchBtn);

        // Duplicate search and social bar and place them in mobile menu
        setTimeout(function ($) {
            slidebar = $('.sb-slidebar');

            slidebar.append( $(social).clone() );
            slidebar.find('#edit-search-block-form--2').attr('autocomplete','off');
            slidebar.find('#closeSearchBtn').remove();

            slidebar.on('touchend click', 'input[type="submit"]', function () {
                slidebar.find('form').eq(0).submit();
            });

            $('.sb-slidebar').on( 'touchend click', 'input[type="text"]', function (e) {
                e.stopPropagation();
            });
        }, 500, jQuery2);
    });
}(jQuery2));

