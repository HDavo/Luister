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
        $conection = new PDO('mysql:host=172.17.0.3:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $request = json_decode(file_get_contents('php://input'));
    
        if($request){
            $email = $request->email;
            $pass = $request->password;

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
                    $res = $prepQ->execute();

                    if($res){
                        echo json_encode([
                            'status'=>200,
                            'data'=>[
                                'auth-token'=>$token,
                                'userdata' => $userdata
                            ]
                        ]);
                    }else echo json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']);
                }else echo json_encode(['status'=>403, 'message'=>'Credenciales incorrectas']);
            }else echo json_encode(['status'=>404, 'message'=>'Dirección de correo electrónico no dada de alta']); 
        }else echo json_encode(['status'=>400, 'message'=>'Error en la petición']);
    } catch (PDOException $e) {
        die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado '.$e->getMessage()]));
    }
?>
