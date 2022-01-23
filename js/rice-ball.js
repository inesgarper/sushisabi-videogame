class Player {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.riceBallPos = { x: posX, y: posY }
        // this.riceBallSize = { w: 50, h: 50 }
        this.riceBallRadius = 20
        this.riceBallVel = { x: 1, y: 0 }
        this.riceBallPhysics = { gravity: 0.5 }
        this.gameSize = gameSize
        this.lives = 5
        // this.imageInstance = undefined

        this.initRiceBall()
    }

    initRiceBall() {
        this.draw()
        this.move()
        this.moveLeft()
        this.moveRight()
    }

    draw() {
        this.move()
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black'
        this.ctx.arc(this.riceBallPos.x, this.riceBallPos.y, this.riceBallRadius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    move() {
        this.riceBallPos.y += this.riceBallVel.y

        if (this.riceBallPos.y + this.riceBallRadius + this.riceBallVel.y <= this.gameSize.h) {
            this.riceBallVel.y += this.riceBallPhysics.gravity
        } else {
            this.riceBallVel.y = 0
        }

    }

    moveLeft() {
        this.riceBallPos.x -= 15
    }

    moveRight() {
        this.riceBallPos.x += 15
    }

}