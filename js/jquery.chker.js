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

		var quotes = [
			'Split \'em open like a can of beans',
			'Fulham lost...again ',
			'This is rowing, not farming',
			'Do some Damage!',
			'Give it some beans!',
			'Keep it ticking over',
			'This is unreal!',
			'1 hour ergos, its money in the bank!',
			'I used to be a hard man!',
			'No. No. No. Thats it! No. No. No.',
			'Technique.'
		];

		Notification.requestPermission();
		/**
		 * HTML5 audio element
		 * @type element
		 * @link https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/Cross-browser_audio_basics#Creating_your_own_custom_audio_player
		 */
		var alarm = document.getElementById('alarm');
		var randomNotification = function() {
			alarm.play();

			var randomQuote = quoteChooser();
			var options = {
				body: randomQuote
			};

			var n = new Notification('Bill says',options);
			setTimeout(n.close.bind(n), 4000);
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
			document.title = timer.find('p').text() + ' - Chker : ianchanning';
		};

	};

})(jQuery);
