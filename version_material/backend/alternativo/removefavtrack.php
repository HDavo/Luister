<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $data=$name=$userid=$lookupkey=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents("php://input"));
    
        if($data){
            $name = $data->name;
            $userid = $data->userid;
            $lookupkey = $data->lookupkey;

            $prepQ = $conection->prepare("DELETE FROM favoritetracks WHERE title = :name AND userid = :userid AND lookupkey = :lookupkey");
            $prepQ->bindParam(':name', $name);
            $prepQ->bindParam(':userid', $userid);
            $prepQ->bindParam(':lookupkey', $lookupkey);
            $prepQ->execute();
            
            echo json_encode(['status'=>200]);
            
        }else echo json_encode(['status'=>400, 'message'=>'No se recibieron datos']);
    } catch (PDOException $e) {
        echo die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado '.$e->getMessage()]));
    }
?>