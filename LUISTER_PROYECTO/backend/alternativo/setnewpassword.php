<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require_once('./PHPMailer/Sendmail.php');

$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") die();

    $token=$password=$passwordrepeat=$conection='';

    try {
        $conection = new PDO('mysql:host=localhost:3306;dbname=luister','root','',[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $data = json_decode(file_get_contents("php://input"));
        if($data){
            $token = $data->token;
            $password = $data->password;
            $passwordrepeat = $data->passwordrepeat;

            $prepQ = $conection->prepare("SELECT userid FROM passwordresettokens WHERE value = :token");
            $prepQ->bindParam(':token', $token);
            $prepQ->execute();
            $result = $prepQ->fetch();
            if($result){
                $id = $result['userid'];
                $hashedpass = password_hash($password, PASSWORD_DEFAULT);
                $prepQ = $conection->prepare("UPDATE `users` SET `password` = :password WHERE id = :id");
                $prepQ->bindParam(':password', $hashedpass);
                $prepQ->bindParam(':id', $id);
                $res = $prepQ->execute();
                echo json_encode(['status'=>200]);
            }else (['status'=>500, 'message'=>'Hubo un error inesperado']);
        }else(['status'=>400, 'message'=>'Peticion incorrecta. Deben exisir datos']);
    } catch (PDOException $e) {
        die(json_encode(['status'=>500, 'message'=>'Hubo un error inesperado']));
    }
?>