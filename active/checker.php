<?php
    
    $nome = (isset($_POST['param1'])) ? $_POST['param1'] : '';
        $email= (isset($_POST['param2'])) ? $_POST['param2'] : '';
        $lista = (isset($_POST['param3'])) ? $_POST['param3'] : '';

        $INTERESSE_QUIZ = (isset($_POST['param4'])) ? $_POST['param4'] : 'n\a';
        $FONTE_DE_RENDA = (isset($_POST['param5'])) ? $_POST['param5'] : 'n\a';
        $NEGATIVADO = (isset($_POST['param6'])) ? $_POST['param6'] : 'n\a';

        $key = "<token>";
        $url = "https://api.thechecker.co/v2/verify?email=".urlencode($email)."&api_key=".$key."";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );

        $response = curl_exec($ch);
        $obj = json_decode($response);
        if($obj->{'result'}!="deliverable"){
                echo "5";
                curl_close($ch);
                exit();
        }
        curl_close($ch);
        echo "OK";
        exit();

?> 
