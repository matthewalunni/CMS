#!/usr/bin/php-cgi
<?php
require_once ('header_functions.php');

$functions = array('test', 'currentUser', 'currentUserId', 'addUser', 'getAllPages', 'getAllUsers', 'getMedia', 'getPage',
    'addMedia', 'addPage', 'deletePage', 'deleteUser', 'login', 'createAccount', 'createWebsite', 'getWebsiteData',
    'getPagesData','getUsersData','getAccountMedia', 'deleteUser', 'deletePage', 'addUser','addPage', 'updateAccountPassword');

if(isset($_POST['function']) && in_array($_POST['function'], $functions)){
    $_POST['function']();
}

function createAccount(){
    if (!empty($_POST)) {
        $account = Account::addAccount($_POST['email'], $_POST['first_name'], $_POST['last_name'], 'ADMIN', $_POST['password']);
        if (!$account) {
            echo 'There was a problem creating your account!';
        } else {
            echo 'Account created!';
        }
    }
    die;
}

function createWebsite(){
    if (!empty($_POST)) {
        $website = Website::createWebsite($_POST['accountId'], "sites/".$_POST['title']."/html/home.html", $_POST['title'], $_POST['description']);
        if ($website === false) {
            echo "false";
        } else {
            echo json_encode($website);
        }
    }
    die;
}

function login(){
    $success = false;
    if (!empty($_POST)) {
        if (!empty($_POST['email']) && !empty($_POST['password'])) {
            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
            $account = Account::getAccountByEmail($email);

            $response = array();
            $response['email'] = $_POST['email'];

            if ($account !== false) {
                if (password_verify($_POST['password'], $account->password)) {
                    $success = true;
                }
            }
        }
    }
    if($success === true){
        $response['accountId'] = $account->accountId;
        echo json_encode($response);
    }else{
        echo "false";
    }
    die;
}

function updateAccountPassword(){
    $success = false;
    if (!empty($_POST['email']) && !empty($_POST['password'])) {
        $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
        $success = Account::updatePassword($email, $_POST['password']);
    }
    if($success === true){
        echo "true";
    }else{
        echo "false";
    }
    die;
}

function getWebsiteData(){
    $success = false;
    if (!empty($_POST['accountId'])) {
        $accountId = $_POST['accountId'];
        $data = Account::getWebsiteData($accountId);
        // Verify account password and set $_SESSION
        if ($data !== false) {
            $json = json_encode($data);
            $success = true;
        }
    }
    if($success === true){
        echo $json;
    }else{
        echo "false";
    }
    die;
}

function getPagesData(){
    $success = false;
    if (!empty($_POST['websiteId'])) {
        $schema = "website".$_POST['websiteId'];
        $data = Website::getAllPages($schema);
        if ($data !== false) {
            $json = json_encode($data);
            $success = true;
        }
    }
    if($success === true){
        echo $json;
    }else{
        echo "false";
    }
    die;
}

function getUsersData(){
    $success = false;
    if (!empty($_POST['websiteId'])) {
        $schema = "website".$_POST['websiteId'];
        $data = Website::getAllUsers($schema);
        if ($data !== false) {
            $json = json_encode($data);
            $success = true;
        }
    }
    if($success === true){
        echo $json;
    }else{
        echo "false";
    }
    die;
}

function addPage(){
    $success = false;
    if (!empty($_POST['websiteId']) && !empty($_POST['pageName']) && !empty($_POST['file']) ) {
        $schema = "website".$_POST['websiteId'];
        $data = Website::addPage($schema, $_POST['pageName'], $_POST['file']);
        if ($data !== false) {
            $success = true;
        }
    }
    if($success === true){
        echo "true";
    }else{
        echo "false";
    }
    die;
}

function addUser(){
    $success = false;
    if (!empty($_POST['websiteId']) && !empty($_POST['firstName'])&& !empty($_POST['lastName'])
        && !empty($_POST['password'])&& !empty($_POST['email'])&& !empty($_POST['type']) ) {
        $schema = "website".$_POST['websiteId'];
        $data = Website::addUser($schema, $_POST['firstName'], $_POST['lastName'], $_POST['password'], $_POST['email'], $_POST['type']);
        if ($data !== false) {
            $success = true;
        }
    }
    if($success === true){
        echo "true";
    }else{
        echo "false";
    }
    die;
}

function deletePage(){
    $success = false;
    if (!empty($_POST['websiteId']) && !empty($_POST['pageId'])) {
        $schema = "website".$_POST['websiteId'];
        $data = Website::deletePageById($schema, $_POST['pageId']);
        if ($data !== false) {
            $success = true;
        }
    }
    if($success === true){
        echo "true";
    }else{
        echo "false";
    }
    die;
}

function deleteUser(){
    $success = false;
    if (!empty($_POST['websiteId']) && !empty($_POST['userId'])) {
        $schema = "website".$_POST['websiteId'];
        $data = Website::deleteUserById($_POST['userId'],$schema);
        if ($data !== false) {
            $success = true;
        }
    }
    if($success === true){
        echo "true";
    }else{
        echo "false";
    }
    die;
}


function getAccountMedia(){
    $success = false;
    if (!empty($_POST['accountId'])) {
        $data = Media::getMediaByAccount($_POST['accountId']);
        if ($data !== false) {
            $json = json_encode($data);
            $success = true;
        }
    }
    if($success === true){
        echo $json;
    }else{
        echo "false";
    }
    die;
}

function test(){
    $message = $_POST['message'];
    if($message == 'hello'){
        echo 'hello';
    } else {
        echo 'good bye';
    }    
    die;
}

function currentUser(){
    $currentUser = getCurrentUser();
    echo (!$currentUser ? '0' : json_encode($currentUser));
    die;
}

function getAllPages(){
    $all_pages = Website::getAllPagesJSON(DB_SCHEMA);
    echo json_encode($all_pages);
    die;
}

function getAllUsers(){
    $all_users = Account::getAllAccounts();
    echo json_encode($all_users);
    die;
}

function getMedia(){

}

function getPage(){

}

function addMedia(){

}
