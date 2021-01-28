class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'});
    }

    transitionToMain(){
        this.scene.stop('StartScene');
        this.scene.start('MainScene');
    }

    preload(){
        this.load.image('background', './media/space_background.jpg');
        this.time.advancedTiming = true;
    }

    create(){
        gameState.widthFactor = window.innerWidth/1920;
        gameState.heightFactor = window.innerHeight/966;

        gameState.background = this.add.image(900, 100, 'background').setInteractive();

        let font = 80*gameState.heightFactor;
        font = font.toString();
        gameState.goldilocksZone = this.add.text(window.innerWidth/2, window.innerHeight/2 - 400*gameState.heightFactor, "The Goldilocks Zone", {
            fontSize: font + 'px',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(gameState.goldilocksZone, window.innerWidth/2);

        font = 30*gameState.heightFactor;
        font = font.toString();
        gameState.byLuuk = this.add.text(window.innerWidth/2, window.innerHeight/2 + 300*gameState.heightFactor, "by Luuk van Keeken", {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(gameState.byLuuk, window.innerWidth/2);

        font = 40*gameState.heightFactor;
        font = font.toString();
        gameState.clickAnywhere = this.add.text(window.innerWidth/2, window.innerHeight/2 + 400*gameState.heightFactor, "click anywhere to continue", {
            fontSize: font + 'px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(gameState.clickAnywhere, window.innerWidth/2);

        /* Size of c can be calculated with c = sqrt(a^2 - b^2). */
        /* Orbit line of the planet. */
        gameState.bodies.orbit = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 300*gameState.heightFactor, 300*gameState.heightFactor);
        gameState.bodies.orbit.setStrokeStyle(3, 0xffffff, 0.8);
        /* Circle representing the planet. */
        gameState.bodies.planet = this.add.circle(500, 500, 10*gameState.heightFactor, 0xffffff);

        /* Circles representing the Sun and its atmosphere. */
        gameState.bodies.starAtm1 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 35*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm1.alpha = 0.3;
        gameState.bodies.starAtm3 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 37.5*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm3.alpha = 0.25;
        gameState.bodies.starAtm2 = this.add.circle(window.innerWidth/2, window.innerHeight/2, 40*gameState.heightFactor, 0xfcd440);
        gameState.bodies.starAtm2.alpha = 0.2;
        gameState.bodies.star = this.add.circle(window.innerWidth/2, window.innerHeight/2, 30*gameState.heightFactor, 0xfcd440);

        
        /* When there is a mouse click, the text fades out, and at the end
         * of the tween, StartScene stops and MainScene is started. */
        this.input.on('pointerdown', () => {
            var tween = this.tweens.add({
                targets: [gameState.goldilocksZone, gameState.byLuuk, gameState.clickAnywhere],
                alpha: 0,
                duration: 750,
                ease: 'Linear',
                onComplete: function(){
                    this.scene.stop('StartScene');
                    this.scene.start('MainScene');
                }.bind(this)
            }, this);
        });

    }

    update(){
        gameState.period += 0.04;
        gameState.bodies.planet.x = (window.innerWidth/2) + Math.cos(gameState.period)*gameState.radiusMaj*gameState.heightFactor;
        gameState.bodies.planet.y = (window.innerHeight/2) + Math.sin(gameState.period)*gameState.radiusMaj*gameState.heightFactor;
    }
}