
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31675559-1']);


chrome.extension.onMessage.addListener(
	function(message, sender, sendResponse)
	{
		if (message.arrEnabledFeatures)
			analytics( message.arrEnabledFeatures );
	}
);

function analytics(arrEnabledFeatures)
{
	console.log('logging kyberia-v31 extension usage (happens once a day)');
	// http://developer.chrome.com/extensions/tut_analytics.html

	if (1)
	{
		var arr = [];
		arr.push(['_trackEvent', 'kyberia-v31', 'Version: all']);
		arr.push(['_trackEvent', 'kyberia-v31', 'Version: '+chrome.runtime.getManifest().version]);

		for (var k in arrEnabledFeatures)
			arr.push(['_trackEvent', 'kyberia-v31', 'Feature: '+arrEnabledFeatures[k]]);

		_gaq.push.apply(_gaq, arr);
	}
	else
	{
 		_gaq.push(['_trackPageview', '/kyb-v31/test']);
 	}

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}
