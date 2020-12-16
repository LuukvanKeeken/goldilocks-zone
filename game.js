const gameState = {
    temperature: 0,
    size: 0,
    eccentricity: 0,
    orbit_diameter: 0,
    bodies: {},
    factor: 1,
    period: 0,
    radius: 150,
    direction: 1
}

function centerText(text){
    text.x = window.innerWidth/2 - (text.width/2);
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    scene: [StartScene]
}

const game = new Phaser.Game(config);