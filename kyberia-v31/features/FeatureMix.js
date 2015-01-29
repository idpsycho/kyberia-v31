
function FeatureMix()
{
	this.name = 'FeatureMix';
	this.onLoad = function()
	{
		// localStorage['v31_amie_mirrorize'] = 1
		if (localStorage['v31_amie_mirrorize'])
			mirrorize();

		// prevent annoying bug in panel.js, that fucks up error-reporting functionality
		$('<div id="sidebar_node">').append('<a href="#">').appendTo('body');
		document.captureEvents = function() {};

		fix_imgur();

		custom_pagination_offset();

		hilight_low_k();

		remember_login_type();

		remove_autoplay();

		people_custom_sorting();
	}
	////////////////////////////////////////////////////////////

	function mirrorize() {
		$('body').css({
			'-webkit-transform': 'scale(-1, 1)',	// Chrome, Safari 3.1+
			'transform': 'scale(-1, 1)',			// Firefox 16+, IE 10+, Opera 12.10+
		});
	}

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
		$('input[name="get_children_offset"]').attr('type', 'text').css('width', '40px');
	}

	function remove_autoplay()
	{
		$('object[data*="autoplay=1"]').remove();
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

	function remember_login_type() {
		$('#login_type_id, #login_type_name').change(function() {
			if ($(this).prop('checked'))
				localStorage['KYBERIA_V31_last-login-type'] = $(this).attr('id');
		});

		var login_type = localStorage['KYBERIA_V31_last-login-type'];
		if (login_type=='login_type_id' || login_type=='login_type_name')
			$('#'+login_type).prop('checked', true);
	}

	function people_custom_sorting()
	{
		$('.v31-sortable').show();

		$.fn.sortChildrenBy = function(fnSort)
		{
			this.each(function() {
				var kids = $(this).find('>*');
				kids.sort(fnSort);
				$(this).html(kids);
			});
		}

		function sortByIdle()
		{
			localStorage['people-sort-by-idle'] = 'yep';
			$('.user-list').sortChildrenBy(function(a,b) {
				a = parseInt($(a).data('idle'));
				b = parseInt($(b).data('idle'));
				return a-b;
			});
		}
		function sortByName()
		{
			localStorage['people-sort-by-idle'] = '';
			$('.user-list').sortChildrenBy(function(a,b) {
				a = $(a).text().toLowerCase();
				b = $(b).text().toLowerCase();
				return a<b ? -1 : (a>b ? 1 : 0);
			});
		}

		$(function() {
			if (localStorage['people-sort-by-idle'])
				sortByIdle();

			$('.v31-sortable .sort-by-name').click(function() {
				sortByName();
				return false;
			});
			$('.v31-sortable .sort-by-idle').click(function() {
				sortByIdle();
				return false;
			});
		});
	}
}


g_features.push( new FeatureMix() );

