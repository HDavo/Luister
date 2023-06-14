<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $userid=$conection='';

    try {
        $conection = new PDO('mysql:host=luister-db:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    
        if(isset($_GET['userid'])){

            $userid = $_GET['userid'];
            $prepQ = $conection->prepare("SELECT * FROM followedartists WHERE follower = :userid");
            $prepQ->bindParam(':userid', $userid);
            $prepQ->execute();
            $followeds = $prepQ->fetchAll();

            echo json_encode(['status'=>200, 'data'=>$followeds]);

        }else die(json_encode(['status'=>400, 'message'=> 'Peticion incorecta']));
    } catch (PDOException $e) {
       die(json_encode(['status'=>500,'message'=>'Hubo un error inensperado '.$e->getMessage()]));
    }
?>
