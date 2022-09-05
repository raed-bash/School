
<?php 
  require('../../config.php'); 

//edit data teacher

    $id =  $_POST['id_A_N'] ;
    $NAME = test($_POST['name_A_N']); 
    $NAMETEACHER = test($_POST['nameTeacher_A_N']); 
     $update = "UPDATE informationarticle SET NameArticle='$NAME', NameTeacher='$NAMETEACHER' WHERE id='$id'";
     $conn->query($update);
      
    function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>