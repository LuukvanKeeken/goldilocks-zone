
class MainScene extends Phaser.Scene{
    constructor(){
        super({key: 'MainScene'});
    }

    preload(){
        var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
        this.load.plugin('rexsliderplugin', url, true);
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/white-dot.png';      
        this.load.image('dot', url);
        this.load.image('background', './media/space_background.jpg');
        this.load.image('resetSS', './media/set_to_solar_system.png');
        this.load.image('question', './media/question_mark.png');
        this.load.image('types_of_stars', './media/types_of_stars.png');
        this.load.image('sources', './media/sources.png');
        this.load.image('sources_button', './media/sources_button.png');
        this.load.image('received_power', './media/received_power.png');
        this.load.image('habitable_zone', './media/habitable_zone.png');
        this.load.image('effective_temperature', './media/effective_temperature.png');
        this.load.image('distance_and_eccentricity', './media/distance_and_eccentricity.png');
        this.time.advancedTiming = true;
    }

    create(){
        this.add.image(900, 100, 'background');

        /* Circles representing the Sun and its atmosphere. */
        gameState.bodies.starAtm1 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 35*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm1.alpha = 0.3;
        gameState.bodies.starAtm3 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 37.5*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm3.alpha = 0.25;
        gameState.bodies.starAtm2 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 40*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm2.alpha = 0.2;
        gameState.bodies.star = this.add.circle(window.innerWidth/2, window.innerHeight/2, 30*gameState.heightFactor, 0xfcd440);


        /* Orbit line of the planet. */
        gameState.bodies.orbit = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 300*gameState.heightFactor, 300*gameState.heightFactor);
        gameState.bodies.orbit.setStrokeStyle(3, 0xffffff, 0.8);

        /* Circle representing the planet. */
        gameState.bodies.planet = this.add.circle(500, 500, 10*gameState.heightFactor, 0xffffff);

        /* Ellipse representing the habitable zone. */
        gameState.bodies.glz = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 2*gameState.maxAllowedRadius*gameState.heightFactor, 2*gameState.maxAllowedRadius*gameState.heightFactor);
        gameState.bodies.glz.setStrokeStyle(20, 0x00ff00, 0.3);



        /* Create slider and text for changing the radius of the orbit. */
        gameState.bodies.sliders2 = this.add.image(window.innerWidth*0.275, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        let font = 20*gameState.heightFactor;
        font = font.toString();
        var orbitRadiusText = this.add.text(gameState.bodies.sliders2.x, gameState.bodies.sliders2.y + 20, 'Orbit radius: 3.750 AU', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(orbitRadiusText, window.innerWidth*0.275);
        gameState.bodies.sliders2.sliderRadius = this.plugins.get('rexsliderplugin').add(gameState.bodies.sliders2, {
            endPoints: [{
                    x: gameState.bodies.sliders2.x - 100,
                    y: gameState.bodies.sliders2.y
                },
                {
                    x: gameState.bodies.sliders2.x + 100,
                    y: gameState.bodies.sliders2.y
                }
            ],
            value: 0.0835435217
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(gameState.bodies.sliders2.sliderRadius.endPoints);

        /* Create slider and text for the eccentricity. */
        gameState.bodies.sliders = this.add.image(window.innerWidth*0.485, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        var eccText = this.add.text(gameState.bodies.sliders.x, gameState.bodies.sliders.y + 20, 'Eccentricity: 0', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(eccText, window.innerWidth*0.485);
        gameState.bodies.sliders.sliderEcc = this.plugins.get('rexsliderplugin').add(gameState.bodies.sliders, {
            endPoints: [{
                    x: gameState.bodies.sliders.x - 100,
                    y: gameState.bodies.sliders.y
                },
                {
                    x: gameState.bodies.sliders.x + 100,
                    y: gameState.bodies.sliders.y
                }
            ],
            value: 0
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(gameState.bodies.sliders.sliderEcc.endPoints);

        /* Create slider and text for the temperature/spectral class. */
        gameState.bodies.sliders3 = this.add.image(window.innerWidth*0.69, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        var tempText = this.add.text(gameState.bodies.sliders3.x, gameState.bodies.sliders3.y + 20, 'Star temperature: ' + gameState.temperature + ' K (class ' + gameState.class + ')', {
            fontSize: font + 'px',
            fill: '#fcd440',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(tempText, window.innerWidth*0.69);
        gameState.bodies.sliders3.sliderTemp = this.plugins.get('rexsliderplugin').add(gameState.bodies.sliders3, {
            endPoints: [{
                    x: gameState.bodies.sliders3.x - 100,
                    y: gameState.bodies.sliders3.y
                },
                {
                    x: gameState.bodies.sliders3.x + 100,
                    y: gameState.bodies.sliders3.y
                }
            ],
            value: 0.0898404255
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(gameState.bodies.sliders3.sliderTemp.endPoints);

        
        /* Create slider and text for the speed percentage. */
        gameState.bodies.sliders4 = this.add.image(window.innerWidth*0.9, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        var speedText = this.add.text(gameState.bodies.sliders4.x, gameState.bodies.sliders4.y + 20, 'Speed: 100%', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(speedText, window.innerWidth*0.9);
        gameState.bodies.sliders4.sliderSpeed = this.plugins.get('rexsliderplugin').add(gameState.bodies.sliders4, {
            endPoints: [{
                    x: gameState.bodies.sliders4.x - 100,
                    y: gameState.bodies.sliders4.y
                },
                {
                    x: gameState.bodies.sliders4.x + 100,
                    y: gameState.bodies.sliders4.y
                }
            ],
            value: 1
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(gameState.bodies.sliders4.sliderSpeed.endPoints);


        /* Function that resets the values of the sliders such that they
            represent the actual values for Earth's orbit, and the temperature
            of the Sun. */
        var resetToEarthAndSun = function(){
            gameState.bodies.sliders.sliderEcc.setValue(0.017);
            gameState.bodies.sliders2.sliderRadius.setValue(0.018745161);
            gameState.bodies.sliders3.sliderTemp.setValue(0.0898404255);
        };

        /* Function that calculates how many pixels (?) are needed for a certain distance in AU. */
        var calculatePixels = function(distanceInAU){
            return (distanceInAU*((gameState.maxAllowedRadius*gameState.heightFactor)/8.75));            
        }

        /* Function that adjusts the radius of the orbit based on a slider value between 0 and 1. */
        var adjustRadius = function(newValue){
            newValue *= 0.75;
            var newRadius = calculatePixels(gameState.maxRadiusProp*(56.5860829*newValue + 0.2044495167));
            
            orbitRadiusText.text = 'Semi-minor axis: ' + (gameState.maxRadiusProp*(56.5870829*newValue + 0.2044495167)).toFixed(3) + ' AU';
            
            centerText(orbitRadiusText, window.innerWidth*0.275);
            gameState.radiusMin = newRadius;
            gameState.radiusMaj = Math.sqrt(gameState.radiusMin**2/(1 - gameState.eccentricity**2));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);

            /* If the eccentricity is higher than 0, the orbit should be shifted.
             * Normal equation is shift = 0.5*a*c, but gameState.radiusMaj already
             * is 0.5*a. */
            gameState.shift = gameState.radiusMaj*gameState.eccentricity;
            gameState.bodies.orbit.x = gameState.bodies.star.x + gameState.shift;
        }
        
        adjustRadius(0.0835435217);

        /* When the user sets a new value for the orbital radius, the distance
         * of the planet to the star should change, as well as the radius of 
         * the ellipse representing the orbit. When the orbit is larger, the
         * speed at which the planet moves should be lower, so the gameState.factor
         * is also adjusted. */
        gameState.bodies.sliders2.sliderRadius.on('valuechange', function(newValue, prevValue){
            adjustRadius(newValue);
        });

        /* When the user sets a new value for the eccentricity, the eccentricity
         * of the planet's orbit should change, as well as the eccentricity of
         * the white ellipse. The text under the slider is also updated. */
        gameState.bodies.sliders.sliderEcc.on('valuechange', function(newValue, prevValue){
            newValue = newValue*0.999;
            newValue = Math.round(newValue*1000)/1000;
            eccText.text = 'Eccentricity: ' + newValue;
            centerText(eccText, window.innerWidth*0.485);
            gameState.eccentricity = newValue;

            gameState.radiusMaj = Math.sqrt(Math.pow(gameState.radiusMin, 2)/(1 - Math.pow(gameState.eccentricity, 2)));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);

            /* If the eccentricity is higher than 0, the orbit should be shifted.
             * Normal equation is shift = 0.5*a*c, but gameState.radiusMaj already
             * is 0.5*a. */
            gameState.shift = gameState.radiusMaj*gameState.eccentricity;
            gameState.bodies.orbit.x = gameState.bodies.star.x + gameState.shift;
        });

        /* Function that adjusts the color of the star and its atmosphere. */
        var recolorStar = function(newColor){
            gameState.bodies.star.fillColor = newColor;
            gameState.bodies.starAtm1.fillColor = newColor;
            gameState.bodies.starAtm3.fillColor = newColor;
            gameState.bodies.starAtm2.fillColor = newColor;
        };

        /* Function that changes the text below the star temperature slider,
            adjusts the color, and calculates the new size and position of
            the habitable zone. */
        var changeStarAndHabZone = function(newValue){
            gameState.temperature = Math.floor(newValue*37600) + 2400;

            if (gameState.temperature >= 2400 && gameState.temperature < 3500){
                gameState.class = 'M';
                tempText.style.color = '#ff4000';
                recolorStar(0xff4000);
            } else if (gameState.temperature >= 3500 && gameState.temperature < 5000){
                gameState.class = 'K';
                tempText.style.color = '#ff9100';
                recolorStar(0xff9100);
            } else if (gameState.temperature >= 5000 && gameState.temperature < 6000){
                gameState.class = 'G';
                tempText.style.color = '#fcd440';
                recolorStar(0xfcd440);
            } else if (gameState.temperature >= 6000 && gameState.temperature < 7500){
                gameState.class = 'F';
                tempText.style.color = '#ffeba3';
                recolorStar(0xffeba3);
            } else if (gameState.temperature >= 7500 && gameState.temperature < 10000){
                gameState.class = 'A';
                tempText.style.color = '#cfefff';
                recolorStar(0xcfefff);
            } else if (gameState.temperature >= 10000 && gameState.temperature < 30000){
                gameState.class = 'B';
                tempText.style.color = '#8cd9ff';
                recolorStar(0x8cd9ff);
            } else if (gameState.temperature >= 30000 && gameState.temperature < 40000){
                gameState.class = 'O';
                tempText.style.color = '#0099ff';
                recolorStar(0x0099ff);
            }
            gameState.temperature = newValue*37600 + 2400;
            var innerLimit = 696340*Math.pow(10, 3)*Math.sqrt(5.67*Math.pow(10, -8))*Math.sqrt(Math.pow(gameState.temperature, 4))/Math.sqrt(1455.26)/((1.49597871*Math.pow(10, 11)));
            var outerLimit = 696340*Math.pow(10, 3)*Math.sqrt(5.67*Math.pow(10, -8))*Math.sqrt(Math.pow(gameState.temperature, 4))/Math.sqrt(698.6)/((1.49597871*Math.pow(10, 11)));
            var averageDist = (innerLimit+outerLimit)/2;
            var difference = outerLimit-innerLimit;

            var habZoneRad = calculatePixels(averageDist);
            gameState.bodies.glz.setSize(2*habZoneRad, 2*habZoneRad);
            gameState.bodies.glz.setStrokeStyle(calculatePixels(difference), 0x00ff00, 0.3);


            tempText.text = 'Star temperature: ' + gameState.temperature.toFixed(0) + ' K (class ' + gameState.class + ')';
            centerText(tempText, window.innerWidth*0.69);
        };

        changeStarAndHabZone(0.0898404255);

        /* Listener for the star temperature slider. */
        gameState.bodies.sliders3.sliderTemp.on('valuechange', function(newValue, prevValue){
            changeStarAndHabZone(newValue);
        });

        /* Listener for the speed percentage slider. */
        gameState.bodies.sliders4.sliderSpeed.on('valuechange', function(newValue, prevValue){
            gameState.speedProp = newValue;
            speedText.text = 'Speed: ' + (100*newValue).toFixed(0) + '%';
            centerText(speedText, window.innerWidth*0.9);
        });


        /* Reset button. ----------------------------------------------------------------------------------------------*/
        gameState.buttons.resetSS = this.add.image(window.innerWidth*0.125, window.innerHeight - 100*gameState.heightFactor, 'resetSS').setInteractive();
        gameState.buttons.resetSS.setScale(0.644*gameState.heightFactor);
        gameState.buttons.resetSSOutline = this.add.rectangle(gameState.buttons.resetSS.x, gameState.buttons.resetSS.y, gameState.buttons.resetSS.width, gameState.buttons.resetSS.height);
        gameState.buttons.resetSSOutline.setScale(0.644*gameState.heightFactor);
        gameState.buttons.resetSSOutline.setStrokeStyle(10, 0x000000);

        gameState.buttons.resetSS.on('pointerover', function(){
            gameState.buttons.resetSSOutline.setStrokeStyle(10, 0xffffff);
        });
        gameState.buttons.resetSS.on('pointerout', function(){
            gameState.buttons.resetSSOutline.setStrokeStyle(10, 0x000000);
        });
        gameState.buttons.resetSS.on('pointerdown', function(){
            resetToEarthAndSun();
        });
        

        /* Distance and eccentricity button and text. -----------------------------------------------------------------*/
        gameState.explanationTexts.distance_and_eccentricity = this.add.image(window.innerWidth/2, window.innerHeight/2, 'distance_and_eccentricity').setScale(0.7*gameState.heightFactor).setOrigin(0.5).setVisible(false).setInteractive();
        gameState.explanationTexts.distance_and_eccentricity_outline = this.add.rectangle(gameState.explanationTexts.distance_and_eccentricity.x, gameState.explanationTexts.distance_and_eccentricity.y, gameState.explanationTexts.distance_and_eccentricity.width, gameState.explanationTexts.distance_and_eccentricity.height);
        gameState.explanationTexts.distance_and_eccentricity_outline.setScale(0.7*gameState.heightFactor).setStrokeStyle(10, 0x000000).setVisible(false);

        gameState.explanationTexts.distance_and_eccentricity.on('pointerover', function(){
            gameState.explanationTexts.distance_and_eccentricity_outline.setStrokeStyle(10, 0xffffff);
        });
        gameState.explanationTexts.distance_and_eccentricity.on('pointerout', function(){
            gameState.explanationTexts.distance_and_eccentricity_outline.setStrokeStyle(10, 0x000000);
        });
        gameState.explanationTexts.distance_and_eccentricity.on('pointerdown', function(){
            gameState.explanationTexts.distance_and_eccentricity.setVisible(!gameState.explanationTexts.distance_and_eccentricity._visible);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(!gameState.explanationTexts.distance_and_eccentricity_outline._visible);
        });
        
        gameState.buttons.questionMark1 = this.add.image(window.innerWidth*0.38, window.innerHeight - 150*gameState.heightFactor, 'question').setScale(0.0644*gameState.heightFactor).setAlpha(0.75).setInteractive();
        gameState.buttons.questionMark1.on('pointerover', function(){
            gameState.buttons.questionMark1.setAlpha(1);
            gameState.buttons.questionMark1.setScale(0.065688*gameState.heightFactor);
        });
        gameState.buttons.questionMark1.on('pointerout', function(){
            gameState.buttons.questionMark1.setAlpha(0.75);
            gameState.buttons.questionMark1.setScale(0.0644*gameState.heightFactor);
        });
        gameState.buttons.questionMark1.on('pointerdown', function(){
            gameState.explanationTexts.effective_temperature.setVisible(false);
            gameState.explanationTexts.effective_temperature_outline.setVisible(false);
            gameState.explanationTexts.habitable_zone.setVisible(false);
            gameState.explanationTexts.habitable_zone_outline.setVisible(false);
            gameState.explanationTexts.received_power.setVisible(false);
            gameState.explanationTexts.received_power_outline.setVisible(false);
            gameState.explanationTexts.sources.setVisible(false);
            gameState.explanationTexts.sources_outline.setVisible(false);
            gameState.explanationTexts.types_of_stars.setVisible(false);
            gameState.explanationTexts.types_of_stars_outline.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity.setVisible(!gameState.explanationTexts.distance_and_eccentricity._visible);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(!gameState.explanationTexts.distance_and_eccentricity_outline._visible);
        });


        /* Types of stars button and text. ----------------------------------------------------------------------------------------*/
        gameState.explanationTexts.types_of_stars = this.add.image(window.innerWidth/2, window.innerHeight/2, 'types_of_stars').setScale(0.7*gameState.heightFactor).setOrigin(0.5).setVisible(false).setInteractive();
        gameState.explanationTexts.types_of_stars_outline = this.add.rectangle(gameState.explanationTexts.types_of_stars.x, gameState.explanationTexts.types_of_stars.y, gameState.explanationTexts.types_of_stars.width, gameState.explanationTexts.types_of_stars.height);
        gameState.explanationTexts.types_of_stars_outline.setScale(0.7*gameState.heightFactor).setStrokeStyle(10, 0x000000).setVisible(false);

        gameState.explanationTexts.types_of_stars.on('pointerover', function(){
            gameState.explanationTexts.types_of_stars_outline.setStrokeStyle(10, 0xffffff);
        });
        gameState.explanationTexts.types_of_stars.on('pointerout', function(){
            gameState.explanationTexts.types_of_stars_outline.setStrokeStyle(10, 0x000000);
        });
        gameState.explanationTexts.types_of_stars.on('pointerdown', function(){
            gameState.explanationTexts.types_of_stars.setVisible(!gameState.explanationTexts.types_of_stars._visible);
            gameState.explanationTexts.types_of_stars_outline.setVisible(!gameState.explanationTexts.types_of_stars_outline._visible);
        });

        gameState.buttons.questionMark2 = this.add.image(window.innerWidth*0.69, window.innerHeight - 150*gameState.heightFactor, 'question').setScale(0.0644*gameState.heightFactor).setAlpha(0.75).setInteractive();
        gameState.buttons.questionMark2.on('pointerover', function(){
            gameState.buttons.questionMark2.setAlpha(1);
            gameState.buttons.questionMark2.setScale(0.065688*gameState.heightFactor);
        });
        gameState.buttons.questionMark2.on('pointerout', function(){
            gameState.buttons.questionMark2.setAlpha(0.75);
            gameState.buttons.questionMark2.setScale(0.0644*gameState.heightFactor);
        });
        gameState.buttons.questionMark2.on('pointerdown', function(){
            gameState.explanationTexts.effective_temperature.setVisible(false);
            gameState.explanationTexts.effective_temperature_outline.setVisible(false);
            gameState.explanationTexts.habitable_zone.setVisible(false);
            gameState.explanationTexts.habitable_zone_outline.setVisible(false);
            gameState.explanationTexts.received_power.setVisible(false);
            gameState.explanationTexts.received_power_outline.setVisible(false);
            gameState.explanationTexts.sources.setVisible(false);
            gameState.explanationTexts.sources_outline.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(false);
            gameState.explanationTexts.types_of_stars.setVisible(!gameState.explanationTexts.types_of_stars._visible);
            gameState.explanationTexts.types_of_stars_outline.setVisible(!gameState.explanationTexts.types_of_stars_outline._visible);
        });


        /* Sources button and text. -------------------------------------------------------------------------------------------------*/
        gameState.explanationTexts.sources = this.add.image(window.innerWidth/2, window.innerHeight/2, 'sources').setScale(0.9*gameState.heightFactor).setOrigin(0.5).setVisible(false).setInteractive();
        gameState.explanationTexts.sources_outline = this.add.rectangle(gameState.explanationTexts.sources.x, gameState.explanationTexts.sources.y, gameState.explanationTexts.sources.width, gameState.explanationTexts.sources.height);
        gameState.explanationTexts.sources_outline.setScale(0.9*gameState.heightFactor).setStrokeStyle(10, 0x000000).setVisible(false);

        gameState.explanationTexts.sources.on('pointerover', function(){
            gameState.explanationTexts.sources_outline.setStrokeStyle(10, 0xffffff);
        });
        gameState.explanationTexts.sources.on('pointerout', function(){
            gameState.explanationTexts.sources_outline.setStrokeStyle(10, 0x000000);
        });
        gameState.explanationTexts.sources.on('pointerdown', function(){
            gameState.explanationTexts.sources.setVisible(!gameState.explanationTexts.sources._visible);
            gameState.explanationTexts.sources_outline.setVisible(!gameState.explanationTexts.sources_outline._visible);
        });

        gameState.buttons.sources_button = this.add.image(window.innerWidth*0.05, window.innerHeight - 100*gameState.heightFactor, 'sources_button').setInteractive();
        gameState.buttons.sources_button.setScale(1.15*gameState.heightFactor);
        gameState.buttons.sources_buttonOutline = this.add.rectangle(gameState.buttons.sources_button.x, gameState.buttons.sources_button.y, gameState.buttons.sources_button.width, gameState.buttons.sources_button.height);
        gameState.buttons.sources_buttonOutline.setScale(1.15*gameState.heightFactor);
        gameState.buttons.sources_buttonOutline.setStrokeStyle(4, 0x000000);

        gameState.buttons.sources_button.on('pointerover', function(){
            gameState.buttons.sources_buttonOutline.setStrokeStyle(4, 0xffffff);
        });
        gameState.buttons.sources_button.on('pointerout', function(){
            gameState.buttons.sources_buttonOutline.setStrokeStyle(4, 0x000000);
        });
        gameState.buttons.sources_button.on('pointerdown', function(){
            gameState.explanationTexts.effective_temperature.setVisible(false);
            gameState.explanationTexts.effective_temperature_outline.setVisible(false);
            gameState.explanationTexts.habitable_zone.setVisible(false);
            gameState.explanationTexts.habitable_zone_outline.setVisible(false);
            gameState.explanationTexts.received_power.setVisible(false);
            gameState.explanationTexts.received_power_outline.setVisible(false);
            gameState.explanationTexts.types_of_stars.setVisible(false);
            gameState.explanationTexts.types_of_stars_outline.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(false);
            gameState.explanationTexts.sources.setVisible(!gameState.explanationTexts.sources._visible);
            gameState.explanationTexts.sources_outline.setVisible(!gameState.explanationTexts.sources_outline._visible);
        });


        /* Received power button and text. ----------------------------------------------------------------------------------------------*/
        gameState.explanationTexts.received_power = this.add.image(window.innerWidth/2, window.innerHeight/2, 'received_power').setScale(0.8*gameState.heightFactor).setOrigin(0.5).setVisible(false).setInteractive();
        gameState.explanationTexts.received_power_outline = this.add.rectangle(gameState.explanationTexts.received_power.x, gameState.explanationTexts.received_power.y, gameState.explanationTexts.received_power.width, gameState.explanationTexts.received_power.height);
        gameState.explanationTexts.received_power_outline.setScale(0.8*gameState.heightFactor).setStrokeStyle(10, 0x000000).setVisible(false);

        gameState.explanationTexts.received_power.on('pointerover', function(){
            gameState.explanationTexts.received_power_outline.setStrokeStyle(10, 0xffffff);
        });
        gameState.explanationTexts.received_power.on('pointerout', function(){
            gameState.explanationTexts.received_power_outline.setStrokeStyle(10, 0x000000);
        });
        gameState.explanationTexts.received_power.on('pointerdown', function(){
            gameState.explanationTexts.received_power.setVisible(!gameState.explanationTexts.received_power._visible);
            gameState.explanationTexts.received_power_outline.setVisible(!gameState.explanationTexts.received_power_outline._visible);
        });

        gameState.buttons.questionMark3 = this.add.image(window.innerWidth*0.63, 120*gameState.heightFactor, 'question').setScale(0.0644*gameState.heightFactor).setAlpha(0.75).setInteractive();
        gameState.buttons.questionMark3.on('pointerover', function(){
            gameState.buttons.questionMark3.setAlpha(1);
            gameState.buttons.questionMark3.setScale(0.065688*gameState.heightFactor);
        });
        gameState.buttons.questionMark3.on('pointerout', function(){
            gameState.buttons.questionMark3.setAlpha(0.75);
            gameState.buttons.questionMark3.setScale(0.0644*gameState.heightFactor);
        });
        gameState.buttons.questionMark3.on('pointerdown', function(){
            gameState.explanationTexts.effective_temperature.setVisible(false);
            gameState.explanationTexts.effective_temperature_outline.setVisible(false);
            gameState.explanationTexts.habitable_zone.setVisible(false);
            gameState.explanationTexts.habitable_zone_outline.setVisible(false);
            gameState.explanationTexts.sources.setVisible(false);
            gameState.explanationTexts.sources_outline.setVisible(false);
            gameState.explanationTexts.types_of_stars.setVisible(false);
            gameState.explanationTexts.types_of_stars_outline.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(false);
            gameState.explanationTexts.received_power.setVisible(!gameState.explanationTexts.received_power._visible);
            gameState.explanationTexts.received_power_outline.setVisible(!gameState.explanationTexts.received_power_outline._visible);
        });


        /* Habitable zone button and text. --------------------------------------------------------------------------------------*/
        gameState.explanationTexts.habitable_zone = this.add.image(window.innerWidth/2, window.innerHeight/2, 'habitable_zone').setScale(0.7*gameState.heightFactor).setOrigin(0.5).setVisible(false).setInteractive();
        gameState.explanationTexts.habitable_zone_outline = this.add.rectangle(gameState.explanationTexts.habitable_zone.x, gameState.explanationTexts.habitable_zone.y, gameState.explanationTexts.habitable_zone.width, gameState.explanationTexts.habitable_zone.height);
        gameState.explanationTexts.habitable_zone_outline.setScale(0.7*gameState.heightFactor).setStrokeStyle(10, 0x000000).setVisible(false);

        gameState.explanationTexts.habitable_zone.on('pointerover', function(){
            gameState.explanationTexts.habitable_zone_outline.setStrokeStyle(10, 0xffffff);
        });
        gameState.explanationTexts.habitable_zone.on('pointerout', function(){
            gameState.explanationTexts.habitable_zone_outline.setStrokeStyle(10, 0x000000);
        });
        gameState.explanationTexts.habitable_zone.on('pointerdown', function(){
            gameState.explanationTexts.habitable_zone.setVisible(!gameState.explanationTexts.habitable_zone._visible);
            gameState.explanationTexts.habitable_zone_outline.setVisible(!gameState.explanationTexts.habitable_zone_outline._visible);
        });

        gameState.buttons.questionMark4 = this.add.image(window.innerWidth*0.36, 120*gameState.heightFactor, 'question').setScale(0.0644*gameState.heightFactor).setAlpha(0.75).setInteractive();
        gameState.buttons.questionMark4.on('pointerover', function(){
            gameState.buttons.questionMark4.setAlpha(1);
            gameState.buttons.questionMark4.setScale(0.065688*gameState.heightFactor);
        });
        gameState.buttons.questionMark4.on('pointerout', function(){
            gameState.buttons.questionMark4.setAlpha(0.75);
            gameState.buttons.questionMark4.setScale(0.0644*gameState.heightFactor);
        });
        gameState.buttons.questionMark4.on('pointerdown', function(){
            gameState.explanationTexts.effective_temperature.setVisible(false);
            gameState.explanationTexts.effective_temperature_outline.setVisible(false);
            gameState.explanationTexts.received_power.setVisible(false);
            gameState.explanationTexts.received_power_outline.setVisible(false);
            gameState.explanationTexts.sources.setVisible(false);
            gameState.explanationTexts.sources_outline.setVisible(false);
            gameState.explanationTexts.types_of_stars.setVisible(false);
            gameState.explanationTexts.types_of_stars_outline.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(false);
            gameState.explanationTexts.habitable_zone.setVisible(!gameState.explanationTexts.habitable_zone._visible);
            gameState.explanationTexts.habitable_zone_outline.setVisible(!gameState.explanationTexts.habitable_zone_outline._visible);
        });



        /* Effective temperature button and text. --------------------------------------------------------------------------------*/
        gameState.explanationTexts.effective_temperature = this.add.image(window.innerWidth/2, window.innerHeight/2, 'effective_temperature').setScale(0.8*gameState.heightFactor).setOrigin(0.5).setVisible(false).setInteractive();
        gameState.explanationTexts.effective_temperature_outline = this.add.rectangle(gameState.explanationTexts.effective_temperature.x, gameState.explanationTexts.effective_temperature.y, gameState.explanationTexts.effective_temperature.width, gameState.explanationTexts.effective_temperature.height);
        gameState.explanationTexts.effective_temperature_outline.setScale(0.8*gameState.heightFactor).setStrokeStyle(10, 0x000000).setVisible(false);

        gameState.explanationTexts.effective_temperature.on('pointerover', function(){
            gameState.explanationTexts.effective_temperature_outline.setStrokeStyle(10, 0xffffff);
        });
        gameState.explanationTexts.effective_temperature.on('pointerout', function(){
            gameState.explanationTexts.effective_temperature_outline.setStrokeStyle(10, 0x000000);
        });
        gameState.explanationTexts.effective_temperature.on('pointerdown', function(){
            gameState.explanationTexts.effective_temperature.setVisible(!gameState.explanationTexts.effective_temperature._visible);
            gameState.explanationTexts.effective_temperature_outline.setVisible(!gameState.explanationTexts.effective_temperature_outline._visible);
        });

        gameState.buttons.questionMark5 = this.add.image(window.innerWidth*0.865, 120*gameState.heightFactor, 'question').setScale(0.0644*gameState.heightFactor).setAlpha(0.75).setInteractive();
        gameState.buttons.questionMark5.on('pointerover', function(){
            gameState.buttons.questionMark5.setAlpha(1);
            gameState.buttons.questionMark5.setScale(0.065688*gameState.heightFactor);
        });
        gameState.buttons.questionMark5.on('pointerout', function(){
            gameState.buttons.questionMark5.setAlpha(0.75);
            gameState.buttons.questionMark5.setScale(0.0644*gameState.heightFactor);
        });
        gameState.buttons.questionMark5.on('pointerdown', function(){
            gameState.explanationTexts.habitable_zone.setVisible(false);
            gameState.explanationTexts.habitable_zone_outline.setVisible(false);
            gameState.explanationTexts.received_power.setVisible(false);
            gameState.explanationTexts.received_power_outline.setVisible(false);
            gameState.explanationTexts.sources.setVisible(false);
            gameState.explanationTexts.sources_outline.setVisible(false);
            gameState.explanationTexts.types_of_stars.setVisible(false);
            gameState.explanationTexts.types_of_stars_outline.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity.setVisible(false);
            gameState.explanationTexts.distance_and_eccentricity_outline.setVisible(false);
            gameState.explanationTexts.effective_temperature.setVisible(!gameState.explanationTexts.effective_temperature._visible);
            gameState.explanationTexts.effective_temperature_outline.setVisible(!gameState.explanationTexts.effective_temperature_outline._visible);
        });


        /* Information texts. */
        gameState.currentDistanceText = this.add.text(window.innerWidth*0.1, 50*gameState.heightFactor, 'Current distance: ', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });

        gameState.innerBoundText = this.add.text(window.innerWidth*0.33333, 50*gameState.heightFactor, 'Inner limit: ', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });

        gameState.outerBoundText = this.add.text(window.innerWidth*0.5, 50*gameState.heightFactor, 'Outer limit: ', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });

        gameState.receivedPowerText = this.add.text(window.innerWidth*0.66667, 50*gameState.heightFactor, 'Received power: ', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });

        gameState.planetTempText = this.add.text(window.innerWidth*0.83333, 50*gameState.heightFactor, 'Effective temperature: ', {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });



    }

    update(){
        /* Velocity is increased proportionally to how close the planet is to the star.
         * The multiplication factor is 1 when the distance is equal to the length of
         * the minor axis radius (not diameter). */
        gameState.distanceToStar = Math.sqrt((gameState.bodies.planet.x- gameState.bodies.star.x)**2 
            + (gameState.bodies.planet.y - gameState.bodies.star.y)**2);
        if (gameState.distanceToStar > 1100*gameState.heightFactor){
            gameState.period += (-3.55382445*Math.pow(10, -9)*(1/gameState.heightFactor)*gameState.distanceToStar + 0.0400005331)*gameState.speedProp;
        } else {
            gameState.period += (-3.78947368*Math.pow(10, -5)*(1/gameState.heightFactor)*gameState.distanceToStar + 0.0456842105)*gameState.speedProp;
        }
        
        /* When the orbit has an eccentricity higher than 0, the orbit
         * should be adjusted to have the star in 1 of the foci. */
        gameState.bodies.planet.x = gameState.shift + (window.innerWidth/2) + Math.cos(gameState.period)*gameState.radiusMaj;
        gameState.bodies.planet.y = (window.innerHeight/2) + Math.sin(gameState.period)*gameState.radiusMin;

        /* Calculating and printing the various values portrayed at the top. */
        var currentDistance = gameState.distanceToStar/((gameState.maxAllowedRadius*gameState.heightFactor)/8.75);
        gameState.currentDistanceText.text = 'Current distance: ' + currentDistance.toFixed(3) + ' AU';
        centerText(gameState.currentDistanceText, window.innerWidth*0.1);
        var receivedPower = Math.pow(696340000/(currentDistance*1.495769871*Math.pow(10, 11)), 2)*5.67*Math.pow(10, -8)*Math.pow(gameState.temperature, 4);
        gameState.planetTempText.text = 'Effective temperature: ' + (Math.pow((receivedPower*0.63/(4*5.67*Math.pow(10, -8))), 0.25) - 273.15).toFixed(2) + ' °C';
        centerText(gameState.planetTempText, window.innerWidth*0.86);

        var innerLimit = 696340*Math.pow(10, 3)*Math.sqrt(5.67*Math.pow(10, -8))*Math.sqrt(Math.pow(gameState.temperature, 4))/Math.sqrt(1455.26)/((1.49597871*Math.pow(10, 11)));
        var outerLimit = 696340*Math.pow(10, 3)*Math.sqrt(5.67*Math.pow(10, -8))*Math.sqrt(Math.pow(gameState.temperature, 4))/Math.sqrt(698.6)/((1.49597871*Math.pow(10, 11)));
        
        gameState.innerBoundText.text = 'Inner limit: ' + innerLimit.toFixed(3) + ' AU';
        gameState.outerBoundText.text = 'Outer limit: ' + outerLimit.toFixed(3) + ' AU';
        centerText(gameState.innerBoundText, window.innerWidth*0.28);
        centerText(gameState.outerBoundText, window.innerWidth*0.44);

        gameState.receivedPowerText.text = 'Received power: ' + receivedPower.toFixed(1) + ' W/m^2';
        centerText(gameState.receivedPowerText, window.innerWidth*0.63);

    }

}