
function Desocializer()
{
	this.name = 'Desocializer';
	this.onLoad = function() {
		avatars().hide();
		usernames().hide();
	}
	/////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar').add('img[src^="/images/nodes/"]'); }
	function usernames() {
		var a = $('a.node_login').add('tr#sidebar_owner a');
		var inK = $('a:eq(2)', 'table.bordered td.header');
		return a.add(inK);
	}

}

g_features.push( new Desocializer() );

