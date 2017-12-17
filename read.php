<?php 
require_once('mysqlcredentials.php');

$query= "SELECT s.name AS Student_Name, c.name AS Course_Name, i.name AS Instructor, g.Grade AS Grade FROM grades AS g JOIN courses AS c ON g.Course_id = c.id JOIN instructor AS i ON c.Instructor_id = i.id JOIN student_data AS s ON g.Student_id = s.id";

$result=mysqli_query($conn, $query);

$output=[
    'success'=>false,
    'data'=>[],
    'error'=>[]
];


if($result){
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_assoc($result)){
            $output['data'][]=$row;
        }
        $output['success']=true;
    } else{
        $output['error'][]='no data avaialble';
    }
} else{
    $output['error'][]='wrong SQL query, no results';
};

$json_output= json_encode($output);
echo $json_output;


?>