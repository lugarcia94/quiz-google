<?php
    
    $nome = (isset($_POST['param1'])) ? $_POST['param1'] : '';
        $email= (isset($_POST['param2'])) ? $_POST['param2'] : '';
        $lista = (isset($_POST['param3'])) ? $_POST['param3'] : '';

        $INTERESSE_QUIZ = (isset($_POST['param4'])) ? $_POST['param4'] : 'n\a';
        $FONTE_DE_RENDA = (isset($_POST['param5'])) ? $_POST['param5'] : 'n\a';
        $NEGATIVADO = (isset($_POST['param6'])) ? $_POST['param6'] : 'n\a';
        $USER_ID = (isset($_POST['param7'])) ? $_POST['param7'] : 'n\a';

	$CAMPAIGN = (isset($_POST['param10'])) ? $_POST['param10'] : 'n\a';
        $MEDIUM = (isset($_POST['param9'])) ? $_POST['param9'] : 'n\a';
        $SOURCE = (isset($_POST['param8'])) ? $_POST['param8'] : 'n\a';
        //id valido obrigatorio
        $lista = 2;


        require_once("includes/ActiveCampaign.class.php");
        // require_once("includes/config.php");


        $ac = new ActiveCampaign("https://gmalheros.api-us1.com", "17ece2c4f3f72cd1fe280b84d0e23ae1fd02637385658db3c46e7462562f22fa056830e0");
        

        if (!(int)$ac->credentials_test()) {
                echo "<p>Access denied: Invalid credentials (URL and/or API key).</p>";
                exit();
        }

        $contact = array(
                "email"                         => $email,
                "first_name"                    => $nome,
                "last_name"                     => "",
                "p[{$lista}]"                           => $lista,
                "status[{$lista}]"              => 1, // "Active" status
                'tags' => Array($INTERESSE_QUIZ,$FONTE_DE_RENDA, $NEGATIVADO, 'google'),
                // "field[%INTERESSE_QUIZ%,0]"     => $INTERESSE_QUIZ,
                // "field[%FONTE_DE_RENDA%,0]"     => $FONTE_DE_RENDA,
                // "field[%NEGATIVADO%,0]"         => $NEGATIVADO,
                // "field[%userId%,0]"         => $USER_ID,
		// "field[%MEDIUM%,0]"     => $MEDIUM,
                // "field[%KAMPANHA%,0]"         => $CAMPAIGN,
                // "field[%SOURCE%,0]"         => $SOURCE,

        );

        $contact_sync = $ac->api("contact/sync", $contact);
        $contact_sync = $ac->api("automation/contact/list?automation=3&offset=0&limit=50");

        if (!(int)$contact_sync->success) {
                // request failed
                echo "  <h1 class='MyFont'>Ops! nossos servidores não foram capazes de registrar seu Quiz</h1>";
                //echo "<p>Syncing contact failed. Error returned: " . $contact_sync->error . "</p>";
                exit();
        }

        // successful request
        $contact_id = (int)$contact_sync->subscriber_id;
        echo " <div class='row'><div class='col-md-12'><br><br> <h1 class='MyFont'>Obrigado por participar de nosso Quiz</h1></div></div>";
                //$go_to ="https://utua.com.br/category/cartao-de-credito/?nome=$nome&mail=$email";
                //header('Location: https://utua.com.br/category/cartao-de-credito/?nome=$nome&mail=$email');




?>

