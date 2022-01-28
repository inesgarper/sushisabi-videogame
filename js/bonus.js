class Bonus {
    constructor(ctx) {
        this.ctx = ctx
        this.bonusPos = { x: undefined, y: 0 }
        this.bonusSize = { w: 40, h: 40 }
        this.imageInstance = undefined //inicializa la imagen

        this.init()
    }

    init() {
        this.setRandomPosX()

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/bonus.png'
    }

    setRandomPosX() {
        const posX = Math.floor(Math.random() * (650 - 50)) + 50
        this.bonusPos.x = posX
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.bonusPos.x, this.bonusPos.y, this.bonusSize.w, this.bonusSize.h)

    }

    moveDown() {
        this.bonusPos.y += 5
    }
}