<?php
// Get the verification token sent by Facebook
$hubVerifyToken = 'tspeech_token';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['hub_mode']) && isset($_GET['hub_challenge']) && isset($_GET['hub_verify_token'])) {
    $hubMode = $_GET['hub_mode'];
    $hubChallenge = $_GET['hub_challenge'];
    $hubVerifyToken = $_GET['hub_verify_token'];

    // Check if the hub mode and verify token match
    if ($hubMode === 'subscribe' && $hubVerifyToken === 'tspeech_token') {
        header('HTTP/1.1 200 OK');
        echo $hubChallenge;
        exit;
    } else {
        header('HTTP/1.1 403 Forbidden');
        exit;
    }
}

// ... (Other code to handle incoming messages and events from Facebook)
?>
