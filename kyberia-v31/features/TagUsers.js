
function TagUsers()
{
	this.name = 'TagUsers';
	this.onLoad = function() {
		taglist_loader();
		tag_users();
	}
	////////////////////////////////////////////////////////////

	function taglist_loader() {
		var btnLoad = $('a.v31-tagusers-list');
		if (!btnLoad.length) return;
		btnLoad.click(function() {
			var list = $('div.v31-tagusers-list').text().replace(/[ \t\n\r]+/g, ' ');
			list = $.trim(list);

			var orig = getFeatureValue('TagUsers');
			var list = orig+' '+list;

			var msg = 'Do you want to append new tagged users?\n'+
						'Original tag-list: '+orig+'\n\n'+
						'You can customize the new tag-list below:';
			if (list = prompt(msg, list))
				setFeatureValue('TagUsers', list);
		});

	}

	function tag_users() {
		var filter = getFeatureValue('TagUsers');
		if (!filter) return;
		var names = filter.split(/[ \t\n\r]/);
		for (var i=0; i < names.length; i++)
		{
			var name = $.trim(names[i]);
			if (!name) continue;
			var arr = name.split(':', 2);
			var id = arr[0];
			var user = arr[1];

			usernames().each(function() {
				var href = $(this).attr('href');
				if (!href) return;

				var re = new RegExp('\/id\/'+RegExp.escape(id)+'$');
				var re2 = new RegExp("'"+RegExp.escape(id)+"'");
				if (href.match(re) || href.match(re2)) {
					var changed_nick = $(this).text();
					$(this).html( user ).append( $('<sup>').text(changed_nick) );
				}
			});
		}
	}
	function usernames() {
		var a = $();
		a = a.add('a.node_login, a.node_creator, tr#sidebar_owner a');

		var inK = $('a:eq(2)', 'table.bordered td.header');
		a = a.add(inK);

		var inMail = $('a:eq(0), a:eq(1)', '#formular .message .header');
		a = a.add(inMail);

		return a;
	}
}

g_features.push( new TagUsers() );

