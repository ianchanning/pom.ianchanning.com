(function($) {
    jQuery.fn.chker = function() {
        var timer = $(this);
        var timerId = 0;
        var tickInterval = 1000;

        var dd      = timer.find('.day');
        var hh      = timer.find('.hr');
        var mm      = timer.find('.min');
        var ss      = timer.find('.sec');
        var hs      = timer.find('.hsec');
        var pp      = timer.find('.pomo');
        var start   = timer.find('.start');
        var stop    = timer.find('.stop');

        var quotes;
        var alarm = document.getElementById('alarm');

        var quotesFile = function() {
            var queryDict = {};
            location.search
                .substr(1)
                .split("&")
                .forEach(
                    function(item) {
                        queryDict[item.split("=")[0]] = item.split("=")[1];
                });

            if (!queryDict.q) {
                queryDict.q = 'bacon.txt';
            }

            return queryDict.q;
        };

        var fileName = quotesFile();

        var quoter = function(fileName) {
            file = fileName.split('.');
            return ucwords(file[0].replace(/_/g, ' '));
        };

        $.get(fileName, function(data) {
           quotes = Hjson.parse('['+data+']');
        });

        $(".clock a").removeClass('active');
        $(".clock a[href='?q="+fileName+"']").addClass('active');

        Notification.requestPermission();

        var randomNotification = function() {
            alarm.play();

            var randomQuote = quoteChooser();
            var options = {
                body: randomQuote
            };


            var n = new Notification(quoter(fileName)+' says',options);
            setTimeout(n.close.bind(n), 10000);
        };

        var quoteChooser = function() {
            var randomNumber = Math.floor(Math.random() * quotes.length);
            quote = quotes[randomNumber];
            return quote;
        };

        start.click(function() {
            // prevent spamming the link
            if (timerId === 0) {
                timerId = setInterval(chkIt, tickInterval);
                timer.addClass('ticking');
            }
        });

        stop.click(function() {
            clearInterval(timerId);
            timerId = 0;
            timer.removeClass('ticking');
        });

        var chkIt = function() {
            // rubiks cube stopwatch (tickInterval = 10)
            // $(this).chk().up(hs, 100).up(ss, 60);
            // 100/th second year (tickInterval = 10)
            // $(this).chk().up(hs, 100).up(ss, 60).up(mm, 60).up(hh, 24).up(dd, 365);
            // egg timer
            // $(this).chk().down(ss, 60).down(mm, 5);
            // t-minus 10, 9, 8, ...
            // $(this).chk().down(ss, 10).down(mm, 0);
            // pomodoro timer
            $(this).chk().down(ss, 60).down(mm, 25).up(pp, 100, randomNotification);
            document.title = timer.find('.time').text() + ' - Chker : ianchanning';
        };

        function ucwords(str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        }
    };

})(jQuery);
