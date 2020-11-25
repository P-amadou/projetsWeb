<?php 
/*Fonctions-modèle réalisant la gestion d'une table de la base,
** ou par extension gérant un ensemble de tables. 
** Les appels à ces fcts se fp,t dans c1.
*/

	//echo ("Penser à modifier les paramètres de connect.php avant l'inclusion du fichier <br/>");
	//require ("modele/connect.php") ; //connexion MYSQL et sélection de la base, $link défini
	
function Update_insert($sql){
	require ("modele/connect.php") ; 
	try {
		$commande = $pdo->prepare($sql);
		$bool = $commande->execute();
	}
	catch (PDOException $e) {
		echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
		die(); 
	}
}

function verif_ident_BD($login,$pass,&$profil){ 
	require ("modele/connect.php"); 
	$profil = array();
	$sql_etu="SELECT * FROM etudiant where login_etu=:login_e and pass_etu=:pass_e";
	$res_etu= array(); 
	try {
		$cde_etu = $pdo->prepare($sql_etu);
		$cde_etu->bindParam(':login_e', $login);
		$cde_etu->bindParam(':pass_e', $pass);
		$b_etu = $cde_etu->execute();
		if (($b_etu)) {
			$res_etu = $cde_etu->fetchAll(PDO::FETCH_ASSOC); //tableau d'enregistrements
		}
	}
	catch (PDOException $e) {
		echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
		die(); // On arrête tout.
	}
	
	if ((count($res_etu)> 0)) {
		$profil = $res_etu[0];
		$profil['role']=$role;
		return true;
	}		
		return false;
	//faire une  requête SQL 
}

function connect($nom){
	$sql='UPDATE etudiant SET bConnect = 1 where nom="'.$nom.'"';
	Update_insert($sql);
}

function disconnect($nom){
	$sql='UPDATE etudiant SET bConnect = 0 where nom="'.$nom.'"';
	Update_insert($sql);
}


function connect_BD(){
	require ("modele/connect.php"); 
	$sql = "UPDATE etudiant SET bConnect=1 WHERE id_etu=".$_SESSION['profil']['id_etu'];
	Update_insert($sql);
}

function deconnect_BD(){
	require ("modele/connect.php"); 
	$sql = "UPDATE etudiant SET bConnect=0 WHERE id_etu=".$_SESSION['profil']['id_etu'];
	Update_insert($sql);
}

function uneValeur($valeur,$sql){
	require ("modele/connect.php") ;
	$commande = $pdo->prepare($sql);
	$bool = $commande->execute();
	if ($bool) {
		$chiffre = $commande->fetch(PDO::FETCH_ASSOC); 
		if(!empty($chiffre)){
			$id=$chiffre[$valeur];
		}
		else
			$id=0;
		return($id);
	}
}

?>