const gameState = {
    introTexts: {},
    temperature: 0,
    size: 0,
    eccentricity: 0,
    orbit_diameter: 0,
    bodies: {},
    factor: 1,
    period: 0,
    radiusMaj: 150,
    radiusMin: 150,
    eccentricity: 0
}

function centerText(text, centerCoordinate){
    text.x = centerCoordinate - (text.width/2);
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    scene: [StartScene, MainScene]
}

const game = new Phaser.Game(config);