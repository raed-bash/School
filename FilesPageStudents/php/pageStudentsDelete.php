<?php  
  require('../../config.php');  
 
//delete data teacher 
$requese = $_REQUEST;
$id = $requese['deletedata'];  
$img = $requese['deleteImg'];  


 $sql = "DELETE FROM informationstudents WHERE id='$id'";
 $conn->query($sql);
 $confirm = "SELECT * FROM informationstudents";
 $auto_increment = "ALTER TABLE informationstudents AUTO_INCREMENT = 1";  
 $result = $conn->query($confirm); 
 unlink('../../'.$img);
 if($result->num_rows===0){
 $conn->query($auto_increment);
 }  
 ?>