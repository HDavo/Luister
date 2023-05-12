<?php

    $email='';
    $pass='';
    $token='';
    $conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }

    if(isset($_POST['email']) && isset($_POST['password'])){

        $email = $_POST['email'];
        $pass = $_POST['password'];

        $prepQ = $conection->prepare("SELECT * FROM users WHERE email = :email");
        $prepQ->bindParam(':email',$email);
        $prepQ->execute();
        $res = $prepQ->fetch();

        if($res){
            $token = bin2hex(openssl_random_pseudo_bytes(16));
            echo json_encode(['status'=> 200,'token'=> $token, 'user'=> $res]);
        }
    }else{
        echo json_encode(['status'=> 400,'message'=> 'Bad Request']);
    }

?>