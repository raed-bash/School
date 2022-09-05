<?php  
  require('../../config.php'); 

  //Delete all data Marks
    $delete = "DELETE FROM informationmarks";
    $auto_increment = "ALTER TABLE informationmarks AUTO_INCREMENT = 1"; 
    $conn->query($delete);
    $conn->query($auto_increment);

  
 ?>