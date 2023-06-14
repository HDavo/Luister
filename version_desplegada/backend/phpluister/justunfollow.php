<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $data=$userid=$artistid=$conection='';

    try {
        $conection = new PDO('mysql:host=luister-db:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents('php://input'));
    
        if($data){
            $userid = $data->userid;
            $artistid = $data->artistid;

            $prepQ = $conection->prepare("DELETE FROM followedartists WHERE follower = :userid AND id = :artistid");
            $prepQ->bindParam(':userid', $userid);
            $prepQ->bindParam(':artistid', $artistid);
            $prepQ->execute();

            echo json_encode(['status'=>200]);
        }else die(json_encode(['status'=>400]));
    } catch (PDOException $e) {
       die(json_encode(['status'=>500,'message'=>'Hubo un error inensperado '.$e->getMessage()]));
    }
?>
