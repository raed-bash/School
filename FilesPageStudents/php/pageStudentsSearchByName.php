  <?php  
   require('../../config.php'); 

   $requese = $_REQUEST;
    $name = $requese['name']; 

$getData = "SELECT * FROM informationstudents WHERE Grade LIKE '$name%'";
$result = $conn->query($getData);
$row = $result->fetch_all(MYSQLI_ASSOC); 
 echo json_encode($row); 
?>