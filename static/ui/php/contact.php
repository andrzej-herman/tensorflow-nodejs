<?php

// Email Setting
//=======================================
$admin_email = "marwa@elmanawy.info";
$from_name = "Mulan";


if (isset($_POST['email'])) {

    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $comment = strip_tags($_POST['comment']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 5;
        exit;
    } else {
        $to = "$admin_email";
        $subject = "New Contact Information";
        $message = "Name: $name <br/>";
        $message .= "Email: $email <br/>";
        $message .= "Comment: $comment <br/>";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
        $headers .= "From:$from_name<$admin_email>";
        $headers .= "Reply-To: $admin_email\r\n" . "X-Mailer: PHP/" . phpversion();
        $send = mail($to, $subject, $message, $headers);
        echo '1';
    }
}
?>