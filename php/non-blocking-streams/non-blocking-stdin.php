#!/usr/bin/php

<?php
	echo 'Opening php://stdin'."\n";
	$fp = fopen('php://stdin','r');
	$result = stream_set_blocking($fp, false);
	echo 'stream_set_blocking returned ' . ($result ? 'true' : 'false') . "\n";
	fclose($fp);
	echo 'Finished'."\n";
?>