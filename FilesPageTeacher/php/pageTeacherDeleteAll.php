<?php  
   require('../../config.php'); 
  //Delete all data teacher 
    $delete = "DELETE FROM informationteacher";
    $auto_increment = "ALTER TABLE informationteacher AUTO_INCREMENT = 1"; 
    $conn->query($delete);
    $conn->query($auto_increment);

  
 ?>