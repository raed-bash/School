 <?php  
   require('../../config.php');
//display data teacher 
 $table = "SELECT * FROM informationteacher";
 $result = $conn->query($table);

 $row = $result->fetch_all(MYSQLI_ASSOC);

 echo json_encode($row); 

 
  
 ?>