 <?php  
  require('../../config.php'); 

//display data Grade 
 $table = "SELECT * FROM informationstudents";
 $result = $conn->query($table);

 $row = $result->fetch_all(MYSQLI_ASSOC);

 echo json_encode($row); 

 
  
 ?>