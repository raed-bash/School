<?php 
  require('../../config.php'); 
  if(isset($_POST['article'])&&$_POST['MoodVisible0']==="All"){
   $MoodVisible0 = $_POST['MoodVisible0'];   
   $article = $_POST['article'];  
   $getData = "SELECT * FROM informationmarks WHERE NameArticle LIKE '$article%'";
  }else if(isset($_POST['article'])&&$_POST['MoodVisible0']==="Success"){ 
    $article = $_POST['article'];  
    $getData = "SELECT * FROM informationmarks WHERE result='ناجح' AND NameArticle LIKE '$article%'";
   }else if(isset($_POST['article'])&&$_POST['MoodVisible0']==="fail"){ 
    $article = $_POST['article'];  
    $getData = "SELECT * FROM informationmarks WHERE result='راسب' AND NameArticle LIKE '$article%'";
   } 
  

$result = $conn->query($getData);
$row = $result->fetch_all(MYSQLI_ASSOC); 
 echo json_encode($row); 
?>