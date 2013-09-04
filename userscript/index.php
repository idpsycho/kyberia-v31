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
		// save version number to file latest_version
		$json = file_get_contents("../kyberia-v31/manifest.json");
		$json = json_decode($json);
		//file_put_contents('latest_version', $json->version);


		// put options.html into js, and set version..
		$options_html = file_get_contents('../kyberia-v31/options.html');
		$options_js = "// Auto-generated options_html.js from options.html \n";
		$options_js .= "window.kyberia_v31_version = '{$json->version}';\n";
		$options_js .= "window.isHackyUserScript = true;\n";
		$options_js .= "function OPTIONS_HTML() { return \"\\\n";
		foreach(explode("\n", $options_html) as $line)
			$options_js .= addslashes(trim($line, "\r"))."\\\n";

		$options_js .= '";';
		$options_js .= "\n}\n\n";
		file_put_contents('options_html.js', $options_js);



		include "FileCombiner.php";
		FileCombiner::checkedCombine('kyberia-v31.user.js', array(
			"options_html.js",
			"../kyberia-v31/jquery.js",
			"../kyberia-v31/kyberia-utils.js",
			"../kyberia-v31/kyberia-v31.js",
			"../kyberia-v31/features/ExtensionOptions.js",
			"../kyberia-v31/features/HideAvatars.js",
			"../kyberia-v31/features/HideMoods.js",
			"../kyberia-v31/features/QuickReply.js",
			"../kyberia-v31/features/AjaxButtons.js",
			"../kyberia-v31/features/LimitNodeHeight.js",
			"../kyberia-v31/features/Desocializer.js",
			"../kyberia-v31/features/StopAvatars.js",
			"../kyberia-v31/features/DeleteButton.js",
			"../kyberia-v31/features/TagUsers.js",
			"../kyberia-v31/features/MailUpgrade.js",
			"../kyberia-v31/features/InplaceEditing.js",
			"../kyberia-v31/features/CompactMode.js"
			),
			'ignore check'
		);

		$content = file_get_contents('kyberia-v31.user.js');
		$header = file_get_contents('header.txt');
		//header('Location: ?#');
		$out = $header ."\n\n". $content;
		file_put_contents('kyberia-v31.user.js', $out);
		echo 'combined just now..';
	}

	//$versionUrl = '?latest_version&callback=?';
?>
<br>
<br>
<!--<a href="<?=$versionUrl?>"><?=$versionUrl?></a>-->
<br>
<br>
<form method="POST">
	<input type="submit" name="combine" value="Combine extension to userscript!">
</form>