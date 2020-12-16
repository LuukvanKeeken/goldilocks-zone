class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'});
    }

    preload(){
        this.load.image('background', './media/space_background.jpg');
        this.time.advancedTiming = true;
    }

    create(){
        this.add.image(900, 100, 'background');

        gameState.goldilocksZone = this.add.text(window.innerWidth/2, window.innerHeight/2 - 400, "The Goldilocks Zone", {
            fontSize: '80px',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(gameState.goldilocksZone);

        gameState.byLuuk = this.add.text(window.innerWidth/2, window.innerHeight/2 + 300, "by Luuk van Keeken", {
            fontSize: '30px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(gameState.byLuuk);

        gameState.clickAnywhere = this.add.text(window.innerWidth/2, window.innerHeight/2 + 400, "click anywhere to continue", {
            fontSize: '40px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        centerText(gameState.clickAnywhere);

        /* Size of c can be calculated with c = sqrt(a^2 - b^2). */
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

        // this.input.on('pointerup', () => {
        //     gameState.radius += 50;
        // });

    }

    update(){
        var period = this.time.now * 0.001;
        
        //var radius = 150;
        gameState.bodies.planet.x = (window.innerWidth/2) + Math.cos(period)*gameState.radius;
        gameState.bodies.planet.y = (window.innerHeight/2) + Math.sin(period)*gameState.radius;
    }
}