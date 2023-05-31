<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require_once('./PHPMailer/Sendmail.php');

$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") die();

    $data=$email=$id=$token=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','admin','admin',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents("php://input"));
        
        if($data){
            $email = $data->accountemail;
            $prepQ = $conection->prepare("SELECT id FROM users WHERE email = :email");
            $prepQ->bindParam(':email', $email);
            $prepQ->execute();
            $id = $prepQ->fetch();
            if($id){
                $token = bin2hex(openssl_random_pseudo_bytes(8));
                $prepQ = $conection->prepare("INSERT INTO passwordresettokens (value, userid) VALUES (:value, :userid)");
                $prepQ->bindParam(':value', $token);
                $prepQ->bindParam(':userid', $id['id']);
                $res = $prepQ->execute();
                if($res){
                    $sender = new Sendmail();
                    $subject = 'Restauracion de credenciales';
                    $body = <<<EOF
                                Estimado, <br>
                                Acceda al siguiente enlace para asignar una 
                                contraseña y activar su usuario. 
                                <br><br>
                                Enlace: http://localhost:4200/set-your-password/$token
                                <br>
                                Cordiales saludos, 
                                <br><br>
                                Luister
                            EOF;
                    $res = $sender->mailTo($email,$subject,$body);
                    echo ($res)
                    ?json_encode(['status'=>200])
                    :json_encode(['status'=>500, 'message'=>'Hubo un error en el envio']);
                }else echo json_encode(['status'=>500, 'message'=> 'Hubo un error inesperado']);
            }else echo json_encode(['status'=>404, 'message'=>'La direccion de correo electronico no esta asociada a ninguna cuenta']);
        }else echo json_encode(['status'=>400, 'message'=>'Peticion incorrecta']);
    } catch (PDOException $e) {
        die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']));
    }
?>