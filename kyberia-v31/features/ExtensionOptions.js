
function ExtensionOptions()
{
	this.name = 'ExtensionOptions';
	this.onLoad = function() {
		if (inConfigureUserinfo())
			addExtensionOptions();

	}
	////////////////////////////////////////////////////////////
	function inConfigureUserinfo() {
		var id = userId();
		if (!id) return;
		id = RegExp.escape( id );
		var re = new RegExp('\/id\/'+id+'\/1961033.*$')	// http://kyberia.sk/id/1297258
		return window.location.href.match(re);
	}

	function getOptionsHtml(fn)
	{
		if (!window.KYBERIA_V31_USERSCRIPT_VERSION && window.chrome)
		{
			var url = window.chrome.extension.getURL("options.html");
			$.get(url, fn, 'html');
		}
		else
		{
			fn( OPTIONS_HTML() );
		}
	}
	function addExtensionOptions()
	{
		getOptionsHtml(function(html) {
			var options = $(html).insertBefore('#configure');

			$('.bug-report').hide();
			$('.toggle-bug-report').click(function() {
				var b = $('.bug-report').slideToggle().is(':visible');
				prepareBugReport(options);
				return false;
			});

			applyOptionsJavascript();
		});
	}
	function prepareBugReport(options)
	{
		var v = AutoUpdater.version();
		var u = AutoUpdater.is_userscript() ? ' (userscript)' : '';
		var browser = getBrowserInfo();
		var header_template = getHeaderTemplate();
		var bug = '';
		bug += 'bug report, v'+v+u+', '+browser+'\n';
		bug += 'header '+header_template+'\n';
		bug += '\n';
		var ta = options.find('.bug-report textarea').css({ width: '100%' });
		ta.val(bug).focus();

		$('[name=node_name]').val('bug report, v'+v+u);
		moveCaretToEnd(ta);
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

