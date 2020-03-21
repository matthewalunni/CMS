#!/usr/bin/php-cgi
<?php
//set this to 1 so we don't infintely redirect to login.php
//session_id('1');
require_once ('header_functions.php');

$functions = array('login');

if(isset($_POST['function']) && in_array($_POST['function'], $functions)){
    $_POST['function']();
}

function login()
{
    $success = false;
    if (!empty($_POST)) {
        if (!empty($_POST['email']) && !empty($_POST['password'])) {

            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
            $account = Account::getAccountByEmail($email);

            // Verify account password and set $_SESSION
            if ($account !== false) {
                // echo '<pre>'.var_export(print_r($account, true)).'</pre>';
                $pHash = password_hash($account->password, 1);
                if (password_verify($_POST['password'], $pHash)) {
//                    $_SESSION['account_id'] = $account->accountId;
                    $success = true;
                }
            }
        }
    }
    if($success){
        echo $account->accountId;
    }else{
        echo false;
    }
}

