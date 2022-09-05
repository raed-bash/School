
<?php 
  require('../../config.php'); 

//edit data marks

    $id =  $_POST['id_M_N'] ;
    $MARKS = test($_POST['marks_M_N']);   
    $NAMEStudents = test($_POST['nameStudents_M_N']);    
    $NANEArticle = test($_POST['nameArticle_M_N']);       
    if($MARKS>=50){
      $result = "ناجح";
    }else if($MARKS<50){
      $result = "راسب"; 
    }
     $update = "UPDATE informationmarks SET Marks='$MARKS', NameStudents='$NAMEStudents', NameArticle='$NANEArticle', result='$result' WHERE id='$id'";
     $conn->query($update);
      
    function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>