<?php  
  require('../../config.php');  
 
//delete data teacher 
$requese = $_REQUEST;
$id = $requese['deletedata'];  

 $sql = "DELETE FROM informationGrade WHERE id='$id'";
 $conn->query($sql);
 $confirm = "SELECT * FROM informationGrade";
 $auto_increment = "ALTER TABLE informationGrade AUTO_INCREMENT = 1";  
 $result = $conn->query($confirm); 
 if($result->num_rows===0){
 $conn->query($auto_increment);
 }  
 ?>