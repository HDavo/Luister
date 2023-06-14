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
    
    $data=$name=$email=$description=$mailer=$subject=$body=$res='';
    $toEmail='info@luister.es';
    $data = json_decode(file_get_contents("php://input"));

    if($data){
        $name = $data->name;
        $email = $data->email;
        $subject = $data->subject;
        $description = $data->description;

        $mailer = new Sendmail();
        $subject = '[Luister]: '.$subject;
        $body = <<<EOF
                    El usuario: $email, se ha puesto en contacto por el siguiente motivo:<br>
                    $description
                EOF;
        $res = $mailer->mailTo($toEmail, $subject, $body);
        
        if($res) echo json_encode(['status'=>200]);
        
    }else echo json_encode(['status'=>400, 'message'=>'No se recibieron datos']);
?>
