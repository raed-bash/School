
<?php 
  require('../../config.php'); 

//edit data Grade

    $id =  $_POST['id_G_N'] ;
    $NAME = test($_POST['name_G_N']); 
     $update = "UPDATE informationgrade SET Name='$NAME' WHERE id='$id'";
     $conn->query($update);
      
    function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>