<?php
 require('../../config.php');  
$articleSuccssfully = "SELECT NameArticle FROM informationmarks  WHERE result='ناجح' GROUP BY `NameArticle`
ORDER BY COUNT(*) DESC
LIMIT 1
";
$result = $conn->query($articleSuccssfully);

$row = $result->fetch_assoc();

$Artcile = $row['NameArticle'] ;
$bestTeacher = "SELECT NameTeacher FROM informationarticle WHERE NameArticle='$Artcile'";
$result2 = $conn->query($bestTeacher);

$row2 = $result2->fetch_assoc();
echo $row2['NameTeacher']; 
?>
