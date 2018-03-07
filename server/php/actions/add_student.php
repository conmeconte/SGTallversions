<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$query = "INSERT INTO `students` SET `name` = '$post[name]', `grade` = '$post[grade]', `course` = '$post[course]' ";

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    } else {$output['errors'][] = 'no data available';}
}
else {$output['errors'][] = $result;}


?>

