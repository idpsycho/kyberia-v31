
function HideAvatars()
{
	this.name = 'HideAvatars';
	this.onLoad = function() {
		avatars().hide();
	}
	////////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar'); }

}

g_features.push( new HideAvatars() );

