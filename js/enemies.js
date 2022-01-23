class Enemy {
    constructor(ctx) {
        this.ctx = ctx
        this.enemyPos = { x: undefined, y: 0 }
        this.enemySize = { w: 10, h: 10 }

        this.init()
    }

    init() {
        this.setRandomPosX()
        this.draw()
        this.moveDown()
    }

    setRandomPosX() {
        const posX = Math.floor(Math.random() * (650 - 50)) + 50
        this.enemyPos.x = posX
    }

    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }

    moveDown() {
        this.enemyPos.y += 10

    }
}