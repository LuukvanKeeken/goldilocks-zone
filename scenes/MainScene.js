
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
        this.time.advancedTiming = true;
    }

    create(){
        this.add.image(900, 100, 'background');

        /* Create slider and text for changing the radius of the orbit. */
        this.img = this.add.image(window.innerWidth*0.25, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        let font = 20*gameState.heightFactor;
        font = font.toString();
        var orbitRadiusText = this.add.text(this.img.x, this.img.y + 20, 'Orbit radius: ' + Math.round((100+0.25*200)*10)/10, {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(orbitRadiusText, window.innerWidth*0.25);
        this.img.sliderRadius = this.plugins.get('rexsliderplugin').add(this.img, {
            endPoints: [{
                    x: this.img.x - 100,
                    y: this.img.y
                },
                {
                    x: this.img.x + 100,
                    y: this.img.y
                }
            ],
            value: 0.25
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(this.img.sliderRadius.endPoints);

        /* Create slider and text for the eccentricity. */
        this.img2 = this.add.image(window.innerWidth*0.5, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        var eccText = this.add.text(this.img2.x, this.img2.y + 20, 'Eccentricity: ' + Math.round(gameState.eccentricity*100)/100, {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(eccText, window.innerWidth*0.5);
        this.img2.sliderEcc = this.plugins.get('rexsliderplugin').add(this.img2, {
            endPoints: [{
                    x: this.img2.x - 100,
                    y: this.img2.y
                },
                {
                    x: this.img2.x + 100,
                    y: this.img2.y
                }
            ],
            value: 0
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(this.img2.sliderEcc.endPoints);

        /* Create slider and text for the temperature/spectral class. */
        this.img3 = this.add.image(window.innerWidth*0.75, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        var tempText = this.add.text(this.img3.x, this.img3.y + 20, 'Star temperature: ' + gameState.temperature + ' K (class ' + gameState.class + ')', {
            fontSize: font + 'px',
            fill: '#fcd440',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(tempText, window.innerWidth*0.75);
        this.img3.sliderTemp = this.plugins.get('rexsliderplugin').add(this.img3, {
            endPoints: [{
                    x: this.img3.x - 100,
                    y: this.img3.y
                },
                {
                    x: this.img3.x + 100,
                    y: this.img3.y
                }
            ],
            value: 0.0898
        });
        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(this.img3.sliderTemp.endPoints);

        // gameState.planetTempText = this.add.text(300, window.innerHeight/2, 'Distance to star: ' + gameState.distanceToStar, {
        //     fontSize: font + 'px',
        //     fill: '#ffffff',
        //     stroke: '#000000',
        //     strokeThickness: 2
        // });


        /* Circles representing the Sun and its atmosphere. */
        gameState.bodies.starAtm1 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 35*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm1.alpha = 0.3;
        gameState.bodies.starAtm3 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 37.5*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm3.alpha = 0.25;
        gameState.bodies.starAtm2 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 40*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm2.alpha = 0.2;
        gameState.bodies.star = this.add.circle(window.innerWidth/2, window.innerHeight/2, 30*gameState.heightFactor, 0xfcd440);


        /* Orbit line of the planet. */
        gameState.bodies.orbit = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, gameState.maxAllowedRadius*gameState.heightFactor, gameState.maxAllowedRadius*gameState.heightFactor);
        gameState.bodies.orbit.setStrokeStyle(3, 0xffffff, 0.8);

        /* Circle representing the planet. */
        gameState.bodies.planet = this.add.circle(500, 500, 10*gameState.heightFactor, 0xffffff);

        var calculateNewProportions = function(adjustedParam){
            if (adjustedParam === 'eccentricity'){
                /* Find the radius which in combination with the chosen
                 * eccentricity will not let the orbit go off-screen. */
                var limitFound = false;
                for (var i = 48; i < 400; i++){
                    var majorAxis = Math.sqrt((i**2)/(1 - (gameState.eccentricity**2)));
                    if (gameState.bodies.star.x + majorAxis*(1 + gameState.eccentricity) > window.innerWidth - gameState.bodies.planet.radius - 10*(1/gameState.heightFactor)){
                        console.log(i-1);
                        gameState.maxRadiusProp = (i-1)/(gameState.maxAllowedRadius*gameState.heightFactor);
                        limitFound = true;
                        break;
                    }
                }
                if (!limitFound){
                    gameState.maxRadiusProp = 1;
                }
            } else if (adjustedParam === 'radius'){
                /* Find the maximum eccentricity which in combination with the
                 * chosen radius will not let the orbit go off-screen. */
                for (var i = 0; i < 1000; i++){
                    var majorAxis = Math.sqrt((gameState.radiusMin**2)/(1 - (i/1000)**2));
                    if (gameState.bodies.star.x + majorAxis*(1 + i/1000) > window.innerWidth - gameState.bodies.planet.radius - 10*(1/gameState.heightFactor)){
                        if (i > 0){
                            gameState.maxEccProp = (i-1)/1000;
                        } else {
                            gameState.maxEccProp = 0;
                        }
                        break;
                    }
                }
            }
        }
        calculateNewProportions('radius');
        calculateNewProportions('eccentricity');

        var calculatePixels = function(distanceInAU){
            return (distanceInAU*((gameState.maxAllowedRadius*gameState.heightFactor)/8.75));            
        }

        var adjustRadius = function(newValue){
            newValue *= 0.75;
            gameState.factor = 1.3 - (newValue*gameState.maxRadiusProp); //Not only newValue, because that only the denotes the place on the slider.
            var newRadius = calculatePixels(gameState.maxRadiusProp*(56.5860829*newValue + 0.2044495167));
            
            orbitRadiusText.text = 'Semi-minor axis: ' + (gameState.maxRadiusProp*(56.5870829*newValue + 0.2044495167)).toFixed(3) + ' AU';
            
            centerText(orbitRadiusText, window.innerWidth*0.25);
            gameState.radiusMin = newRadius;
            gameState.radiusMaj = Math.sqrt(gameState.radiusMin**2/(1 - gameState.eccentricity**2));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);
            console.log('Orbit diameter: ' + gameState.bodies.orbit.geom.height);
            console.log('HeightFactor: ' + gameState.heightFactor);
            console.log('Semi-minor axis: ' + gameState.maxRadiusProp*(56.5870829*newValue + 0.2044495157)) + ' AU';

            /* If the eccentricity is higher than 0, the orbit should be shifted.
             * Normal equation is shift = 0.5*a*c, but gameState.radiusMaj already
             * is 0.5*a. */
            gameState.shift = gameState.radiusMaj*gameState.eccentricity;
            gameState.bodies.orbit.x = gameState.bodies.star.x + gameState.shift;
            calculateNewProportions('radius');
        }
        
        adjustRadius(0.25);

        /* When the user sets a new value for the orbital radius, the distance
         * of the planet to the star should change, as well as the radius of 
         * the ellipse representing the orbit. When the orbit is larger, the
         * speed at which the planet moves should be lower, so the gameState.factor
         * is also adjusted. */
        this.img.sliderRadius.on('valuechange', function(newValue, prevValue){
            adjustRadius(newValue);
        });

        /* When the user sets a new value for the eccentricity, the eccentricity
         * of the planet's orbit should change, as well as the eccentricity of
         * the white ellipse. The text under the slider is also updated. */
        this.img2.sliderEcc.on('valuechange', function(newValue, prevValue){
            newValue = newValue*gameState.maxEccProp;
            newValue = Math.floor(newValue*1000)/1000;
            eccText.text = 'Eccentricity: ' + newValue;
            centerText(eccText, window.innerWidth*0.5);
            gameState.eccentricity = newValue;

            gameState.radiusMaj = Math.sqrt(Math.pow(gameState.radiusMin, 2)/(1 - Math.pow(gameState.eccentricity, 2)));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);

            /* If the eccentricity is higher than 0, the orbit should be shifted.
             * Normal equation is shift = 0.5*a*c, but gameState.radiusMaj already
             * is 0.5*a. */
            gameState.shift = gameState.radiusMaj*gameState.eccentricity;
            gameState.bodies.orbit.x = gameState.bodies.star.x + gameState.shift;
            calculateNewProportions('eccentricity');
        });

        var recolorStar = function(newColor){
            gameState.bodies.star.fillColor = newColor;
            gameState.bodies.starAtm1.fillColor = newColor;
            gameState.bodies.starAtm3.fillColor = newColor;
            gameState.bodies.starAtm2.fillColor = newColor;
        };

        this.img3.sliderTemp.on('valuechange', function(newValue, prevValue){
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
            centerText(tempText, window.innerWidth*0.75); 
        });


        gameState.bodies.glz = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 2*gameState.maxAllowedRadius*gameState.heightFactor, 2*gameState.maxAllowedRadius*gameState.heightFactor);
        gameState.bodies.glz.setStrokeStyle(20, 0x00ff00, 0.3);
        
    }

    update(){
        /* Velocity is increased proportionally to how close the planet is to the star.
         * The multiplication factor is 1 when the distance is equal to the length of
         * the minor axis radius (not diameter). */
        gameState.distanceToStar = Math.sqrt((gameState.bodies.planet.x- gameState.bodies.star.x)**2 
            + (gameState.bodies.planet.y - gameState.bodies.star.y)**2);
        gameState.period += 0.04*gameState.factor*(gameState.radiusMin/gameState.distanceToStar);
        /* When the orbit has an eccentricity higher than 0, the orbit
         * should be adjusted to have the star in 1 of the foci. */
        gameState.bodies.planet.x = gameState.shift + (window.innerWidth/2) + Math.cos(gameState.period)*gameState.radiusMaj;
        gameState.bodies.planet.y = (window.innerHeight/2) + Math.sin(gameState.period)*gameState.radiusMin;
        // gameState.planetTempText.text = 'Distance to star: ' + Math.round((gameState.distanceToStar)*10)/10;
    }

}