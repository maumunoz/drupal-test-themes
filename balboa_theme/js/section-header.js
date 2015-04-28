/*global jQuery2 */
(function ($) {
    'use strict';
    var searchNode = '#block-search-form',
        closeSearchBtn,
        openSearchBtn,
        searchField,
        mobileMenu;

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

        $(openSearchBtn).on('click', function() {
            $(searchNode).css('display','block');
        });
        closeSearchBtn.on('click', function(e) {
            searchField.val('');
            $(searchNode).css('display','none');
            e.preventDefault();
        });
        searchField.before(closeSearchBtn);
    });

    // Duplicate search and social bar and place them in mobile menu
    $(document).ready(function () {
        mobileMenu = $('.sb-slidebar');

        mobileMenu.append( $('#header-region .social-bar').clone() );
        mobileMenu.find('#edit-search-block-form--2').attr('autocomplete','off');
        mobileMenu.find('#closeSearchBtn').remove();

        mobileMenu.on('touchend click', 'input[type="submit"]', function () {
            mobileMenu.find('form').eq(0).submit();
        });

        mobileMenu.on( 'touchend click', 'input[type="text"]', function (e) {
            e.stopPropagation();
        });
    });

}(jQuery2));

