
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
        this.img = this.add.image(200, window.innerHeight - 100, 'dot').setScale(5, 5);
        var orbitRadiusText = this.add.text(this.img.x, this.img.y + 20, 'Orbit radius: ' + Math.round((100+0.25*200)*10)/10, {
            fontSize: '20px',
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
        this.img2 = this.add.image(window.innerWidth/2, window.innerHeight - 100, 'dot').setScale(5, 5);
        var eccText = this.add.text(this.img2.x, this.img2.y + 20, 'Eccentricity: ' + Math.round(gameState.eccentricity*100)/100, {
            fontSize: '20px',
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
        gameState.bodies.orbit = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 300, 300);
        gameState.bodies.orbit.setStrokeStyle(3, 0xffffff, 0.8);
        console.log(gameState.bodies.orbit);

        /* Circle representing the planet. */
        gameState.bodies.planet = this.add.circle(500, 500, 15, 0xffffff);

        /* Circles representing the Sun and its atmosphere. */
        gameState.bodies.starAtm1 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 35, 0xfcd440);
        gameState.bodies.starAtm1.alpha = 0.3;
        gameState.bodies.starAtm3 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 37.5, 0xfcd440);
        gameState.bodies.starAtm3.alpha = 0.25;
        gameState.bodies.starAtm2 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 40, 0xfcd440);
        gameState.bodies.starAtm2.alpha = 0.2;
        gameState.bodies.star = this.add.circle(window.innerWidth/2, window.innerHeight/2, 30, 0xfcd440);

        /* When the user sets a new value for the orbital radius, the distance
         * of the planet to the star should change, as well as the radius of 
         * the ellipse representing the orbit. When the orbit is larger, the
         * speed at which the planet moves should be lower, so the gameState.factor
         * is also adjusted. */
        this.img.sliderRadius.on('valuechange', function(newValue, prevValue){
            gameState.factor = 1 - newValue + 0.2;
            newValue = 100 + newValue*200;
            orbitRadiusText.text = 'Orbit radius: ' + Math.round(newValue*10)/10;
            centerText(orbitRadiusText, 200);
            gameState.radiusMin = newValue;
            gameState.radiusMaj = Math.sqrt(gameState.radiusMin**2/(1 - gameState.eccentricity**2));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);
        });

        /* When the user sets a new value for the eccentricity, the eccentricity
         * of the planet's orbit should change, as well as the eccentricity of
         * the white ellipse. The text under the slider is also updated. */
        this.img2.sliderEcc.on('valuechange', function(newValue, prevValue){
            newValue = newValue*0.985;
            eccText.text = 'Eccentricity: ' + Math.round(newValue*100)/100;
            centerText(eccText, window.innerWidth/2);
            gameState.eccentricity = newValue;
            gameState.radiusMaj = Math.sqrt(Math.pow(gameState.radiusMin, 2)/(1 - Math.pow(gameState.eccentricity, 2)));
            gameState.bodies.orbit.setSize(2*gameState.radiusMaj, 2*gameState.radiusMin);
        });
    }

    update(){
        gameState.period += 0.04*gameState.factor;
        gameState.bodies.planet.x = (window.innerWidth/2) + Math.cos(gameState.period)*gameState.radiusMaj;
        gameState.bodies.planet.y = (window.innerHeight/2) + Math.sin(gameState.period)*gameState.radiusMin;
    }

}