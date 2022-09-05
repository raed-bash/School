<?php 
  require('../../config.php'); 

   $requese = $_REQUEST;
    $value1 = $requese['valueDate1_N']; 
    $value2 = $requese['valueDate2_N']; 

$getData = "SELECT * FROM informationstudents WHERE year BETWEEN $value1 AND $value2";
$result = $conn->query($getData);
$row = $result->fetch_all(MYSQLI_ASSOC); 
 echo json_encode($row); 
?>