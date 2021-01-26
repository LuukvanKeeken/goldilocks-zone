
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
        this.img = this.add.image(200, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        let font = 20*gameState.heightFactor;
        font = font.toString();
        var orbitRadiusText = this.add.text(this.img.x, this.img.y + 20, 'Orbit radius: ' + Math.round((100+0.25*200)*10)/10, {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(orbitRadiusText, 200);
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
        this.img2 = this.add.image(window.innerWidth/2, window.innerHeight - 100*gameState.heightFactor, 'dot').setScale(5*gameState.heightFactor, 5*gameState.heightFactor);
        var eccText = this.add.text(this.img2.x, this.img2.y + 20, 'Eccentricity: ' + Math.round(gameState.eccentricity*100)/100, {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(eccText, window.innerWidth/2);
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


        /* Orbit line of the planet. */
        gameState.bodies.orbit = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 300*gameState.heightFactor, 300*gameState.heightFactor);
        gameState.bodies.orbit.setStrokeStyle(3, 0xffffff, 0.8);

        /* Circle representing the planet. */
        gameState.bodies.planet = this.add.circle(500, 500, 15*gameState.heightFactor, 0xffffff);

        /* Circles representing the Sun and its atmosphere. */
        gameState.bodies.starAtm1 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 35*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm1.alpha = 0.3;
        gameState.bodies.starAtm3 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 37.5*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm3.alpha = 0.25;
        gameState.bodies.starAtm2 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 40*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm2.alpha = 0.2;
        gameState.bodies.star = this.add.circle(window.innerWidth/2, window.innerHeight/2, 30*gameState.heightFactor, 0xfcd440);

        var calculateNewProportions = function(adjustedParam){
            if (adjustedParam === 'eccentricity'){
                /* Find the radius which in combination with the chosen
                 * eccentricity will not let the orbit go off-screen. */
                var limitFound = false;
                for (var i = 100; i < 300*gameState.heightFactor; i++){
                    var majorAxis = Math.sqrt((i**2)/(1 - (gameState.eccentricity**2)));
                    if (gameState.bodies.star.x + majorAxis*(1 + gameState.eccentricity) > window.innerWidth - gameState.bodies.planet.radius - 10*(1/gameState.heightFactor)){
                        console.log(i-1);
                        gameState.maxRadiusProp = (i-1)/(300*gameState.heightFactor);
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

        var adjustRadius = function(newValue){
            gameState.factor = 1.3 - (newValue*gameState.maxRadiusProp); //Not only newValue, because that only the denotes the place on the slider.
            var newRadius = (100 + newValue*(gameState.maxRadiusProp*300 - 100))*gameState.heightFactor;
            orbitRadiusText.text = 'Orbit radius: ' + Math.round(newRadius*10)/10;
            centerText(orbitRadiusText, 200);
            gameState.radiusMin = newRadius;
            gameState.radiusMaj = Math.sqrt(gameState.radiusMin**2/(1 - gameState.eccentricity**2));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);

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
            centerText(eccText, window.innerWidth/2);
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
    }

}