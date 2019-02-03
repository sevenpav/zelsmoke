<?php
	$msg_box = "";
	$message .= "<br/><img src='http://zelsmoke.ru/img/logo.png' width='160' style='display: block;'><br/>";
	$message .= "Имя: <b>" . $_POST['name'] . "</b><br/>";
	$message .= "Номер: <b>" . $_POST['phone'] . "</b><br/>";
	$message .= "Заказ: <b>" . $_POST['bowls'] . "</b><br/>";
	$message .= "Сумма заказа: <b>" . $_POST['sum'] ." руб.</b><br/><br/>";
	$message .= "<span style='font: 20px sans-serif; display: block;'><b>Настало время забить кальянчик!</b></span><br/>";
	$message .= "<img src='http://zelsmoke.ru/img/eb251943ee32229109f1cbad745939c9.png' width='240' style='display: block;'>";
	send_mail($message);

	echo json_encode(array(
		'result' => $msg_box
	));

	function send_mail($message){
		$mail_to = "p.tataurov92@gmail.com";
		$subject = "Заказ на ZelSmoke Зеленоград";
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";
		$headers .= "From: ZelSmoke\r\n";

		mail($mail_to, $subject, $message, $headers);
	}