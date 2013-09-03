<?php
	//if ($_POST['combine'])
	{
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
?>
<form method="POST">
	<input type="submit" name="combine" value="combine">
</form>
