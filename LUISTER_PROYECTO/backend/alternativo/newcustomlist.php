<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $userid=$filename=$file=$title=$description=$conection='';
    $uploadDir='./images/customlist/';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    
        if(!empty($_POST)){
            $userid = $_POST['userid'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            if(!empty($_FILES)){
                $file = $_FILES['imageFile'];
                $filename = $file['name'];
                $filedir = $file['tmp_name'];
            }

            $prepQ = $conection->prepare("SELECT id FROM customlists WHERE userid = :userid AND title = :title");
            $prepQ->bindParam(':title', $title);
            $prepQ->bindParam(':userid', $userid);
            $prepQ->execute();
            $exist = $prepQ->fetch();

            if(!$exist){
                $prepQ = $conection->prepare("INSERT INTO customlists (title, description, image, userid) VALUES (:title,:description,:image,:userid)");
                $prepQ->bindParam(':title', $title);
                $prepQ->bindParam(':description', $description);
                $prepQ->bindParam(':image', $filename);
                $prepQ->bindParam(':userid', $userid);
                $prepQ->execute();
                $res = $conection->lastInsertId();
                
                if($res){
                    if(!empty($file)){
                        if (!file_exists('./images/')) mkdir('./images/');
                        if (!file_exists($uploadDir)) mkdir($uploadDir);
                        if (!file_exists($uploadDir.$res.'/')) mkdir($uploadDir.$res.'/');
                        
                        move_uploaded_file($filedir, $uploadDir.$res.'/'.$filename);
                    }
                    echo json_encode(['status'=>200]);
                }else echo json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']);
            } else echo json_encode(['status'=>406, 'message'=>'Lista ya existente']);;
        }else echo json_encode(['status'=>400, 'message'=>'Peticion incorrecta']);
    } catch (PDOException $e) {
        die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']));
    }
?>