<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include_once 'config/database.php';
include_once 'testTable.php';

$database = new Database();
$db = $database->getConnection();

$TestTable = new TestTable($db);

$stmt = $TestTable->read();
$num = $TestTable->count();

if($num>0) {
	$testArr=array();
	$testArr["records"]=array();

	while ($row = mysqli_fetch_assoc($stmt)) {
		extract($row);

		$test_record=array(
			"id" => $id,
			"boolCol" => $boolCol,
			"dateCol" => $dateCol
		);

		array_push($testArr["records"], $test_record);
	}

	http_response_code(200);
	echo json_encode($testArr);
}

else {
	http_response_code(404);
	echo json_encode(
		array("message" => "Error: records not found.")
	);
}