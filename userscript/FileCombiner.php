<?php

class FileCombiner
{
	static function checkedCombine($outFname, $inFnames, $ignoreCheck=0)
	{
		$dbg = false;

		$needFT = 0;
		foreach ($inFnames as $inf)
		{
			$ft = filemtime($inf);
			if ($dbg) echo "$inf - ".date("Y-m-d H:i:s", $ft)."<br>";
			$needFT = max($ft, $needFT);
		}

		$ft = filemtime($outFname);
		if ($dbg) echo "$outFname - ".date("Y-m-d H:i:s", $ft)."<br>";

		if (!$ignoreCheck)
		if (file_exists($outFname) && $needFT < filemtime($outFname))
		{
			if ($dbg) echo 'file combining update not needed';
			return;
		}

		// otherwise combine..

		$data = '';
		$out = '';
		$out .= "// Auto-combined file, created at ".date("Y-m-d H:i:s")."\n";
		$out .= "// From files:\n";

		foreach ($inFnames as $fname)
		{
			$ft = filemtime($fname);
			$info = "$fname (".date("Y-m-d H:i:s", $ft).")";
			$out .= "// \t{$info}\n";

			$data .= "// File: {$info}\n\n";
			$data .= file_get_contents($fname);
			$data .= "\n\n";
		}

		$out .= "\n\n";
		$out .= $data;

		file_put_contents($outFname, $out);
	}
};

?>
