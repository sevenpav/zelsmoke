<?php
	$msg_box = "";
	$message .= "<br/><img src='http://zelsmoke.ru/logo.png' width='160' style='display: block;'><br/>";
	$message .= "Имя: <b>" . $_POST['name'] . "</b><br/>";
	$message .= "Номер: <b>" . $_POST['phone'] . "</b><br/><br/>";
	$message .= "Основной кальян:" . $_POST['hookah'] . "<br/>";
	$message .= "Дополнительные чаши:" . $_POST['bowls'] . "<br/>";
	$message .= "Промокод: <b>" . $_POST['promocode'] . "</b><br/>";
	$message .= "Сумма заказа: <b>" . $_POST['sum'] . " руб.</b><br/><br/>";
	$message .= "<span style='font: 20px sans-serif; display: block;'><b>Настало время забить кальянчик!</b></span><br/>";
	$message .= "<img src='http://zelsmoke.ru/4088c395a13ff732757535518fb90be3.png' width='240' style='display: block;'>";
	send_mail($message);

	echo json_encode(array(
		'result' => $msg_box
	));

	function send_mail($message){
		$mail_to = "hello@zelsmoke.ru";
		$subject = "Заказ на zelSmoke Зеленоград";
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";
		$headers .= "From: zelSmoke\r\n";

		mail($mail_to, $subject, $message, $headers);
	}
