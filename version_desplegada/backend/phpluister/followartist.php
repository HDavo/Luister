<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $data=$name=$userid=$image=$lookupkey=$conection='';

    try {
        $conection = new PDO('mysql:host=luister-db:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents('php://input'));
    
        if($data){
            $name = $data->name;
            $userid = intval($data->userid);
            $image = $data->image;
            $lookupkey = $data->lookupkey;

            $prepQ = $conection->prepare("SELECT id FROM followedartists WHERE follower = :userid AND name = :name");
            $prepQ->bindParam(':userid', $userid);
            $prepQ->bindParam(':name', $name);
            $prepQ->execute();
            $followed = $prepQ->fetch();

            if($followed){
                $prepQ = $conection->prepare("DELETE FROM followedartists WHERE follower = :userid AND name = :name");
                $prepQ->bindParam(':userid', $userid);
                $prepQ->bindParam(':name', $name);
                $prepQ->execute();

                echo json_encode(['status'=>200, 'message'=> 'Dejaste de seguir a '.$name]);
            }else{
                $prepQ = $conection->prepare("INSERT INTO followedartists (name,image,lookupkey,follower) VALUES (:name, :image, :lookupkey, :follower)");
                $prepQ->bindParam(':follower', $userid);
                $prepQ->bindParam(':name', $name);
                $prepQ->bindParam(':image', $image);
                $prepQ->bindParam(':lookupkey', $lookupkey);
                $prepQ->execute();

                echo json_encode(['status'=>200, 'message'=> 'Siguiendo a  '.$name]);
            }

        }else die(json_encode([
            'status'=>400, 'message'=> 'Sin datos'
        ]));
    } catch (PDOException $e) {
       die(json_encode(['status'=>500,'message'=>'Hubo un error inensperado '.$e->getMessage()]));
    }
?>
