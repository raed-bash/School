
<?php 
  require('../../config.php');

//edit data teacher

    $id =  $_POST['id_T_N'] ;
    $NAME = test($_POST['name_T_N']);
    $year =  $_POST['year_T_N'] ;
    $month =  $_POST['month_T_N'] ;
    $day =  $_POST['day_T_N'] ; 
    $ADDRESS = test($_POST['address_T_N']); 
     $update = "UPDATE informationteacher SET NameT='$NAME', year='$year', month='$month', day='$day', AddressT='$ADDRESS' WHERE id='$id'";
     $conn->query($update);
      
    function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>