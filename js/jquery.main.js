(function($) {
    $('#chker').chker();

    var checkToggle = function(stopButton, startButton) {
        return $('#chker').hasClass('ticking') ? stopButton : startButton;
    };

    var myToggle = function(myButton) {
        myButton.click().focus().toggleClass('button-activated');
    };

    var myActive = function(myButton) {
        myButton.toggleClass('button-activated');
    };

    $(document).keydown(function(event) {
        if (event.keyCode == '32') { // space bar
            event.preventDefault(); // the default being scroll the page down
            myActive(checkToggle($('#chker .stop'), $('#chker .start')));
        }
    });

    $(document).keyup(function(event) {
        if (event.keyCode == '32') { // space bar
            event.preventDefault();
            myToggle(checkToggle($('#chker .stop'), $('#chker .start')));
        }

    });

    $('#reminder').click(function(){
        if ($(this).text() === '+') {
            $('.reminder').fadeIn('slow');
            $(this).html('&times;');
        } else {
            $('.reminder').fadeOut('slow');
            $(this).html('+');
        }
    });
})(jQuery);
