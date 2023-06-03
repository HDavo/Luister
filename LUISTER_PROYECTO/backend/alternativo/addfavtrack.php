<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $data=$title=$userid=$lookupkey=$conection='';

    try {
        $conection = new PDO('mysql:host=luister-db:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents("php://input"));
    
        if($data){
            $title = $data->name;
            $artists = $data->artists;
            $album = $data->album;
            $userid = $data->userid;
            $lookupkey = $data->lookupkey;

            $prepQ = $conection->prepare("SELECT id FROM favoritetracks WHERE title = :title AND userid = :userid AND lookupkey = :lookupkey ");
            $prepQ->bindParam(':title', $title);
            $prepQ->bindParam(':userid', $userid);
            $prepQ->bindParam(':lookupkey', $lookupkey);
            $prepQ->execute();
            $exist = $prepQ->fetch();

            if(!$exist){
                $prepQ = $conection->prepare("INSERT INTO favoritetracks (title,artist,album,userid,lookupkey) VALUES (:title,:artist,:album,:userid,:lookupkey)");
                $prepQ->bindParam(':title', $title);
                $prepQ->bindParam(':artist', $artist);
                $prepQ->bindParam(':album', $album);
                $prepQ->bindParam(':userid', $userid);
                $prepQ->bindParam(':lookupkey', $lookupkey);
                $prepQ->execute();
                $id = $conection->lastInsertId();
                if($id)echo json_encode(['status'=>200]);
                else echo json_encode(['status'=>500, 'message'=>'Hubo un error inesperrado al añadir la cancion']);
            } else echo json_encode(['status'=>406, 'message'=>'La pista ya se encuentra agregada']);
            
        }else echo json_encode(['status'=>400, 'message'=>'No se recibieron datos']);
    } catch (PDOException $e) {
        echo die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']));
    }
?>