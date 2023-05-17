<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }

    $data=$userid=$listid=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents("php://input"));
    
        if($data){
            $userid = $data->userid;
            $listid = $data->customlistid;

            $prepQ = $conection->prepare("DELETE FROM customlists WHERE id = :clid AND userid = :userid");
            $prepQ->bindParam(':userid', $userid);
            $prepQ->bindParam(':clid', $listid);
            $res = $prepQ->execute();
            
            echo json_encode($res);
        }else $data;
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
?>