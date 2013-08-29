
function ExtensionOptions()
{
	this.name = 'ExtensionOptions';
	this.onLoad = function() {
		if (inConfigureUserinfo())
			addExtensionOptions();
	}
	////////////////////////////////////////////////////////////

	function userId() {	// TODO: could be cached, and could be in some utils.js or kyberia-api.js
		var href = $('a:contains("userinfo")').attr('href');
		if (!href) return;
		var m = href.match(/\/id\/([0-9]+)/);
		if (!m || m.length != 2) return;
		return m[1];
	}
	function inConfigureUserinfo() {
		var re = new RegExp(userId()+'\/1961033$')	// http://kyberia.sk/id/1297258
		return window.location.href.match(re);
	}

	function addExtensionOptions()
	{
		var url = chrome.extension.getURL("options.html");
		$.get(url, function(resp){
			$(resp).insertBefore('#configure');
			applyOptionsJavascript();
		}, 'html');
	}
	function applyOptionsJavascript()
	{
		var features = $('#kyberia_v31 .ls');
		for (var i=0; i < features.length; i++)
		{
			var feature = $(features[i]);
			var name = feature.attr('name');

			if (feature.is('[type=checkbox]'))
			{
				var b = isFeatureEnabled(name);
				feature.prop('checked', b);
			}
			else
			if (feature.is('[type=text]'))
			{
				var val = getFeatureValue(name);
				feature.val(val);
			}

			if (!isfeatureAvailable(name))
			{
				var label = feature.parent();
				label.addClass('disabled');
				label.parent().attr('title', 'not available yet');
			}
		}

		$('#kyberia_v31 .ls').change(function()
		{
			var t = $(this);
			var name = t.attr('name');
			if (t.is('input[type=checkbox]'))
			{
				//alert(name+' changed to '+t.prop('checked'));
				setFeatureEnabled(name, t.prop('checked'));
				$('#kyberia_v31 .saved').stop(true, true).show().fadeOut(2000);
			}
			else
			if (t.is('input[type=text]'))
			{
				//alert(name+' changed to '+t.val())
				setFeatureValue(name, t.val());
				$('#kyberia_v31 .saved').stop(true, true).show().fadeOut(2000);
			}
		});
	}
}

g_features.push( new ExtensionOptions() );

