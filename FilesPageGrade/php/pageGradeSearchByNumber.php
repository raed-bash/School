<?php 
  require('../../config.php'); 

   $requese = $_REQUEST;
    $id = $requese['id']; 

$getData = "SELECT * FROM informationgrade WHERE id='".$id."'";
$result = $conn->query($getData);
$row = $result->fetch_all(MYSQLI_ASSOC); 
 echo json_encode($row); 
?>