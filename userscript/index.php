<?php
/* to uz radsej vratit cely skript akurat s cache aspon na den

	if (isset($_GET['latest_version']))
	{
		$v = file_get_contents('latest_version');
		echo "localStorage['kyberia-v31-features_LATEST_VERSION'] = '$v'; \n";
		echo "console.log('latest version is: $v'); \n";
		die();
	}

*/
	if ($_POST['combine'])
	{
		if (!file_exists('../kyberia-v31-userscript'))
			mkdir('../kyberia-v31-userscript');

		$fname_USER_JS = '../kyberia-v31-userscript/kyberia-v31.user.js';
		$fname_META_JS = '../kyberia-v31-userscript/kyberia-v31.meta.js';
		$fname_VERSION_JS = '../kyberia-v31-userscript/version.js';

		// save version number to file latest_version
		$json = file_get_contents("../kyberia-v31/manifest.json");
		$json = json_decode($json);
		$VERSION = $json->version;

		$version_js = "localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION'] = '$VERSION';\n";
		file_put_contents($fname_VERSION_JS, $version_js);

		// put options.html into js, and set version..
		$options_html = file_get_contents('../kyberia-v31/options.html');
		$options_js = "// Auto-generated options_html.js from options.html \n";
		$options_js .= "window.KYBERIA_V31_USERSCRIPT_VERSION = '$VERSION';\n";
		$options_js .= "function OPTIONS_HTML() { return \"\\\n";
		foreach(explode("\n", $options_html) as $line)
			$options_js .= addslashes(trim($line, "\r"))."\\\n";

		$options_js .= '";';
		$options_js .= "\n}\n\n";
		file_put_contents('options_html.js', $options_js);

		$arrMerge = array("options_html.js");
		foreach ($json->content_scripts[0]->js as $fname)
			$arrMerge[] = "../kyberia-v31/".$fname;


		include "FileCombiner.php";
		FileCombiner::checkedCombine('kyberia-v31-headerless.js', $arrMerge, 'ignore check');

		$content = file_get_contents('kyberia-v31-headerless.js');

		$content = "(function() {\n\n$content\n\n})();";
		$header = file_get_contents('header.txt');
		$header = str_replace('VERSION', $VERSION, $header);

		$out = $header ."\n\n". $content;
		file_put_contents($fname_USER_JS, $out);
		//file_put_contents($fname_META_JS, $header); // not needed, userscripts.org generates it by itself

		echo "combined just now: $VERSION";
	}

?>
<br>
<br>
<!--<a href="<?=$versionUrl?>"><?=$versionUrl?></a>-->
<br>
<br>
<a href="../kyberia-v31-userscript/kyberia-v31.user.js">kyberia-v31.user.js</a>
<br>
<br>
<form method="POST">
	<input type="submit" name="combine" value="Combine extension to userscript!">
</form>