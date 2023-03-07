<?php
function obtenerCandidato(){
	include("conexion.php");
	$query = "SELECT * FROM candidato";
	$result = mysqli_query($conex,$query);

	$json = array();

	while($row = mysqli_fetch_array($result)){
		$json[] = array(
			'idCandidato' => $row['idC'],
			'nomCandidato' => $row['nombre']
		);
	}

	$jsonstring = json_encode($json);
	echo $jsonstring;
}
obtenerCandidato()

?>