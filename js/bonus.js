class Bonus {
    constructor(ctx) {
        this.ctx = ctx
        this.bonusPos = { x: undefined, y: 0 }
        this.bonusSize = { w: 20, h: 20 }
        this.bonusTime = 30

        this.init()
    }

    init() {
        this.setRandomPosX()
        this.draw()
        this.moveDown()
    }

    setRandomPosX() {
        const posX = Math.floor(Math.random() * (650 - 50)) + 50
        this.bonusPos.x = posX
    }

    draw() {
        this.ctx.fillStyle = 'orange'
        this.ctx.fillRect(this.bonusPos.x, this.bonusPos.y, this.bonusSize.w, this.bonusSize.h)
    }

    moveDown() {
        this.bonusPos.y += 5
    }
}