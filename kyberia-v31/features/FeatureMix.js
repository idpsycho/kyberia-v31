
function FeatureMix()
{
	this.name = 'FeatureMix';
	this.onLoad = function()
	{
		fix_imgur();

		custom_pagination_offset();

		hilight_low_k();
	}
	////////////////////////////////////////////////////////////

	function fix_imgur() {
		$('body').on('keyup', 'textarea:focus', function(e) {
			if (!e.ctrlKey || e.which!=86) return;

			var orig = $(this).val();
			var fixed = orig.replace(/\/\/i\.imgur\.com\//g, '//img.imgur.com/');
			if (orig != fixed)
				$(this).val(fixed);
		});
	}

	function custom_pagination_offset() {
		$('.movement input[name="get_children_offset"]').attr('type', 'text').css('width', '40px');
	}

	function hilight_low_k() {
		var elems = $('.add_k_cmnt');
		elems = elems.add('.module_k_wallet .current_user_k');
		elems.each(function() {
			var e = $(this);
			var s = $.trim(e.text());
			if (!s) return;
			s = s.match(/[0-9]+$/)[0];
			var numK = parseInt(s);
			if (numK <= 3)
				e.addClass('most_important');
		});
	}
}


g_features.push( new FeatureMix() );

