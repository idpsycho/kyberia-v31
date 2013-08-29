// main content script

function onReady()
{
	var arrEnabledFeatures = [];
	for (var i=0; i < g_features.length; i++)
	{
		var feature = g_features[i];
		if (!isFeatureEnabled(feature.name)) continue;

		arrEnabledFeatures.push( feature.name );	// for analytics

		feature.onLoad();
	}

	if (analyticsOnceADay())
		chrome.runtime.sendMessage( {arrEnabledFeatures: arrEnabledFeatures} );
}

function analyticsOnceADay()
{
	var lsKey = '_kyberia_v31_last_analytics';
	var last = localStorage[lsKey];
	if (last && ago(last) < 24*60*60*1000)
		return false;

	localStorage[lsKey] = time();
	return true;
}


$(function() {
	onReady();
});
