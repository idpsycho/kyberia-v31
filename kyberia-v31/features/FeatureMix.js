
function FeatureMix()
{
	this.name = 'FeatureMix';
	this.onLoad = function() {
		fix_imgur();
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

}


g_features.push( new FeatureMix() );

