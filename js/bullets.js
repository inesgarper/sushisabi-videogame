class Tobiko {
    constructor(ctx, playerPosX, playerPosY, playerSizeW, playerSizeH) {
        this.ctx = ctx
        this.bulletPos = {
            x: playerPosX + playerSizeW / 2,
            y: playerPosY + playerSizeH
        }
        this.bulletRadius = 5
        this.bulletVel = { x: 10, y: 1 }
        this.bulletPhysics = { gravity: 1 }

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