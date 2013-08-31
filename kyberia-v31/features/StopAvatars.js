
function StopAvatars()
{
	this.name = 'StopAvatars';
	this.onLoad = function() {
		avatars().freezeGif();
	}
	////////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar').add('img[src^="/images/nodes/"]'); }

	$.fn.freezeGif = function()
	{
		this.load(function(e) {
			var t = $(this)[0];
			freezeGif(t);
		});
		return this;
	}

	function freezeGif(gifElem)
	{
		if (!gifElem.complete) console.log('yep');
		var i = gifElem;
	    var c = document.createElement('canvas');
	    var w = c.width = i.width;
	    var h = c.height = i.height;
	    c.getContext('2d').drawImage(i, 0, 0, w, h);
	    try
	    {
	        i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
	    }
	    catch(e)
	    {
	    	// cross-domain -- mimic original with all its tag attributes
	        for (var j = 0, a; a = i.attributes[j]; j++)
	            c.setAttribute(a.name, a.value);

	        i.parentNode.replaceChild(c, i);
	    }
	}
}

g_features.push( new StopAvatars() );

