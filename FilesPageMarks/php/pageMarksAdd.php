<?php 
  require('../../config.php'); 
 
//add data Marks
if(isset($_POST['marks_M_N'])){
    $MARKS = test($_POST['marks_M_N']);   
    $NAMEStudents = test($_POST['nameStudents_M_N']);    
    $NANEArticle = test($_POST['nameArticle_M_N']);      
    if($MARKS>=50){
      $result = "ناجح";
    }else if($MARKS<50){
      $result = "راسب"; 
    }

     $sql = "INSERT INTO informationMarks(Marks,NameStudents,NameArticle,result) VALUES('$MARKS','$NAMEStudents','$NANEArticle','$result')";
     $conn->query($sql);
   } 
   function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>