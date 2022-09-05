 <?php  
  require('../../config.php'); 

//display data articel 
 $table = "SELECT * FROM informationarticle";
 $result = $conn->query($table);

 $row = $result->fetch_all(MYSQLI_ASSOC);

 echo json_encode($row); 

 
  
 ?>