<?php  
  require('../../config.php'); 

  //Delete all data Article 
    $delete = "DELETE FROM informationarticle";
    $auto_increment = "ALTER TABLE informationarticle AUTO_INCREMENT = 1"; 
    $conn->query($delete);
    $conn->query($auto_increment);

  
 ?>