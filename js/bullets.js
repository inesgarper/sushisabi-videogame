class Tobiko {
    constructor(ctx, playerPosX, playerPosY, playerSizeW, playerSizeH) {
        this.ctx = ctx
        this.bulletPos = {
            x: playerPosX + playerSizeW / 2,
            y: playerPosY + playerSizeH / 2
        }
        this.bulletSize = { w: 15, h: 15 }
        this.bulletVel = { x: 10, y: 1 }
        this.bulletPhysics = { gravity: 1 }
        this.imageInstance = undefined

        this.initBullet()
    }

    initBullet() {
        this.moveUp()
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/bullet.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
    }

    moveUp() {
        this.bulletPos.y -= 10
    }
}