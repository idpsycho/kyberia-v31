
function TagUsers()
{
	this.name = 'TagUsers';
	this.onLoad = function() {
		var filter = getFeatureValue(this.name);
		if (!filter) return;
		var names = filter.split(' ');
		for (var i in names)
		{
			var name = $.trim(names[i]);
			if (!name) continue;
			var arr = name.split(':', 2);
			var id = arr[0];
			var user = arr[1];

			usernames().each(function() {
				var href = $(this).attr('href');
				if (!href) return;

				var re = new RegExp('\/id\/'+id+'$');
				if (href.match(re))
					$(this).append( $('<sup>').text(user) );
			});
		}
	}
	////////////////////////////////////////////////////////////

	function usernames() {
		var a = $('a.node_login');
		var inK = $('a:eq(2)', 'table.bordered td.header');
		return a.add(inK);
	}
}

g_features.push( new TagUsers() );

