<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}


$query = "UPDATE `students`
          SET `name` = '$post[name]', `course` = '$post[course]', `grade` = '$post[grade]' WHERE `ID` = '$post[id]' ";


$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;

    } else {$output['errors'][] = 'no data available';}
} else {$output['errors'][] = 'error in query';}

?>
