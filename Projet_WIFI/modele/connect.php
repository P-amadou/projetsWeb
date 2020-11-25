<?php


	$hostname = "localhost";
	$base= "basepwebc";
	$loginBD="root";
	$passBD="";

try {

	$pdo = new PDO ("mysql:server=$hostname; dbname=$base; charset=utf8", "$loginBD", "$passBD");
}

catch (PDOException $e) {
	die  ("Echec de connexion : " . utf8_encode($e->getMessage()) . "\n");
}

?>