<?php
	
function obtenerRegion(){
	include("conexion.php");
	$query = "SELECT 'id','name','idC','nombre' FROM regions,candidato order by id";
	$result = mysqli_query($conex,$query);

	$json = array();

	while($row = mysqli_fetch_array($result)){
		$json[] = array(
			'idRegion' => $row['id'],
			'nomRegion' => $row['name']
			// 'idCandidato' => $row['idC'],
			// 'nomCandidato' => $row['nombre']
		);
	}
	// while($row = mysqli_fetch_array($result2)){
	// 	$json[] += array(
			
	// 		'idCandidato' => $row['idC'],
	// 		'nomCandidato' => $row['nombre']
	// 	);
	// }

	$jsonstring = json_encode($json);
	echo $jsonstring;
}

function obtenerComuna($idRegion){
	include("conexion.php");
	$query = "SELECT * FROM comunas WHERE region_id = $idRegion";
	$result = mysqli_query($conex,$query);

	$json = array();

	while($row = mysqli_fetch_array($result)){
		$json[] = array(
			'idComuna' => $row['id'],
			'nomComuna' => $row['nombre']
		);
	}

	$jsonstring = json_encode($json);
	echo $jsonstring;
}

// function obtenerCandidato(){
// 	include("conexion.php");
// 	$query = "SELECT * FROM candidato";
// 	$result = mysqli_query($conex,$query);

// 	$json = array();

// 	while($row = mysqli_fetch_array($result)){
// 		$json[] = array(
// 			'idCandidato' => $row['id'],
// 			'nomCandidato' => $row['nombre']
// 		);
// 	}

// 	$jsonstring = json_encode($json);
// 	echo $jsonstring;
// }

if(isset($_POST['idReg'])) {
	$idRegion = $_POST['idReg'];
	obtenerComuna($idRegion);
} else {
	obtenerRegion();
	// obtenerCandidato();
}

// include("conexion.php");
// $nombre = $_POST['nombre'];
// $alias = $_POST['alias'];
// $correo = $_POST['correo'];
// $rut = $_POST['rut'];
// $region = $_POST['region'];
// $comuna = $_POST['comuna'];
// $candidato = $_POST['candidato'];
// $nosotros = $_POST['nosotros'];

// $sql = "INSERT INTO `votos`(`nombre`, `alias`, `rut`, `correo`, `region`, `ciudad`, `candidato`, `nosotros`) 
// 					VALUES ('$nombre','$alias','$rut','$correo','$region','$comuna','$candidato','$nosotros')";
// $resultado = mysqli_query($conex,$sql);
// if ($resultado){
// 	echo "funciona!";
// }else{
// 	echo "para la proxima";
// }
	
?>