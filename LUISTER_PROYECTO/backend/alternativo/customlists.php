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
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    
        if(isset($_GET['userid'])){
            $userid = $_GET['userid'];
            $prepQ = $conection->prepare("SELECT cl.id, cl.title, cl.image, count(t.lookupkey) AS totaltracks FROM customlists AS cl LEFT JOIN tracks AS t ON cl.id = t.customlistid WHERE cl.userid = :userid GROUP BY cl.id, cl.title, cl.image");
            $prepQ->bindParam(':userid', $userid);
            $prepQ->execute();
            $res = $prepQ->fetchAll();
            if($res){
                echo json_encode(['status'=>200, 'data'=> $res]);
            }else echo json_encode([
                'status'=>404,
                'message'=> 'Sin listas personalizadas'
            ]); 
        }else die(json_encode([
            'status'=>404,
            'messages'=> 'Sin datos'
        ]));
    } catch (PDOException $e) {
       die(json_encode([
        'status'=>500,
        'message'=>'Hubo un error inensperado.']));
    }
?>