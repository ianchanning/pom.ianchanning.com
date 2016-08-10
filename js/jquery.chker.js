(function($) {
    $.fn.chker = function() {
        var timer = $(this);
        var timerId = 0;
        var tickInterval = 1000;
        var appName = 'Lock Stock Pomodoros';
        var siteName = 'ianchanning';

        var dd      = timer.find('.day');
        var hh      = timer.find('.hr');
        var mm      = timer.find('.min');
        var ss      = timer.find('.sec');
        var hs      = timer.find('.hsec');
        var pp      = timer.find('.pomo');
        var start   = timer.find('.start');
        var stop    = timer.find('.stop');

        var defaultFile = 'bacon.txt';
        var alarm = document.getElementById('alarm');

        var queryString = function () {
            if (location.search.length > 0) {
                return location.search;
            }

            return $(".clock a").rand().attr('href');
        };

        var quotesFile = function() {
            var queryDict = {};

            queryString()
                .substr(1)
                .split("&")
                .forEach(function(item) {
                    queryDict[item.split("=")[0]] = item.split("=")[1];
                });

            if (!queryDict.q) {
                queryDict.q = defaultFile;
            }

            return queryDict.q;
        };

        var fileName = quotesFile();
        var quotes;

        $.get(fileName, function(data) {
            quotes = Hjson.parse('['+data+']');
        });

        $(".clock a").removeClass('active');
        $(".clock a[href='?q="+fileName+"']").addClass('active');

        Notification.requestPermission();

        /**
         * Start the timer
         *
         * Primary method that calls `updateTimer` each second
         */
        var startTimer = function() {
            // prevent spamming the link
            if (timerId === 0) {
                timerId = setInterval(updateTimer, tickInterval);
                timer.addClass('ticking');
            }
        };

        /**
         * Stop the timer
         */
        var stopTimer = function() {
            clearInterval(timerId);
            timerId = 0;
            timer.removeClass('ticking');
        };

        start.click(startTimer);
        stop.click(stopTimer);

        /**
         * display the timer in the title
         */
        var updateTitle = function() {
            document.title = timer
                .find('.time')
                .text() + ' - ' + appName + ' : ' + siteName;
        };

        /**
         * Use the chk jQuery plugin as Pomodoro timer
         *
         * This function needs to be called once per second
         *
         * Tick down 60 seconds,
         * then down 25 minutes
         * and then up to 100 pomodoros
         *
         * The state is stored in the HTML elements within the span.time element
         *
         */
        var chkIt = function() {
            $(this)
                .chk()
                .down(ss, 60) // seconds
                .down(mm, 25) // minutes
                .up(pp, 100, randomNotification); // pomodoros
        };

        /**
         * Timer callback
         *
         * Primary ticking function
         */
        var updateTimer = function() {
            chkIt();
            updateTitle();
        };

        /**
         * Convert the first letter of each word to upper case
         * @param  {string} str Lower case string
         * @return {string}
         */
        var ucwords = function(str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        };

        var quoter = function(fileName) {
            file = fileName.split('.');
            return ucwords(file[0].replace(/_/g, ' '));
        };

        var randomNotification = function() {
            // don't stop after the first notification
            if (parseInt(pp.text()) >= 1) {
                stopTimer();
            }

            alarm.play();

            var randomQuote = quoteChooser();
            var options = {
                body: randomQuote
            };

            var n = new Notification(quoter(fileName)+' says',options);
            setTimeout(n.close.bind(n), 10000);

            $('.notifications').prepend(
                formatQuote(randomQuote, quoter(fileName))
            );
        };

        /**
         * Generate the HTML for a quote
         * @param  {string} quote   The raw quote
         * @param  {string} speaker Name of the quoter
         * @return {string}         HTML with paragraph and quoter beneath
         */
        var formatQuote = function(quote, speaker) {
            // format single quotes nicely
            var prettyQuote = quote.replace(/'/g, '&rsquo;');
            return '<p>'+prettyQuote+'<br>&mdash; '+speaker+'</p>';
        };

        var quoteChooser = function() {
            var randomNumber = Math.floor(Math.random() * quotes.length);
            quote = quotes[randomNumber];
            return quote;
        };

    };

    /**
     * jQuery.rand v1.0
     *
     * Randomly filters any number of elements from a jQuery set.
     *
     * MIT License: @link http://www.afekenholm.se/license.txt
     *
     * @author: Alexander Wallin (http://www.afekenholm.se)
     * @version: 1.0
     * @url: http://www.afekenholm.se/jquery-rand
     */
    $.fn.rand = function(k) {
        var b = this,
            n = b.size(),
            k = k ? parseInt(k) : 1;

        // Special cases
        if (k > n) return b.pushStack(b);
        else if (k == 1) return b.filter(":eq(" + Math.floor(Math.random()*n) + ")");

        // Create a randomized copy of the set of elements,
        // using Fisher-Yates sorting
        r = b.get();
        for (var i = 0; i < n - 1; i++) {
            var swap = Math.floor(Math.random() * (n - i)) + i;
            r[swap] = r.splice(i, 1, r[swap])[0];
        }
        r = r.slice(0, k);

        // Finally, filter jQuery stack
        return b.filter(function(i){
            return $.inArray(b.get(i), r) > -1;
        });
    };
})(jQuery);
