<?php

$arResult = array('status' => false);

foreach ($_POST as $key => $value) 
{
    $_POST[$key] = trim($value);
}

$date = date_create();
//date_modify($date, '4 hour');
$date = date_format($date, 'd.m.Y H:i:s');

$to = 'testgubin@mail.ru';
$subject = 'Новая заявка на сайте от '.$date;

$args     = array(
	'Имя' => $_POST['name']??'',
	'Телефон' => $_POST['phone']??'',
	'Стоимость квартиры' => $_POST['flat_price']??'',
	'Первоначальный взнос' => $_POST['first_money']??'',
	'Срок ипотеки,лет' => $_POST['ipoteka_years']??'',
	'Ссылка на страницу квартиры' => $_POST['plan_href']??'',
	'Страница отправки заявки' => $_SERVER['HTTP_REFERER'],
	);

$body = '';
foreach ( $args as $key => $value ) 
{
	if ( ! empty( $value ) ) 
	{
		$body .= $key . ' : ' . $value . '.' . "\n";
	}
}

$headers = 'From: kv-portal-site@example.com';

if($_POST['title'] == 'Записаться на экскурсию')
{
	$subject = 'Новая заявка на экскурсию от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Скачать презентацию')
{
	$subject = 'Новая заявка на презентацию от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Скачать планировки')
{
	$subject = 'Новая заявка на просмотр планировок от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Заказать такси')
{
	$subject = 'Новая заявка на заказ такси от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Записаться на онлайн-просмотр')
{
	$subject = 'Новая заявка на онлайн-просмотр от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Оставить заявку на ипотеку')
{
	$subject = 'Новая заявка на расчёт ипотеки от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Заказ на звонок')
{
	$subject = 'Новая заявка на звонок от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

if($_POST['title'] == 'Узнать цену')
{
	$subject = 'Новая заявка на получение информации о планировки от '.$date;
	if ( mail( $to, $subject, $body, $headers ) )
	{
		$arResult['status'] = true;
	}
}

echo json_encode($arResult);




