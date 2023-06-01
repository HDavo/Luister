<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $id=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $prepQ = $conection->prepare("SELECT * FROM customlisttracks WHERE customlistid = :id");
            $prepQ->bindParam(':id', $id);
            $prepQ->execute();
            $res = $prepQ->fetchAll();
            if($res){
                echo json_encode(['status'=>200, 'data'=> $res]);
            }else echo json_encode([
                'status'=>404,
                'message'=> 'Sin listas personalizadas'
            ]); 
        }else die(json_encode([
            'status'=>400,
            'messages'=> 'Sin datos'
        ]));
    } catch (PDOException $e) {
       die(json_encode([
        'status'=>500,
        'message'=>'Hubo un error inensperado '.$e->getMessage()]));
    }
?>