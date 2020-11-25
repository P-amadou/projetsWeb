<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <title>Identification</title>
    <link rel="stylesheet" href=".\vue\CSS\ident.css">
    <link href=".\vue\CSS\accueil.css" rel="stylesheet">
    <link href=".\vue\CSS\animate.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src=".\vue\js\start.js"></script>
</head>

<body>
    <div id="titre">
        <h1>Cherchez <br/> le point wifi <br/></h1>
        <h3>le plus proche de vous</h3>
    </div>

    <div id="accueil" class="flipInX animated">
        <div id="presentation">
            <div class="content login">
                <div class="switch">
                    <span id='login'  class='active'>Connexion</span>
                </div>
                <form action="index.php?controle=utilisateur&action=ident" method="post">
                    <div class="input" placeholder='Username'><input name="login"  type="text"></div>
                    <div class="input" placeholder='Password'><input name="pass" type="password"></div>
                    <div id ="message"> 
                        <?php 
                        $o= "<p style='color : red;'> %s </p>";
                        printf($o,$msg);
                        ?>
                    </div> 
                    <button type ="submit">LOGIN</button>
                </form>
            </div>
        </div>
        
        <button type="submit" id="btnGo" >Let's go!</button>

    </div>

</body>

<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
    $('#etu').click(function(){
        $('.switch span').removeClass('active');
        $(this).addClass('active');

        $(this).parents('.content').removeClass('signup');
        $(this).parents('.content').addClass('login');

        $('form button').text('LOGIN')

    })
	$('#prof').click(function(){
        $('.switch span').removeClass('active');
        $(this).addClass('active');

        $(this).parents('.content').removeClass('signup');
        $(this).parents('.content').addClass('login');

        $('form button').text('LOGIN')

    })

    $('.input input').on('focus',function(){
        $(this).parent().addClass('focus');
    })

    $('.input input').on('blur',function(){
        if($(this).val() === '')
            $(this).parent().removeClass('focus');
    })
</script>
</html>


<!-- <body>
    <div class="container">
        <img src=".\vue\utilisateur\img\bc.png" alt="">
        <div class="panel">
            <div class="content login">
                <div class="switch">
                    <span id='login'  class='active'>Connexion</span>
                </div>
                <form action="index.php?controle=utilisateur&action=ident" method="post">
                    <div class="input" placeholder='Username'><input name="login"  type="text"></div>
                    <div class="input" placeholder='Password'><input name="pass" type="password"></div>
					<div id ="message"> 
						<?php 
						$o= "<p style='color : red;'> %s </p>";
						printf($o,$msg);
						?>
					</div> 
                    <button type ="submit">LOGIN</button>
                </form>
            </div>
        </div>
    </div>

</body> -->

</html>