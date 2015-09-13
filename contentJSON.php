<?php
header("Access-Control-Allow-Origin: *");
$content='nothing here';
if (isset($_GET['id'])) {
    $id=$_GET['id'];
    switch ($id){
        case '1':
            $content='one';
            break;
        case '2':
            $content='two';
            break;
        case '3':
            $content= 'three';
            break;
        case '4':
            $content= 'four';
            break;


    }

}


echo json_encode($content);



