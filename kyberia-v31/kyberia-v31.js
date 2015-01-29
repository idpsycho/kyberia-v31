// main content script

function onReady()
{
	var arrTimes = [];

	var arrEnabledFeatures = [];
	for (var i=0; i < g_features.length; i++)
	{
		var feature = g_features[i];
		if (!isFeatureEnabled(feature.name)) continue;

		arrEnabledFeatures.push( feature.name );	// for analytics

		var t = time();
		feature.onLoad();

		arrTimes.push({ dt:(time() - t), name:feature.name });
	}

	if (localStorage['kyberia_v31_show_performance'])
	{
		arrTimes.sort(function(a,b) { return b.dt-a.dt; });
		for (var i=0; i < arrTimes.length; i++)
		{
			var x = arrTimes[i];
			console.log(x.dt+' s\t'+x.name);
		}
	}

	if (analyticsOnceADay())
		sendAnalyticsInfo( arrEnabledFeatures );

	// not necessary, but very useful for debugging.. breaks stuff in firefox, so just chrome..
	if (window.chrome)
		$('<script src="//code.jquery.com/jquery-2.0.3.min.js">').appendTo('body');
}

function analyticsOnceADay()
{
	var lsKey = '_kyberia_v31_last_analytics';
	var last = localStorage[lsKey];
	if (last && ago(last) < 24*60*60)
		return false;

	localStorage[lsKey] = time();
	return true;
}


$(function() {
	onReady();
});
