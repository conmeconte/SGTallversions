<?php 
require_once('mysqlcredentials.php');

$query= "SELECT * FROM students";

$result=mysqli_query($conn, $query);

$output=[
    'success'=false,
    'data'=[],
    'errors'=>[]
];


if($result){
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_assoc($result)){
            $output['data'][]=$row;
        }
        $outputp['success']=true;
    } else{
        $output['errors'][]='no data avaialble';
    }
} else{
    $output['errors'][]='wrong SQL query, no results';
};

$json_output= json_encode($ouput);
print($output); 


?>
