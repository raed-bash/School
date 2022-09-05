<?php 
  require('../../config.php'); 
 
//add data Article
if(isset($_POST['name_A_N'])){
    $NAMEArticle = test($_POST['name_A_N']);   
    $NAMETeacher = test($_POST['nameTeacher_A_N']);    
     $sql = "INSERT INTO informationarticle(NameArticle,NameTeacher) VALUES('$NAMEArticle','$NAMETeacher')";
     $conn->query($sql);
   } 
   function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>