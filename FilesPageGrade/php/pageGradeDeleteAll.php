<?php  
  require('../../config.php'); 

  //Delete all data grade 
    $delete = "DELETE FROM informationgrade";
    $auto_increment = "ALTER TABLE informationgrade AUTO_INCREMENT = 1"; 
    $conn->query($delete);
    $conn->query($auto_increment);

  
 ?>