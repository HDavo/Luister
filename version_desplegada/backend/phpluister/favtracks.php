<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $data=$userid=$conection='';

    try {
        $conection = new PDO('mysql:host=luister-db:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents('php://input'));
    
        if($data){
            $userid = $data->userid;
            $prepQ = $conection->prepare("SELECT ft.id, ft.title, ft.includedon, ft.lookupkey, ft.album, ft.artists, ft.userid FROM favoritetracks ft INNER JOIN users u ON ft.userid = u.id WHERE ft.userid = :userid");
            $prepQ->bindParam(':userid', $userid);
            $prepQ->execute();
            $res = $prepQ->fetchAll();

            echo json_encode(['status'=>200, 'data'=> $res]);

        }else die(json_encode([
            'status'=>400, 'message'=> 'Sin datos'
        ]));
    } catch (PDOException $e) {
       die(json_encode([
        'status'=>500,
        'message'=>'Hubo un error inensperado ']));
    }
?>