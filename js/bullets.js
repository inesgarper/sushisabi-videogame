class Tobiko {
    constructor(ctx, playerPosX, playerPosY, playerRadius) {
        this.ctx = ctx
        this.bulletPos = {
            x: playerPosX + playerRadius / 2,
            y: playerPosY + playerRadius
        }
        this.bulletRadius = 5
        this.bulletVel = { x: 10, y: 1 }
        this.bulletPhysics = { gravity: 1 }

        this.playerRadius = playerRadius

        this.initBullet()
    }

    initBullet() {
        this.draw()
        this.moveUp()
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "orange"
        this.ctx.arc(this.bulletPos.x, this.bulletPos.y, this.bulletRadius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    moveUp() {
        this.bulletPos.y -= 10
    }
}

