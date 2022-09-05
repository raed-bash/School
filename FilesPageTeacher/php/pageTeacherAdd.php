<?php 
   require('../../config.php');
 
//add data teacher
if(isset($_POST['name_T_N'])){
    $NAME = test($_POST['name_T_N']);
    $year =  $_POST['year_T_N'] ;
    $month =  $_POST['month_T_N'] ;
    $day =  $_POST['day_T_N'] ; 
    $ADDRESS = test($_POST['address_T_N']); 
     $sql = "INSERT INTO informationteacher(NameT,year,month,day,	AddressT) VALUES('$NAME','$year','$month','$day','$ADDRESS')	";
     $conn->query($sql);
   }
   function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>