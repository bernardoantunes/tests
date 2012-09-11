/*
*
*  AsDesigned (0.09) 		<http://#################.com/>
*  by Bernardo Antunes 		<http://bernardoantunes.com/>
*  licensed under MIT 		<http://opensource.org/licenses/mit-license.php>
*	
*/

        //
        // mediaRule: ex: "@media screen and (min-width: 8.0 em)"
        // factor: 1.0
        //
        function updateMediaRuleEmByFactor(mediaRule, factor) {

            //RegExp to obtain the value of the ems.
            var regExp = /(\d+(\.?\d+))(?=em)/ig;

            var result = mediaRule.replace(regExp, function (matchedValue) {
                return parseFloat(matchedValue) * factor;
            });

            return result;
        }

        //Updates All the media Em value by a factor.
        function updateMediaRulesEmByFactor(factor) {
            var styleSheets = document.styleSheets;
            var cssRules, cssRule, mediaRules, mediaRulesOriginalValues = null;
            //Vamos percorrer todos os styleSheets.
            for (i = 0; i < styleSheets.length; i++) {

                //Vamos obter a lista de CSSRules no StyleSheet em contexto.
                cssRules = document.styleSheets[i].cssRules;

                if(cssRules != null) {

                    //Vamos percorrer todos as cssRules.
                    for (j = 0; j < cssRules.length; j++) {
                        cssRule = cssRules[j];
                        //MediaList
                        mediaRules = cssRule.media;
                        //Apenas se for uma CSSMediaRule.
                        if (mediaRules != undefined) {
                            mediaRulesOriginalValues = mediaRules.originalValues;

                            //Se ainda nao tivermos guardado os valores originais, vamos guarda-los.
                            if (mediaRulesOriginalValues == undefined) {

                                //Vamos criar um array para guardar os valores.
                                mediaRulesOriginalValues = new Array();

                                //Vamos fazer uma copia dos valores originais.
                                for (l = 0; l < mediaRules.length; l++) {
                                    //Esta manhozisse e por causa do IE que obriga a utilizacao da funcao item para obter o elemento.
                                    mediaRulesOriginalValues.push(mediaRules[l] != undefined ? mediaRules[l] : mediaRules.item(l));
                                }

                                //Vamos os valores originais na lista de MediaRules.
                                mediaRules.originalValues = mediaRulesOriginalValues;
                            }

                            //Vamos percorrer a lista de MediaRules.
                            for (k = 0; k < mediaRules.length; k++) {
                                var newMediaRule = updateMediaRuleEmByFactor(mediaRulesOriginalValues[k], factor);
                                //Only update if the rule changed something.
                                if (mediaRulesOriginalValues[k] != newMediaRule) {
                                    mediaRules.appendMedium(newMediaRule);
                                    //Esta manhozisse e por causa do IE que obriga a utilizacao da funcao item para obter o elemento.
                                    mediaRules.deleteMedium(mediaRules[l] != undefined ? mediaRules[0] : mediaRules.item(0));
                                }
                            }

                            //DELETE AFTER TEST
                            //Vamos percorrer a lista de MediaRules.
                            //for (k = 0; k < mediaRules.length; k++)
                            //    document.write(cssRule.media[k] + '</br>');

                        }
                    }
                }
            }
        }

        if($.cookie('asDesignedCookie') === null)
        {
        	//alert('null');
        	$.cookie('asDesignedCookie', 'You need glasses!', { expires: 9999, path: '/' });
        }
        else
        {
        	//alert($.cookie('asDesignedCookie'));
        }


	//var screenWidth = screen.width;
	//var screenHeight = screen.height;
	//var screenDiagonal = Math.sqrt(Math.pow(screen.width, 2) + Math.pow(screen.height, 2));

	//$('#screen-width').val(screenWidth.toString());
	//$('#screen-height').val(screenHeight.toString());
	//$('#screen-diagonal').val(screenDiagonal.toString());

	//User Input
    //$('#screen-size-diagonal').val(15.4);
	//$('#screen-size-diagonal').val(3.5);

	//var screenDefinition = screenDiagonal / parseFloat($('#screen-size-diagonal').val());

	//$('#screen-definition').val(screenDefinition);

	//Now lets calculate the author/user ratio

	//var authorScreenDefinition = parseFloat($('#author-screen-definition').val());
	//var screenDefinitionRatio = screenDefinition / authorScreenDefinition;

	//$('#screen-definition-ratio').val(screenDefinitionRatio);

	//$('html').css('font-size', screenDefinitionRatio.toString() + 'em');
	//$('#asDesigned').css('font-size', screenDefinitionRatio.toString() + 'em');

	//updateMediaRulesEmByFactor(screenDefinitionRatio);
