
/*
	1. include version.js (once a 24h)
		localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION'] = '1.23';

	2. if last != current
		show download link
*/
function AutoUpdater()
{
	this.name = 'AutoUpdater';
	this.onLoad = function() {
		if (!window.KYBERIA_V31_USERSCRIPT_VERSION) return;

		if (window.chrome)
			chromeShouldntUseUserscript();

		if (onceADay()) checkForUpdate();

		if (isNewVersion() && shouldRemind())
			message().prependTo('body');
	}

	var urlBase = 'http://p.brm.sk/kyberia-v31-userscript';
	//var urlBase = 'http://l/kyberia-v31-userscript';
	var urlVersion = urlBase+'/version.js';
	var urlDownload = urlBase+'/kyberia-v31.user.js';
	var urlChangelog = 'https://github.com/idpsycho/kyberia-v31/commits/master';
	var urlChrome = 'https://chrome.google.com/webstore/detail/kyberia-v31-features/icjomacohfdgbijhlhkhfomoeolncgia';

	function chromeShouldntUseUserscript() {
		var div = $('<div>');
		div.css({'text-align': 'center', 'font-weight': 'bold', 'color': 'red', 'padding-top': '40px'});
		var msgChrome = 'Seems like you\'re using chrome, install chrome extension from ';
		var aChrome = $('<a target="_blank">').attr('href', urlChrome).text('here');
		div.append( $('<div>').text(msgChrome).append(aChrome) );

		div.prependTo('body');
	}

	function message() {
		var last  = lastVersion();
		var curr  = currVersion();
		var div = $('<div>').css({'text-align': 'center', 'font-weight': 'bold', 'color': 'red',
									'padding-top': '40px'});

		var later = $('<a href="#">').text('LATER').attr('title', 'remind me after 24 hours');
		var install = $('<a target="_blank">').text('INSTALL').attr('href', urlDownload);
		var changelog = $('<a target="_blank">').text('what changed?').attr('href', urlChangelog);
		var space = $('<span>').html('&nbsp; - &nbsp;');

		later.click(function() {
			div.slideUp();
			localStorage['KYBERIA_V31_USERSCRIPT_LAST_REMIND'] = time();
			return false;
		});

		div.html('Kyberia extension - new version is out '+last+' (you have '+curr+')<br>');
		div.append(install).append(space).append(later).append(space.clone()).append(changelog);

		return div;
	}

	function shouldRemind() {
		var last_remind = localStorage['KYBERIA_V31_USERSCRIPT_LAST_REMIND'];
		if (!last_remind) return true;

		var aDay = 24*60*60*1000;
		return ago(last_remind) > aDay;
	}

	function onceADay() {
		var last_check = localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION_CHECK'];
		if (!last_check) return true;

		var aDay = 24*60*60*1000;
		return ago(last_check) > aDay;
	}
	function checkForUpdate() {
		localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION_CHECK'] = time();
		var operaFuckYouFix = '?'+Math.random();
		$('<script>').attr('src', urlVersion+operaFuckYouFix).appendTo('body');
	}
	function lastVersion() { return localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION']; }
	function currVersion() { return window.KYBERIA_V31_USERSCRIPT_VERSION; }
	function isNewVersion() {
		var last = lastVersion();
		var curr = currVersion();
		if (!last || !curr) return false;
		return last != curr;
	}
}

AutoUpdater.checkForUpdateNow = function() {
	localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION_CHECK'] = 0;
	(new AutoUpdater()).onLoad();
};

AutoUpdater.version = function() {
	if (window.KYBERIA_V31_USERSCRIPT_VERSION)
		return window.KYBERIA_V31_USERSCRIPT_VERSION;
	if (window.chrome)
		return window.chrome.runtime.getManifest().version;
	return '???';
}
AutoUpdater.is_userscript = function() {
	return !!window.KYBERIA_V31_USERSCRIPT_VERSION;
}



g_features.push( new AutoUpdater() );

