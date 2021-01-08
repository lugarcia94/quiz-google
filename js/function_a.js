$(document).ready(function () {
    var traking = window.location.href;
    var pos = traking.indexOf('?');
    if (pos == -1) {
        $('#traking_id').val('');
    } else {
        traking = traking.substring(pos, traking.length);
        $('#traking_id').val(traking);
    }
    charge(1, 0);
});


function charge(question, resp) {
    var titulo = "Descubra qual é o cartão de crédito ideal para você";
    var subtitulo = "Responda às perguntas abaixo para que nossa tecnologia possa escolher o melhor cartão de crédito para você.";
    var total_questoes = "3";
    var questao_atual = "";

    var pergunta = "";
    var respostas = "";
    var percentual = "";
    var picture = document.getElementById('picture');
    $('#titulo_id').html(titulo);
    $('#subtitulo_id').html(subtitulo);
    $('#total_id').html(total_questoes);
    if (question == 1) {
        pergunta = "O que é mais importante para você?";
        picture.src = './img/card01.png';
        respostas = '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas" onclick="charge(2,1);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Interesse\', \'Limite de Crédito Alto\');"> Limite de Crédito Alto</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas" onclick="charge(2,2);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Interesse\', \'Sem anuidade\');"> Crédito imediato</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas" onclick="charge(2,3);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Interesse\', \'Milhas aéreas\');"> Sem consulta ao SPC/SERASA</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas" onclick="charge(2,4);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Interesse\', \'Limite de Crédito Alto\');"> Anuidade grátis</button>';
        questao_atual = 1;
    } else if (question == 2) {
        $('#resp_1').val(resp);
        pergunta = "Em qual grupo você se encaixa?";
        picture.src = './img/card02.png';
        fbq('track', 'Quiz Start no Altotietê');
        respostas = '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bg-primary text-white bordas"  onclick="charge(3,1);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Fonte de Renda\', \'Aposentado / Pensionista / Servidor Público\');">Aposentado / Pensionista / Servidor Público</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas"  onclick="charge(3,2);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Fonte de Renda\', \'Concurseiro / Estudante universitario\');">Concurseiro / Estudante universitario</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas"  onclick="charge(3,3);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Fonte de Renda\', \'Carteira assinada / Autonomo / Empreendedor\');">Carteira assinada / Autonomo / Empreendedor</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas"  onclick="charge(3,4);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Fonte de Renda\', \'Estou Desempregado\');">Estou Desempregado</button>';
        questao_atual = 2;
    } else if (question == 3) {
        $('#resp_2').val(resp);
        pergunta = "Você esta negativado?";
        picture.src = './img/card03.png';
        respostas = '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas" onclick="charge(4,1);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Negativado\', \'Sim\');">Sim</button>' + '<button class="btn btn-lg btn-block btn-outline-primary bg-primary text-white bordas" onclick="charge(4,2);ga(\'send\', \'event\', \'Quiz\', \'Quiz - Negativado\', \'Não\');">Não</button>';
        questao_atual = 3;
    } else if (question == 4) {
        picture.setAttribute('style', 'display: none');
        document.querySelector('footer').setAttribute('style', 'display: none; opacity: 0');
        $('#resp_3').val(resp);
        html = `<div class="modal-bg modal-fix">
              <div class="block-center bordas">
		<p id="ret_data" style="color:red;"></p>
                <img src="./img/JD-20-512.png" class="img-fluid" alt="">
                <h1 class="MyFont">Falta pouco!</h1>
                <p class="lead">Digite seus dados abaixo e receba o cartão perfeito para você.</p>
                <input type="text" class="form-control bordas" id="nome_send" aria-describedby="emailHelp"
                placeholder="Insira seu nome...">
                <input type="email" class="form-control bordas" id="email_send" aria-describedby="emailHelp"
                placeholder="Insira seu email...">
                <input type="checkbox" class="form-check-input" id="Check1_termos" checked style="display:none;">
                <div id="show-me"></div>
	         <button style="margin-bottom: 20px" onclick="send_info()" id="icone" class="btn btn-block btn-outline-primary bg-primary text-white bordas">VER MEU CARTÃO DE CRÉDITO</button>
                <label id="label_check" class="form-check-label" for="exampleCheck1">
                <a href="https://altotieteweb.com.br/politica-de-privacidade/" target="_blank"> Políticas de privacidade </a>
                </label>
              </div>
            </div>`;
        $('#maincontent_id').html(html);
        $('#go_id').hide();
    }
    if (question != 4) {
        percentual = (questao_atual / (total_questoes)) * 100;
        $('#progressbar_id').html('<div class="progress-bar" role="progressbar" style="width: ' + percentual + '%" aria-valuenow="' + percentual + '" aria-valuemin="0" aria-valuemax="100" ></div>');
        $('#questaoatual_id').html(questao_atual);
        $('#percentual_id').html(percentual);
        $('#pergunta_id').html(pergunta);
        $('#respostas_id').html(respostas);
    }
}
function limitSubmit() {
    var value = sessionStorage.getItem("Try");
    if (value == null) {
        sessionStorage.setItem("Try", 1);
    } else {
        var result = parseInt(value) + 1;
        sessionStorage.setItem("Try", result);
        if (result > 999)
            return true;
    }
    return false;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function send_info() {
    var resp1 = $('#resp_1').val();
    var resp2 = $('#resp_2').val();
    var resp3 = $('#resp_3').val();
    var user_id = getCookie('_ga');
    var q1 = ['Limite de Crédito Alto', 'Crédito imediato', 'Sem consulta ao SPC/SERASA', 'Anuidade grátis'];
    var q2 = ['Aposentado | Pensionista | Servidor Público', 'Concurseiro | Estudante universitario', 'Carteira assinada | Autonomo | Empreendedor', 'Estou Desempregado</button>'];
    var q3 = ['Sim', 'Não'];
    q1 = q1[(resp1 - 1)];
    q2 = q2[(resp2 - 1)];
    q3 = q3[(resp3 - 1)];
    if (limitSubmit()) {
        document.getElementById('icone').innerHTML = "VER MEU CARTÃO DE CRÉDITO";
        $('#show-me').hide();
        alert("Demasiada Requisicoes");
        return;
    }
    var showIcon = document.getElementById('show-me').innerHTML = ` 
    <div class="gira-gira">
      <div class="gira-closed"></div>
    </div>`;
    $('#show-me').show();
    var icone = document.getElementById('icone').innerHTML = "AGUARDE ENQUANTO PREPARAMOS SEU CARTÃO";
    var traking = $('#traking_id').val();
    // var link = 'https://altotieteweb.com.br/cartao-de-credito-banco-pan/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;

    if (resp1 == 1 && resp3 == 2) {
        link = 'https://altotieteweb.com.br/santander-sx-anuidade-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;
    }
    if (resp1 == 2 && resp3 == 2) {

        link = 'https://altotieteweb.com.br/santander-sx-anuidade-gratis/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;
    }
    if (resp1 == 4 && resp3 == 2) {
        link = 'https://altotieteweb.com.br/cartao-de-credito-banco-pan/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;
    }
    if (resp1 == 3) {
        link = 'https://altotieteweb.com.br/superdigital-nao-consulta-spc-serasa/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;
    }

    if ((resp3 == 1)) {
        link = 'https://altotieteweb.com.br/superdigital-nao-consulta-spc-serasa/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;
    }

    if ((resp2 == 1)) {
        link = 'https://altotieteweb.com.br/cartao-de-credito-consignado-bmg-card/?utm_source=google&utm_medium=cpc&utm_campaign=quiz' + traking;
    }

    var nome = $('#nome_send').val();
    var email = $('#email_send').val();
    var r = $('#listaactive_id').val();
    var lista = 10;
    if (r == 's') {
        lista = 3;
    }
    if (!$('#Check1_termos').is(":checked")) {
        // $("#Check1_termos").addClass("is-invalid");
        $('#label_check').html('Concorde com os termos e condições')
    } else if (email == '') {
        document.getElementById('icone').innerHTML = "VER MEU CARTÃO DE CRÉDITO";
        $('#show-me').hide();
        // $("#email_send").addClass("is-invalid");
    } else if (nome == '') {
        document.getElementById('icone').innerHTML = "VER MEU CARTÃO DE CRÉDITO";
        $('#show-me').hide();
        // $("#nome_send").addClass("is-invalid");
    } else {

        var domain = email.split("@");

        // if (domain[1] != "hotmail.com" && domain[1] != "aol.com" && domain[1] != "bol.com.br" && domain[1] != "gmail.com" && domain[1] != "yahoo.com") {
        //     document.getElementById('icone').innerHTML = "VER MEU CARTÃO DE CRÉDITO";
        //     $('#show-me').hide();
        //     $("#email_send").addClass("is-invalid");
        //     return;
        // }

        $.ajax({
            url: "active/checker.php",
            type: 'POST',
            data: {
                'param1': nome,
                'param2': email,
                'param3': lista,
                'param4': q1,
                'param5': q2,
                'param6': q3
            },
            dataType: 'html',
            beforeSend: function () {


            },
            success: function (retorno) {
                console.log(retorno)

                if (retorno == "5") {
                    //     $('#show-me').hide();
                    //     // $("#email_send").addClass("is-invalid");
                    //     document.getElementById('icone').innerHTML = "VER MEU CARTÃO DE CRÉDITO";
                    //     return;

                    fbq('track', 'Botão Quiz no Alto Tietê');
                    ga('send', 'event', 'Quiz', 'QuizLead', '');


                    window.location.href = link;
                } else {
                    fbq('track', 'Botão Quiz no Alto Tietê');
                    ga('send', 'event', 'Quiz', 'QuizLead', '');
                    $.ajax({
                        url: "active/examples.php",
                        type: 'POST',
                        data: {
                            'param1': nome,
                            'param2': email,
                            'param3': lista,
                            'param4': q1,
                            'param5': q2,
                            'param6': q3,
                            'param7': user_id,
                            'param8': gam_utmsource,
                            'param9': gam_utmmedium,
                            'param10': gam_utmcampaign
                        },
                        dataType: 'html'
                    });
                    window.location.href = link;
                }


            },
            error: function (erro, er) {
                $('#show-me').hide();
                // $("#email_send").addClass("is-invalid");
                document.getElementById('icone').innerHTML = "VER MEU CARTÃO DE CRÉDITO";
                $('#ret_data').html('<p class="destaque">Erro ' + erro.status + ' - ' + erro.statusText + '</br> Tipo de erro: ' + er + '</p>');
            }
        });
    }
}

