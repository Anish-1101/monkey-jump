const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 2000
canvas.height = 1000



const gravity = 0.5
const drag = 0.007

function StartGame() {
    let startDiv = document.getElementById("start");
    let gameCanvas = document.getElementById("canvas");
    let gameOver = document.getElementById("game-over");
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    gameOver.style.display = "none";
    start();
}


class Player {
    constructor() { 
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 70
        this.height = 70
        const playerImage = new Image()
        playerImage.src = './images/monkey.png'
        this.image = playerImage
    }

    draw() {
    c.drawImage(this.image,this.position.x, this.position.y,this.width,this.height)
    }
     
    update() {
        this.draw()
        this.position.y += this.velocity.y
        if (this.position.y + this.height > canvas.height)
             {
                GameOverState = true
                GameOver()
            }
        else {
            this.velocity.y += gravity
        }
        this.position.x += this.velocity.x
        if (this.position.x + this.width > canvas.width||this.position.x < 10)
             {
                GameOverState = true
            }
    }   
}

class Platform {
    constructor() {
        this.position = {
            x: this.randomnumber(0, 900),
            y: this.randomnumber(0,  player.position.y-100)
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 200
        this.height = 60

        const platformImage = new Image()
        platformImage.src = './images/platform.png'
        this.image = platformImage
        
    }
    randomnumber(min, max) {
        return Math.random() * (max - min) + min
    };

    
    draw() {
        c.drawImage(this.image,this.position.x, this.position.y,this.width,this.height)
        }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.velocity.y += drag
    }
}

class Coconut {
    constructor() {
        this.position = {
            x: this.randomnumber(0, canvas.width),
            y: this.randomnumber(0, 100)
        }
        this.velocity = {
            x: 0,
            y: 5
        }
        this.width = 35
        this.height = 35
        const coconutImage = new Image()
        coconutImage.src = './images/coconut.png'
        this.image = coconutImage
    }
    randomnumber(min, max) {
        return Math.random() * (max - min) + min
    }
    draw() {
        c.drawImage(this.image,this.position.x, this.position.y,this.width,this.height)
        }
    update() {
        this.draw()
        this.position.y += this.velocity.y
    }
}

class Banana {
    constructor() {
        this.position = {
            x: this.randomnumber(0, canvas.width),
            y: this.randomnumber(0, 100)
        }
        this.velocity = {
            x: 0,
            y: 2
        }
        this.width = 40
        this.height = 40
        const BananaImage = new Image()
        BananaImage.src = './images/banana.png'
        this.image = BananaImage
    }
    randomnumber(min, max) {
        return Math.random() * (max - min) + min
    }
    draw() {
        c.fillStyle='yellow'
        c.drawImage(this.image,this.position.x, this.position.y,this.width,this.height)
        }
    update() {
        this.draw()
        this.position.y += this.velocity.y
    }
}

const player = new Player()
const platforms = []
platforms.push(new Platform)
platforms.push(new Platform)
const coconuts= []
const bananas = []
coconuts.push(new Coconut)
bananas.push(new Banana)

function spawnnewplatforms() {
    platforms.push(new Platform)
}

function spawnNewCoconuts() {
    coconuts.push(new Coconut);
}

function spawnNewBananas() {
    bananas.push(new Banana);
}

let GameOverState = false
let score = 0
setInterval(spawnnewplatforms, 3000)
setInterval(spawnNewCoconuts, 2000)
setInterval(spawnNewBananas, 2000)

const forest = new Image()
forest.src='./images/forest.png'

function start() {
    if(GameOverState) {
        return
    }
    requestAnimationFrame(start)
    c.clearRect(0,0,canvas.width,canvas.height)
    c.drawImage(forest,0, 0,canvas.width,canvas.height)
    c.fillStyle = 'white'
    c.font = '30px Comic Sans'
    c.fillText('Score: ' + score, 20, 30)
    player.update()
    for (i=0;i<platforms.length;i++) {
        platforms[i].update()
        if (platforms[i].position.y > canvas.height-20) {
            platforms.splice(i,1)
        }
    }
    for (i=0;i<bananas.length;i++) {
        bananas[i].update() 
        if (bananas[i].position.y > canvas.height-20) {
            bananas.splice(i,1)
        }
    }
    for (i=0;i<coconuts.length;i++) {
        coconuts[i].update()
    }
    if (coconuts[0].position.y > canvas.height-30) {
        coconuts.splice(0,1)
    }
    for (i=0;i<platforms.length;i++) {
    if (player.position.y + player.height <= platforms[i].position.y && 
        player.position.y + player.height + player.velocity.y >= platforms[i].position.y &&
        player.position.x + player.width >= platforms[i].position.x && 
        player.position.x  <= platforms[i].position.x + platforms[i].width) {
            player.velocity.y = 0
    }
}
for (i=0;i<coconuts.length;i++) {
    if (player.position.y + player.height >= coconuts[i].position.y && 
        player.position.y <= coconuts[i].position.y +coconuts[i].height &&
        player.position.x + player.width >= coconuts[i].position.x && 
        player.position.x <= coconuts[i].position.x +coconuts[i].width)
        {
            GameOver()
            GameOverState = true
        } 
}
for (i=0;i<bananas.length;i++) {
    if (player.position.y + player.height >= bananas[i].position.y && 
        player.position.y <= bananas[i].position.y +bananas[i].height &&
        player.position.x + player.width >= bananas[i].position.x && 
        player.position.x <= bananas[i].position.x +bananas[i].width)
        {
            if (score == 10) {
                setInterval(spawnNewCoconuts, 2000)
            }
            if (score == 20) {
                setInterval(spawnNewCoconuts, 2000)
            }
            if (score == 30) {
                setInterval(spawnNewCoconuts, 2000)
            }
            score += 5
            bananas.splice(i,1)
        } 
}
}

function GameOver() {
   bananas.length = 0;
   coconuts.length = 0;
  platforms.length = 0;
    c.fillStyle='black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'white'
     c.font = '30px Comic Sans'
     c.fillText("Press Start to Go Again", 200, 100)
}

addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        console.log('left');
        player.velocity.y -= 6
        for (i=0;i<platforms.length;i++) {
            platforms[i].position.y+= 1
        }
    }
    if (event.key === 'd') {
        console.log('left');
        player.velocity.x += 1;
    }
    if (event.key === 'a') {
        console.log('left');
        player.velocity.x -= 1;
    }
});