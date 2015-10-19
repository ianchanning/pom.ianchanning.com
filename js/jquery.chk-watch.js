(function($) {
	$.fn.chkWatch = function() {
		this.checkSum = null;

		this.tick = function(unitElement, limit, func) {
			var newHand = this.count(this.hand(unitElement), this.checkSum, limit, 0);
			this.update(unitElement, newHand, 0);
			return this;
		};

		this.count = function(unit, checkSum, limit, overflow) {
			if (this.check(checkSum)) {
				unit++;
			}
			if (unit >= limit) {
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
