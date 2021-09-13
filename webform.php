<?php 


# Capturando los datos

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

# Trayendo la libreria de PHP Mailer
require "phpmailer/PHPMailerAutoload.php";

$name = $_POST["name"];
$phone = $_POST["phone"];
// $email = $_POST["email"];
$message = $_POST["message"];

$body = "Nombre: " . $name . "<br>Telefono: " . $phone . "<br>Mensaje: " . $message;



$mail = new PHPMailer;

$mail->SMTPDebug=3;

# Aca mas adelante va a tener que traer el Frommail y Fromname de una tabla
$mail->From='llacay@gmail.com';
$mail->FromName='Llacay Sitio Web';

$mail->setFrom('llacay@gmail.com', 'Llacay Arq Sitio Web');
$mail->addAddress('llacay@gmail.com', 'Jorge');
$mail->addReplyTo($email, $name);

# Para que nos tome el HTML del text editor
$mail->isHTML(true);

# Usando utf8_decode para evitar problemas con tildes y caracteres raros
$mail->Subject= utf8_decode("Consulta Web");

$mail->Body = utf8_decode($body);

if($mail->send()){
	echo '{"error":0}';
	header('location: /');
}else{
	echo '{"error":1}';
}

 ?>
