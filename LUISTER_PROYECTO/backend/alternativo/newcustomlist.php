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
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
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

            $prepQ = $conection->prepare("INSERT INTO customlists (title, description, image, userid) VALUES (:title,:description,:image,:userid)");
            $prepQ->bindParam(':title', $title);
            $prepQ->bindParam(':description', $description);
            $prepQ->bindParam(':image', $filename);
            $prepQ->bindParam(':userid', $userid);
            $prepQ->execute();
            $res = $conection->lastInsertId();
            
            if($res && !empty($file)){
                if (!file_exists('./images/')) mkdir('./images/');
                if (!file_exists($uploadDir)) mkdir($uploadDir);
                if (!file_exists($uploadDir.$res.'/')) mkdir($uploadDir.$res.'/');
                

                if(move_uploaded_file($filedir, $uploadDir.$res.'/'.$filename)){
                    echo json_encode($res);
                }else{
                    echo json_encode(false);
                }
            }else echo json_encode(false);
        }
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
?>