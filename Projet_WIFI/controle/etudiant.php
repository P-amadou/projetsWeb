<?php 

function accueil() {
	require ('./modele/utilisateurBD.php');
	
	$login = $_SESSION['profil']['nom'];
	connect($_SESSION['profil']['nom']);
	$url = "./vue/html/carte.html";
	header ("Location:" .$url) ;
	//require ("./vue/html/carte.html");
}

function deconnect() {
	require ('./modele/utilisateurBD.php');
	disconnect($_SESSION['profil']['nom']);
	$_SESSION = array();
	session_destroy();
	header('Location: index.php'); //true ou false en base;
}

function Retour($util, $act){
	header("Location: index.php?controle=".$util."&action=".$act);
	exit();
	
}

?>


