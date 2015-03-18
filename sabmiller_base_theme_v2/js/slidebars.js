// -----------------------------------
// Slidebars
// Development version, do not use this in your site, use the latest in the distribution folder.
// http://plugins.adchsm.me/slidebars/
//
// Written by Adam Smith
// http://www.adchsm.me/
//
// Released under MIT License
// http://plugins.adchsm.me/slidebars/license.txt
//
// ---------------------
// Index of Slidebars.js
//
// 001 - Default Settings
// 002 - Feature Detection
// 003 - User Agents
// 004 - Setup
// 005 - Animation
// 006 - Operations
// 007 - API
// 008 - User Input

;( function( $ ) {

    $.slidebars = function( options ) {

        // ----------------------
        // 001 - Default Settings

        var settings = $.extend( {
            siteClose: true, // true or false - Enable closing of Slidebars by clicking on #sb-site.
            scrollLock: false, // true or false - Prevent scrolling of site when a Slidebar is open.
            disableOver: false, // integer or false - Hide Slidebars over a specific width.
            hideControlClasses: false, // true or false - Hide controls at same width as disableOver.
            webApp: false // true, false or 'detect' - Enable web app feature, or detect for use with iOS fullscreen view.
        }, options );

        // -----------------------
        // 002 - Feature Detection

        var test = document.createElement( 'div' ).style, // Create element to test on.
        supportTransition = false, // Variable for testing transitions.
        supportTransform = false; // variable for testing transforms.

        // Test for CSS Transitions
        if ( test.MozTransition === '' || test.WebkitTransition === '' || test.OTransition === '' || test.transition === '' ) supportTransition = true;

        // Test for CSS Transforms
        if ( test.MozTransform === '' || test.WebkitTransform === '' || test.OTransform === '' || test.transform === '' ) supportTransform = true;

        // -----------------
        // 003 - User Agents

        var ua = navigator.userAgent, // Get user agent string.
        android = false, // Variable for storing android version.
        iOS = false; // Variable for storing iOS version.

        if ( /Android/.test( ua ) ) { // Detect Android in user agent string.
            android = ua.substr( ua.indexOf( 'Android' )+8, 3 ); // Set version of Android.
        } else if ( /(iPhone|iPod|iPad)/.test( ua ) ) { // Detect iOS in user agent string.
            iOS = ua.substr( ua.indexOf( 'OS ' )+3, 3 ).replace( '_', '.' ); // Set version of iOS.
        }

        if ( android && android < 3 || iOS && iOS < 5 ) $( 'html' ).addClass( 'sb-static' ); // Add helper class for older versions of Android & iOS.

        // -----------
        // 004 - Setup

        // Site container
        var $site = $( '#page' ); // Cache the selector.

        // Left Slidebar
        if ( $( '.sb-left' ).length ) { // Check if the left Slidebar exists.
            var $left = $( '.sb-left' ), // Cache the selector.
            leftActive = false; // Used to check whether the left Slidebar is open or closed.
        }

        // Right Slidebar
        if ( $( '.sb-right' ).length ) { // Check if the right Slidebar exists.
            var $right = $( '.sb-right' ), // Cache the selector.
            rightActive = false; // Used to check whether the right Slidebar is open or closed.
        }

        var init = false, // Initialisation variable.
        windowWidth = $( window ).width(), // Get width of window.
        $controls = $( '.sb-toggle-left, .sb-toggle-right, .sb-open-left, .sb-open-right, .sb-close' ), // Cache the control classes.
        $slide = $( '.sb-slide' ); // Cache users elements to animate.

        // Initailise Slidebars
        function initialise() {
            if ( !settings.disableOver || ( typeof settings.disableOver === 'number' && settings.disableOver >= windowWidth ) ) { // False or larger than window size.
                init = true; // true enabled Slidebars to open.
                $( 'html' ).addClass( 'sb-init' ); // Add helper class.
                if ( settings.hideControlClasses ) $controls.removeClass( 'sb-hide' ); // Remove class just incase Slidebars was originally disabled.
                css(); // Set required inline styles.
                if ( settings.webApp === true || ( settings.webApp === 'detect' && iOS && window.navigator.standalone ) ) $( 'html' ).addClass( 'sb-web-app' ); // Web app settings.
            } else if ( typeof settings.disableOver === 'number' && settings.disableOver < windowWidth ) { // Less than window size.
                init = false; // false stop Slidebars from opening.
                $( 'html' ).removeClass( 'sb-init' ); // Remove helper class.
                if ( settings.hideControlClasses ) $controls.addClass( 'sb-hide' ); // Hide controls
                $site.css( 'minHeight', '' ); // Remove minimum height.
                if ( leftActive || rightActive ) close(); // Close Slidebars if open.
            }
        }
        initialise();

        // Inline CSS
        function css() {
            // Site container height.
            $site.css( 'minHeight', '' );
            if ( $site.height() < $( 'html' ).height()  ) $site.css( 'minHeight', $( 'html' ).css( 'height' ) ); // Test height for vh support.

            // Custom Slidebar widths.
            if ( $left && $left.hasClass( 'sb-width-custom' ) ) $left.css( 'width', $left.attr( 'data-sb-width' ) ); // Set user custom width.
            if ( $right && $right.hasClass( 'sb-width-custom' ) ) $right.css( 'width', $right.attr( 'data-sb-width' ) ); // Set user custom width.

            // Set off-canvas margins for Slidebars with push and overlay animations.
            if ( $left && ( $left.hasClass( 'sb-style-push' ) || $left.hasClass( 'sb-style-overlay' ) ) ) $left.css( 'marginLeft', '-' + $left.css( 'width' ) );
            if ( $right && ( $right.hasClass( 'sb-style-push' ) || $right.hasClass( 'sb-style-overlay' ) ) ) $right.css( 'marginRight', '-' + $right.css( 'width' ) );

            // Site scroll locking.
            if ( settings.scrollLock ) $( 'html' ).addClass( 'sb-scroll-lock' );
        }

        // Resize Functions
        $( window ).resize(function() {
            var resizedWindowWidth = $( window ).width(); // Get resized window width.
            if ( windowWidth !== resizedWindowWidth ) { // Slidebars is running and window was actually resized.
                windowWidth = resizedWindowWidth; // Set the new window width.
                initialise(); // Call initalise to see if Slidebars should still be running.
                if ( leftActive ) open( 'left' ); // If left Slidebar is open, calling open will ensure it is the correct size.
                if ( rightActive ) open( 'right' ); // If right Slidebar is open, calling open will ensure it is the correct size.
            }
        });
        // I may include a height check along side a width check here in future.

        // ---------------
        // 005 - Animation

        var animation; // Animation type.

        // Set animation type.
        if ( supportTransition && supportTransform ) { // Browser supports css transitions and transforms.
            animation = 'translate'; // Translate for browsers that support it.
            if ( android && android < 4.4 ) animation = 'side'; // Android supports both, but can't translate any fixed positions, so use left instead.
        } else {
            animation = 'jQuery'; // Browsers that don't support css transitions and transitions.
        }

        // Animate mixin.
        function animate( object, amount, side ) {
            // Choose selectors depending on animation style.
            var selector;

            if ( object.hasClass( 'sb-style-push' ) ) {
                selector = $site.add( object ).add( $slide ); // Push - Animate site, Slidebar and user elements.
            } else if ( object.hasClass( 'sb-style-overlay' ) ) {
                selector = object; // Overlay - Animate Slidebar only.
            } else {
                selector = $site.add( $slide ); // Reveal - Animate site and user elements.
            }

            // Apply animation
            if ( animation === 'translate' ) {
                selector.css( 'transform', 'translate( ' + amount + ' )' ); // Apply the animation.

            } else if ( animation === 'side' ) {
                if ( amount[0] === '-' ) amount = amount.substr( 1 ); // Remove the '-' from the passed amount for side animations.
                if ( amount !== '0px' ) selector.css( side, '0px' ); // Add a 0 value so css transition works.
                setTimeout( function() { // Set a timeout to allow the 0 value to be applied above.
                    selector.css( side, amount ); // Apply the animation.
                }, 1 );

            } else if ( animation === 'jQuery' ) {
                if ( amount[0] === '-' ) amount = amount.substr( 1 ); // Remove the '-' from the passed amount for jQuery animations.
                var properties = {};
                properties[side] = amount;
                selector.stop().animate( properties, 400 ); // Stop any current jQuery animation before starting another.
            }

            // If closed, remove the inline styling on completion of the animation.
            setTimeout( function() {
                if ( amount === '0px' ) selector.css( {
                    'transform': '',
                    'left': '',
                    'right': ''
                } );
            }, 400 );
        }

        // ----------------
        // 006 - Operations

        // Open a Slidebar
        function open( side, callback ) {
            // Check to see if opposite Slidebar is open.
            if ( side === 'left' && $left && rightActive || side === 'right' && $right && leftActive ) { // It's open, close it, then continue.
                close();
                setTimeout( proceed, 400 );
            } else { // Its not open, continue.
                proceed();
            }

            // Open
            function proceed() {
                if ( init && side === 'left' && $left ) { // Slidebars is initiated, left is in use and called to open.
                    $( 'html' ).addClass( 'sb-active sb-active-left' ); // Add active classes.
                    $left.addClass( 'sb-active' );
                    animate( $left, $left.css( 'width' ), 'left' ); // Animation
                    setTimeout( function() {
                        leftActive = true;
                        if ( typeof callback === 'function' ) callback(); // Run callback function.
                    }, 400); // Set active variables.
                } else if ( init && side === 'right' && $right ) { // Slidebars is initiated, right is in use and called to open.
                    $( 'html' ).addClass( 'sb-active sb-active-right' ); // Add active classes.
                    $right.addClass( 'sb-active' );
                    animate( $right, '-' + $right.css( 'width' ), 'right' ); // Animation
                    setTimeout( function() {
                        rightActive = true;
                        if ( typeof callback === 'function' ) callback(); // Run callback function.
                    }, 400 ); // Set active variables.
                }
            }
        }

        // Close either Slidebar
        function close( callback ) {
            if ( leftActive || rightActive ) { // If a Slidebar is open.
                if ( leftActive ) {
                    animate( $left, '0px', 'left' ); // Animation
                    leftActive = false;
                }
                if ( rightActive ) {
                    animate( $right, '0px', 'right' ); // Animation
                    rightActive = false;
                }

                setTimeout( function() { // Wait for closing animation to finish.
                    $( 'html' ).removeClass( 'sb-active sb-active-left sb-active-right' ); // Remove active classes.
                    if ( $left) $left.removeClass( 'sb-active' );
                    if ( $right) $right.removeClass( 'sb-active' );
                    if ( typeof callback === 'function' ) callback(); // Run callback function.
                }, 400 );
            }
        }

        // Toggle either Slidebar
        function toggle( side, callback ) {
            if (side === 'left' && $left ) { // If left Slidebar is called and in use.
                if ( !leftActive ) {
                    open( 'left', callback ); // Slidebar is closed, open it.
                } else {
                    close( null, callback ); // Slidebar is open, close it.
                }
            }
            if ( side === 'right' && $right ) { // If right Slidebar is called and in use.
                if ( !rightActive ) {
                    open( 'right', callback ); // Slidebar is closed, open it.
                } else {
                    close( null, callback ); // Slidebar is open, close it.
                }
            }
        }

        function followLink(event, selector, close) {
            if ( event.type === 'click' || event.type === 'touchend' ) { // Make sure the user wanted to follow the link.
                event.preventDefault(); // Stop default behaviour.

                var link = ( selector.is( 'a' ) ? selector : selector.find( 'a' ) ), // Get the link selector.
                url = link.attr( 'href' ), // Get the link url.
                target = ( selector.attr( 'target' ) ? selector.attr( 'target' ) : '_self' ); // Set target, default to _self if not provided.

                if (close) {
                    close( function() { // Close Slidebar and pass callback to redirect.
                      window.open( url, target );
                    } );
                } else {
                    window.open( url, target );
                }
            }
        }

        // ---------
        // 007 - API

        this.slidebars = {
            open: open, // Maps user variable name to the open method.
            close: close, // Maps user variable name to the close method.
            toggle: toggle, // Maps user variable name to the toggle method.
            init: function() { // Returns true or false whether Slidebars are running or not.
                return init; // Returns true or false whether Slidebars are running.
            },
            reInit: initialise, // Run the init method to check if the plugin should still be running.
            resetCSS: css, // Reset inline
            active: function( side ) { // Returns true or false whether Slidebar is open or closed.
                if ( side === 'left' && $left ) return leftActive;
                if ( side === 'right' && $right ) return rightActive;
            },
            destroy: function( side ) { // Removes the Slidebar from the DOM.
                if (side === 'left' && $left ) {
                    if (leftActive) close(); // Close if its open.
                    setTimeout( function() {
                        $left.remove(); // Remove it.
                        $left = false; // Set variable to false so it cannot be opened again.
                    }, 400 );
                }
                if ( side === 'right' && $right ) {
                    if ( rightActive ) close(); // Close if its open.
                    setTimeout( function() {
                        $right.remove(); // Remove it.
                        $right = false; // Set variable to false so it cannot be opened again.
                    }, 400 );
                }
            },
            version: function() {
                console.log( '0.11 Development' );
            }
        };

        // ----------------
        // 008 - User Input

        function eventHandler( event, selector ) {
            event.stopPropagation(); // Stop event bubbling.
            event.preventDefault(); // Prevent default behaviour.
            if ( event.type === 'touchend' ) selector.off( 'click' ); // If event type was touch, turn off clicks to prevent phantom clicks.
        }

        // Toggle left Slidebar
        $( 'body' ).on( 'touchend click', '.sb-toggle-left', function( event ) {
            eventHandler( event, $( this ) ); // Handle the event.
            toggle( 'left' ); // Toggle the left Slidbar.
        });

        // Toggle right Slidebar
        $( 'body' ).on( 'touchend click', '.sb-toggle-right', function( event ) {
            eventHandler( event, $( this ) ); // Handle the event.
            toggle( 'right' ); // Toggle the right Slidbar.
        });

        // Open left Slidebar
        $( 'body' ).on( 'touchend click', '.sb-open-left', function( event ) {
            eventHandler( event, $( this ) ); // Handle the event.
            open( 'left' ); // Open the left Slidebar.
        });

        // Open right Slidebar
        $( 'body' ).on( 'touchend click', '.sb-open-right', function( event ) {
            eventHandler( event, $( this ) ); // Handle the event.
            open( 'right' ); // Open the right Slidebar.
        });

        // Close Slidebar
        $( 'body' ).on( 'touchend click', '.sb-close', function ( event ) {
            if ( $( this ).is( 'a' ) || $( this ).children().is( 'a' ) ) { // Is a link or contains a link.
                followLink(event, $(this), true);
            } else { // Just a normal control class.
                eventHandler( event, $( this ) ); // Handle the event.
                close(); // Close Slidebar.
            }
        });

        // Expand sidebar sub menus
        $( '.sb-slidebar' ).on( 'touchend click', '.menu a', function ( event ) {
            var parent = $(event.currentTarget).parent();
            if (parent.hasClass('expanded')) {
                parent.toggleClass('open');
                return false;
            } else {
                followLink(event, $(this));
            }
        });

        // Close Slidebar via site
        $( 'body' ).on( 'touchend click', $site, function( event ) {
            if ( settings.siteClose && ( leftActive || rightActive ) ) { // If settings permit closing by site and left or right Slidebar is open.
                eventHandler( event, $( this ) ); // Handle the event.
                if($(event.target).parents('.sb-slidebar').length == 0) {
                  close(); // Close it.
                }
            }
        });

    }; // End Slidebars function.

} ) ( jQuery2 );