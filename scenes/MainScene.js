class MainScene extends Phaser.Scene{
    constructor(){
        super({key: 'MainScene'});
    }


    preload(){
        this.load.image('background', './media/space_background.jpg');
        this.time.advancedTiming = true;
    }

    create(){
        this.add.image(900, 100, 'background');
        
        /* Orbit line of the planet. */
        gameState.bodies.orbit = this.add.ellipse(window.innerWidth/2, window.innerHeight/2, 300, 300);
        gameState.bodies.orbit.setStrokeStyle(3, 0xffffff, 0.8);
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

        this.input.on('pointerup', () => {
            this.scene.stop('MainScene');
            this.scene.start('StartScene');
        });
    }

    update(){
        gameState.period = this.time.now * 0.001;
        gameState.bodies.planet.x = (window.innerWidth/2) + Math.cos(gameState.period)*gameState.radius;
        gameState.bodies.planet.y = (window.innerHeight/2) + Math.sin(gameState.period)*gameState.radius;
    }

}