<?php 
   require('../../config.php'); 
   $requese = $_REQUEST;
$id = $requese['GetIdData']; 

$getData = "SELECT * FROM informationteacher WHERE id='".$id."'";
$result = $conn->query($getData);
$row = $result->fetch_assoc();
echo json_encode($row);
?>