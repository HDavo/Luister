<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    require_once('PHPMailer.php');
    require_once('Exception.php');
    require_once('SMTP.php');

    class Sendmail extends PHPMailer {
        private const HOST = 'smtp.gmail.com';
        private const USERMAIL = 'dorianwalkler24@gmail.com';
        private const SECRET = 'lisgubrpjhsvmreg';
        private $smtp_debug;
        private $smtp_secure;
        private $smtp_port;
        public function __construct(
            $exceptions = null,
            $debug = SMTP::DEBUG_OFF, 
            $tls_ssl = PHPMailer::ENCRYPTION_STARTTLS, 
            $port = 587
            ){
                parent::__construct($exceptions);
            }

        public function mailTo($toEmail,$subject,$body){
            try {
                // AJUSTES DEL SERVIDOR Y LA CUENTA CORREO
                $this->isSMTP();
                $this->Host       = self::HOST;
                $this->SMTPAuth   = true;
                $this->Username   = self::USERMAIL;
                $this->Password   = self::SECRET;
                $this->SMTPSecure = $this->smtp_secure; // PHPMailer::ENCRYPTION_SMTPS o 'ssl'; PHPMailer::ENCRYPTION_STARTTLS o 'tls'
                $this->Port       = $this->smtp_port; // Para TLS 587 - Para SSL 465
                $this->SMTPDebug = $this->smtp_debug;

                // EMISOR (IGUAL QUE LA CUENTA DE CORREO) Y RECEPTORES
                $this->setFrom(self::USERMAIL, self::USERMAIL); // Origen, nombre
                $this->addAddress($toEmail, $toEmail); // Destino, nombre

                $this->isHTML(true); // Permitir mandar con etiquetas HTML
                $this->Subject = $subject; // Asunto
                $this->Body    = $body; // Cuerpo

                 // Funcion de envio
                return $this->send();
            } catch (Exception $e) {
                die("Hubo un error: {$this->ErrorInfo}");
            }
        }
    }
           
?>