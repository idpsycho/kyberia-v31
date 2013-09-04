
function AutoUpdater()
{
	this.name = 'AutoUpdater';
	this.onLoad = function() {


		if (onceADay()) checkForUpdate();

		if (isNewVersion()) {
			var link = $('<a>').prependTo('body');
			link.text('new kyberia extension '+lastVersion()+' is out (current: '+currVersion()+')');
			link.css({ display:'block', 'text-align': 'center', 'font-weight': 'bold',
							'margin-top': '50px', color: 'red'});
			link.attr('href', urlDownload);
		}
	}




	//var urlCheck = 'http://p.brm.sk/kyberia-v31/userscript/?latest_version';
	var urlCheck = 'http://l/kyberia-v31/userscript/?latest_version';
	var urlDownload = 'http://p.brm.sk/kyberia-v31/userscript/kyberia-v31.user.js';

	function onceADay() {
		return true;
	}
	function checkForUpdate() {
		$('<script>').attr('src', urlCheck).appendTo('body');
	}
	function lastVersion() { return localStorage['kyberia-v31-features_LATEST_VERSION']; }
	function currVersion() { return window.kyberia_v31_version; }
	function isNewVersion() { return 1 || lastVersion() != currVersion(); }



}

g_features.push( new AutoUpdater() );

