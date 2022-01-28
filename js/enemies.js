class Wasabi {
    constructor(ctx) {
        this.ctx = ctx
        this.enemyPos = { x: undefined, y: 0 }
        this.enemySize = { w: 30, h: 30 }
        this.damage = 1
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.setRandomPosX()
        //this.draw()
        this.moveDown()
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/wasabi.png'
    }

    setRandomPosX() {
        const posX = Math.floor(Math.random() * (650 - 50)) + 50
        this.enemyPos.x = posX
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }

    moveDown() {
        this.enemyPos.y += 3
    }
}

class HotWasabi extends Wasabi {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
        this.ctx = ctx
        this.enemytPos = { x: posX, y: posY }
        this.enemySize = { w: 30, h: 30 }
        this.imageInstance.src = 'img/wasabi-supremo.png'
        this.damage = 1.5
    }
}