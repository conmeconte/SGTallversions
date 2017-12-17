<?php 
require_once('mysqlcredentials.php');

$query= "SELECT * FROM students";

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