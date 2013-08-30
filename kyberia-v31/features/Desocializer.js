
function Desocializer()
{
	this.name = 'Desocializer';
	this.onLoad = function() {
		avatars().hide();
		usernames().hide();
	}
	/////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar'); }
	function usernames() { return $('.node_login'); }

}

g_features.push( new Desocializer() );

