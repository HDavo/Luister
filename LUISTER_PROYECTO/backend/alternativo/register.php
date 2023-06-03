<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    require_once('./PHPMailer/Sendmail.php');
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    $mailer=$name=$email=$token=$request=$conection='';

    try {
        $conection = new PDO('mysql:host=luister-db:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $request = json_decode(file_get_contents('php://input'));
    
        if($request){
            $name = $request->name;
            $email = $request->email;
            $token = bin2hex(openssl_random_pseudo_bytes(8));

            $prepQ = $conection->prepare("SELECT * FROM users WHERE email = :email");
            $prepQ->bindParam(':email', $email);
            $prepQ->execute();
            $response = $prepQ->fetch();
            
            if(!$response){
                $prepQ = $conection->prepare("INSERT INTO users (name, email, password) VALUES (:name,:email,:password)");
                $prepQ->bindParam(':name', $name);
                $prepQ->bindParam(':email', $email);
                $prepQ->bindParam(':password', $token);
                $prepQ->execute();
                $userid = $conection->lastInsertId();
                if($userid){
                    $prepQ = $conection->prepare("INSERT INTO passwordresettokens (value, userid) VALUES (:value,:userid)");
                    $prepQ->bindParam(':value', $token);
                    $prepQ->bindParam(':userid', $userid);
                    $res = $prepQ->execute();            
                    if($res){
                        $mailer = new Sendmail();
                        $subject = 'Activacion de usuario';
                        $body = <<<EOF
                                    Estimado, <br>
                                    Acceda al siguiente enlace para asignar una 
                                    contraseña y activar su usuario <br>
                                    enlace: http://luister-db:4200/set-your-password/$token

                                    Cordiales saludos, <br>

                                    Luister
                                EOF;
                        $res = $mailer->mailTo($email, $subject, $body);
                        echo json_encode(['status'=>200]);
                    }else echo json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']);
                }else echo json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']);
            }else echo json_encode(['status'=>406, 'message'=>'Dirección de correo electrónico ya existente']);
        }else echo json_encode(['status'=>400, 'message'=>'Peticion incorrecta']);
    } catch (PDOException $e) {
        die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']));
    }
?>