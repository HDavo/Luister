<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }

    $request=$token=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $request = json_decode(file_get_contents('php://input'));
    
        if(isset($request->session)){
            $token = $request->session;
            $prepQ = $conection->prepare("DELETE FROM sessions WHERE token = :token");
            $prepQ->bindParam(':token', $token);
            $res = $prepQ->execute();
            echo json_encode($res);
        }else echo $request->session;
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
?>