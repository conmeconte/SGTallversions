<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$query = "DELETE FROM `students` WHERE `id` = '$post[id]'";

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
        $output['error'] = $conn;
    } else {$output['errors'][] = 'no data available';}
}
else {
    $output['errors'][] = 'error in query';
}


?>

