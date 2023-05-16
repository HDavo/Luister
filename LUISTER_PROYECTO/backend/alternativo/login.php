<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $email=$pass=$request=$token=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $request = json_decode(file_get_contents('php://input'));
    
        if($request){
            $email = $request->data->email;
            $pass = $request->data->password;

            $prepQ = $conection->prepare("SELECT * FROM users WHERE email = :email");
            $prepQ->bindParam(':email', $email);
            $prepQ->execute();
            $res = $prepQ->fetch();
            if($res){
                if(password_verify($pass, $res['password'])){
                    unset($res['password']);
                    $userdata = $res;
                    $token = bin2hex(openssl_random_pseudo_bytes(16));
                    $prepQ = $conection->prepare("INSERT INTO sessions (token,userid,device) VALUES (:token,:userid,:device)");
                    $prepQ->bindParam(':token', $token);
                    $prepQ->bindParam(':userid', $userdata['id']);
                    $prepQ->bindParam(':device', $_SERVER['HTTP_USER_AGENT']);
                    $prepQ->execute();
                    $res = $prepQ;

                    if($res){
                        echo json_encode([
                            'auth-token'=>$token,
                            'data' => $userdata
                        ]);
                    }
                }else false;
            }else $res; 
        }else $request;
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
?>