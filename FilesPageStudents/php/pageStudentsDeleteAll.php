<?php  
  require('../../config.php'); 

  //Delete all data grade 
    $delete = "DELETE FROM informationstudents";
    $auto_increment = "ALTER TABLE informationstudents AUTO_INCREMENT = 1"; 
    $conn->query($delete);
    $conn->query($auto_increment);

    $Name_folder = "../../uploads";

    $content_folder = glob($Name_folder."/*");

    foreach($content_folder as $file){
      if(is_file($file)){
        unlink($file);
      }
    }
  
 ?>