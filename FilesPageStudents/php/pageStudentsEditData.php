
<?php 
  require('../../config.php'); 

//edit data Grade

    $id =  $_POST['id_S_N'] ;
    $NAME = test($_POST['StudentsNameS']);    
    $year = test($_POST['yearS']);    
    $month = test($_POST['monthS']);    
    $day = test($_POST['dayS']); 
    $Address = test($_POST['StudentsAddressS']);   
    $StudentsGrade = test($_POST['StudentsGradeS2']); 

    if($_POST["statusImg"]==="true"){ 
      
      $target_dir = "../../uploads/";
      $target_file = $target_dir . basename($_FILES["StudentsImgS"]["name"]);
      $uploadOk = 1;
      $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
      $check = getimagesize($_FILES["StudentsImgS"]["tmp_name"]);
      if($check !== false) {
      //  echo "File is an image - " . $check["mime"] . ".";
       $uploadOk = 1;
      } else {
        echo "الملف المحمل ليس صورة"; 
      $uploadOk = 0;
      } 
  
      // Check if file already exists
      if (file_exists($target_file)) {
      // echo "Sorry, file already exists.";
      echo "هذه الصورة موجودة بالفعل";

      $uploadOk = 0;
      }
  
      // Check file size
      if ($_FILES["StudentsImgS"]["size"] > 500000) {
      //  echo "Sorry, your file is too large.";
       echo "اسف حجم الصورة كبير";

       $uploadOk = 0;
      }
  
  // Allow certain file formats
      if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
      && $imageFileType != "gif" ) {
        // echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
      }
  
  // Check if $uploadOk is set to 0 by an error
      if ($uploadOk == 0) {
        // echo "Sorry, your file was not uploaded.";
      // if everything is ok, try to upload file
      } else {
          if (move_uploaded_file($_FILES["StudentsImgS"]["tmp_name"], $target_file)) {
           // echo "The file ". htmlspecialchars( basename( $_FILES["StudentsImgS"]["name"])). " has been uploaded.";
           $nameFile = "uploads/".test($_FILES["StudentsImgS"]["name"]); 
           $update = "UPDATE informationstudents SET name='$NAME' , year='$year', month='$month', day='$day',image='$nameFile', address='$Address', Grade='$StudentsGrade' WHERE id='$id'";
           $conn->query($update);
          echo  "تم تعديل معلومات الطالب";
         } else {
          //  echo "Sorry, there was an error uploading your file.";
         }
      }
  
  
    
    }else{
     
      $update = "UPDATE informationstudents SET name='$NAME' , year='$year', month='$month', day='$day', address='$Address', Grade='$StudentsGrade' WHERE id='$id'";
      $conn->query($update);
      echo "تم تعديل معلومات الطالب"; 
    }
 
    
    function test($data){
    $data = trim($data); 
    $data = htmlspecialchars($data);
    $data = stripcslashes($data);
    return $data;
   }
?>