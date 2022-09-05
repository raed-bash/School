<?php  
   require('../../config.php'); 
 
//delete data teacher 
$requese = $_REQUEST;
$id = $requese['deletedata'];  

 $sql = "DELETE FROM informationteacher WHERE id='".$id."'";
 $conn->query($sql);
 $confirm = "SELECT * FROM informationteacher";
 $auto_increment = "ALTER TABLE informationteacher AUTO_INCREMENT = 1";  
 $result = $conn->query($confirm); 
 if($result->num_rows===0){
 $conn->query($auto_increment);
 } 
 ?>