
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
		$('input[name="get_children_offset"]').attr('type', 'text');
	}

	function hilight_low_k() {
		var e = $('.add_k_cmnt');
		var s = $.trim(e.text());
		if (!s) return;
		s = s.match(/[0-9]+$/)[0];
		var numK = parseInt(s);
		if (numK <= 3)
			e.addClass('most_important');
	}
}


g_features.push( new FeatureMix() );

