class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'});
    }

    preload(){
        this.load.image('background', './media/space_background.jpg');
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

    }
}