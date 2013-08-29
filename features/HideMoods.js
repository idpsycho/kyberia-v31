
function HideMoods()
{
	this.name = 'HideMoods';
	this.onLoad = function() {
		moods().hide();
	}
	////////////////////////////////////////////////////////////

	function moods() { return $('small.mood'); }

}

g_features.push( new HideMoods() );

