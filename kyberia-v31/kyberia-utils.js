

var g_features = [];	// all extensions are instantiated into this list

var g_defaultFeatures = {
	'TagUsers': 1,
	'HideMoods': 1,
	'AjaxButtons': 1,
	'MailUpgrade': 1,
	'DeleteButton': 1,
	'LimitNodeHeight': 1,
	'LimitNodeWidth': 1,
	'InplaceEditing': 1,
	'QuickReply': 1,
	'ShowKGivers': 1,
	'FeatureMix': 1,
};

var g_defaultFeatureValues = {
	'TagUsers': '773:memfer',
};

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

function isfeatureAvailable(name)
{
	for (var i=0; i < g_features.length; i++)
		if (g_features[i].name == name)
			return true;
	return false;
}

function setFeatureEnabled(name, b)
{
	if (!name) return;
	var lsKey = '_kyberia_v31_feature_enabled_'+name;
	localStorage[lsKey] = b ? 'yes' : 'no';
}
function isFeatureEnabled(name)
{
	if (!name) return;
	if (name=='ExtensionOptions' || name=='AutoUpdater') return true;

	var lsKey = '_kyberia_v31_feature_enabled_'+name;
	var enabled = localStorage[lsKey];
	if (typeof enabled == 'undefined')
		enabled = g_defaultFeatures[name] ? 'yes' : 'no';

	if (enabled=='yes') return true;
	if (enabled=='no') return false;
	return false
}

function setFeatureValue(name, val)
{
	if (!name) return;
	var lsKey = '_kyberia_v31_feature_value_'+name;
	localStorage[lsKey] = val;
}
function getFeatureValue(name)
{
	if (!name) return;

	var lsKey = '_kyberia_v31_feature_value_'+name;
	var val = localStorage[lsKey];
	if (typeof val == 'undefined')
		val = g_defaultFeatureValues[name];

	return val;
}


function userId() {	// TODO: could be cached, and could be in some utils.js or kyberia-api.js
	var confs = $('a[href$="1961033"]');
	var setup = confs.filter(":contains('nastavenie'),:contains('setup')");
	if (!setup.length)
		setup = confs.eq(0);

	var href = setup.eq(0).attr('href');
	if (!href)
		return;

	var m = href.match(/\/id\/([0-9]+)/);
	if (!m || m.length != 2) return;
	return m[1];
}

function idFromAction(action)
{
	if (action instanceof jQuery) action = action.attr('action');
	if (!action) return;

	var m = action.match(/\/id\/([0-9]+)/);
	if (!m || !m[1]) return;
	return m[1];
}
function idFromHref(href)
{
	if (href instanceof jQuery) href = href.attr('href');
	if (!href) return;

	var m = href.match(/\/id\/([0-9]+)/);
	if (!m || !m[1]) return;
	return m[1];
}

function scrollToHref(href, off)
{
	if (!href) return;
	if (href[0] == '#') href = href.substr(1);
	var elem = $('[name="'+href+'"]');

	scrollToElem(elem, off);
}
function getElemByHref(href)
{
	if (!href) return;
	if (href[0] == '#')
		href = href.substr(1);
	return $('[name="'+href+'"]');
}

function scrollToElem($node, off)
{
	if (!$node || !$node.length) return;
	if (!off) off = 0;

	var pos = $node.offset().top + off;
	animScrollTop(pos);
}
function animScrollTop(pos, dt)
{
	if (typeof dt == 'undefined') dt = 500;
	$('html, body').stop().animate({scrollTop: pos}, dt);
}

function animScrollTop_ToNext(curr, next, dt)
{
	if (!curr.offset() || !next.offset())
		return;

	var posNow = curr.offset().top;
	var scrNow = $('body').scrollTop();
	var posWant = next.offset().top;
	var scrWant = posWant + (scrNow-posNow);
	animScrollTop( scrWant, dt );
}

function moveCaretToEnd(el) {
	el = $(el)[0];
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function getHeaderTemplate()
{
	var id = $('[name=header_id]:eq(0)').val();
	if (!id) return '?';
	return id;
}

function getBrowserInfo()	// http://www.javascripter.net/faq/browsern.htm
{
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
	 browserName = "Microsoft Internet Explorer";
	 fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	 browserName = "Chrome";
	 fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	 browserName = "Safari";
	 fullVersion = nAgt.substring(verOffset+7);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	 browserName = "Firefox";
	 fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
	          (verOffset=nAgt.lastIndexOf('/')) )
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 fullVersion = nAgt.substring(verOffset+1);
	 if (browserName.toLowerCase()==browserName.toUpperCase()) {
	  browserName = navigator.appName;
	 }
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	   fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
	 fullVersion  = ''+parseFloat(navigator.appVersion);
	 majorVersion = parseInt(navigator.appVersion,10);
	}

	return browserName+' '+fullVersion;
}



function time()	// miliseconds
{
	return new Date().getTime();
}
function ago(t)
{
	return time() - t;
}
