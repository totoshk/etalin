<?
    if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
            $to = 'info@etalin.kz'; //Почта получателя, через запятую можно указать сколько угодно адресов
            $subject = 'Обратный звонок'; //Загаловок сообщения
            $message = ' 
                    <html>
                        <head>
                            <title>'.$subject.'</title>
                        </head>
                        <body>
                            <p>Имя: '.$_POST['name'].'</p>
                            <p>Телефон: '.$_POST['phone'].'</p>
                            <p>E-mail: '.$_POST['email'].'</p>
                            <p>Сообщение: '.$_POST['message'].'</p>
                        </body>
                    </html>'; //Текст нащего сообщения можно использовать HTML теги
            $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
            $headers .= "From: industry.etalin.kz <i@etalin.kz>\r\n"; //Наименование и почта отправителя
            mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
    }
?>