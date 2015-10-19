(function($) {
	$.fn.chkTimer = function() {
		this.checkSum = null;

		this.tick = function(unitElement, limit, func) {
			var overflow = limit - 1;
			var oldHand = this.hand(unitElement);
			var newHand = this.count(oldHand, this.checkSum, limit, overflow);
			this.update(unitElement, newHand, overflow);
			return this;
		};

		this.count = function(unit, checkSum, limit, overflow) {
			// allow people to set the limit to zero as that makes more sense
			if (overflow < 0) {
				overflow = 0;
			}
			if (this.check(checkSum)) {
				unit--;
			}
			if (unit < 0) {
				return overflow;
			}
			return unit;
		};

		this.check = function(checkSum) {
			return typeof(checkSum) === undefined || checkSum === null || checkSum === 0;
		};

		this.update = function(unitElement, newHand, overflow) {
			unitElement.html(this.zeroPad(newHand));
			// this here is the bit that makes it all tick
			this.checkSum += (newHand - overflow);
		};

		this.zeroPad = function (newHand) {
			return "0".substring(newHand >= 10) + newHand;
		};

		this.hand = function(unitElement) {
			// parseInt() doesn't work here...
			return parseFloat(unitElement.text());
		};

		return this;
	};

})(jQuery);
