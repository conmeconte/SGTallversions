<?php
require_once('mysqlcredentials.php');


$query="DELETE FROM students WHERE
id='{$_POST['student_id']}'
";

$result= mysqli_query($conn, $query);

$output=[
    'success'=>false,
    'data'=> [],
    'error'=> []
];


if($result){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['data'] = mysqli_insert_id($conn);
    } else {
        $output['errors'][]= 'unable to insert data';
    }
} else{
    $output['errors'][] = 'error in SQL query';
}

$json_output= json_encode($output);

print($json_output);


?>