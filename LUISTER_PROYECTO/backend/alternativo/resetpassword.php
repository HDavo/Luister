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
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
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
                    $sender->mailTo($email,'Restauracion de contraseña',`Acceda a http://localhost:4200/set-your-password/$token para restaurar su contraseña`);
                }
                echo json_encode($res);
            }else echo json_encode($id);
        }else echo json_encode($data);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
?>