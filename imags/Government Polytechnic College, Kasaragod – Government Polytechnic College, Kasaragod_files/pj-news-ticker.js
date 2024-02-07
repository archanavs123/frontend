/**
 * PJ News Ticker - starts the marquee animation on all elements of class="pjnt-content"
 */

(function($) {
	$.fn.pjntinit = function() {
		return this.each(function() {
			var originalHtml = $(this).html();
			var originalWidth = parseInt($(this).width());
			var containerWidth = parseInt($(this).parent().width());
			var hasGap = $(this).data('gap');
			if (hasGap === false) {
				// we need to repeat at least once..
				$(this).append(originalHtml);
				// then repeat again until the total content is wide enough
				while (parseInt($(this).width()) < (containerWidth + originalWidth)) {
					$(this).append(originalHtml);
				}
			}
			$(this).bind('pjnt-start', function(event, c) {
				var contentLeft = parseInt($(this).css('left'));
				if (contentLeft <= -originalWidth)
				{
					// wrapped around, restart
					var newLeft = containerWidth;
					if (hasGap === false) {
						newLeft = contentLeft + originalWidth;
					}
					$(this).css({left: newLeft +'px'});
					contentLeft = newLeft;
				}
				else
				{
					// resume
				}
				var speed = $(this).data('speed'); // pixels per second
				var toGo = Math.ceil(originalWidth + contentLeft); // how many pixels we will be moving
				var duration = (toGo / speed) * 1000; // duration in milliseconds
				// do the animation, and start another one when finished
				$(this).animate({left: '-' + originalWidth + 'px'}, duration, 'linear', function() { $(this).trigger('pjnt-start'); } );
			});

			// start the animation now
			$(this).trigger('pjnt-start');

			// stop on mouse over
			$(this).mouseover( function() {
				$(this).stop();
			});
			// start again on mouse out
			$(this).mouseout( function() {
				$(this).trigger('pjnt-start');
			});

		});
	};
}(jQuery));


jQuery(document).ready(function($) {
	// wait for fonts to load, to ensure correct width() calc
	$(window).bind("load", function() {
		$('.pjnt-content').pjntinit();
	});
});
