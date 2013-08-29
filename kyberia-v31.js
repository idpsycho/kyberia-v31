// main content script


function onReady()
{
	for (var i=0; i < g_features.length; i++)
	{
		var feature = g_features[i];
		if (!isFeatureEnabled(feature.name)) continue;

		feature.onLoad();
	}
}

$(function() {
	onReady();
});
