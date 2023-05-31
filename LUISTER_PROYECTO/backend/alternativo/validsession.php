<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $data=$title=$artist=$listid=$lookupkey=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents("php://input"));
    
        if($data){
            $token = $data->sessiontoken;
            $prepQ = $conection->prepare("SELECT userid FROM sessions WHERE token = :token");
            $prepQ->bindParam(':token', $token);
            $prepQ->execute();
            $result = $prepQ->fetch();

            echo json_encode(['status'=> 200, 'data'=> $result]);
            
        } else echo json_encode(['status'=>400, 'message'=>'No se recibieron datos']);
    } catch (PDOException $e) {
        echo die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']));
    }
?>