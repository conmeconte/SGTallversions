<?php


if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}


$students = [];

$query = "SELECT `id`, `name`, `grade`, `course` FROM  `students`";

$result = mysqli_query($conn, $query);

if ($result) {
    $output['success'] = true;
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $students[] = $row;
        }

    } else {$output['errors'][] = 'no data available';}
} else {$output['errors'][] = 'error in query';}
?>

