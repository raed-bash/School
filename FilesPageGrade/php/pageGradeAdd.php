<?php 
  require('../../config.php'); 
 
//add data Grade
if(isset($_POST['name_G_N'])){
    $NAMEGrade = test($_POST['name_G_N']);    
     $sql = "INSERT INTO informationgrade(Name) VALUES('$NAMEGrade')";
     $conn->query($sql);
   } 
   function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>