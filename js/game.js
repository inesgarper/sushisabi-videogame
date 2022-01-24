const Game = {
    title: 'Sushisabi',
    authors: 'Mónica Sánchez Ugena e Inés García Periáñez',
    license: undefined,
    version: '1.0.0',
    ctx: undefined,
    platforms: [],
    enemies: [],
    frameIndex: 0,
    // keys: {
    //    SPACE: 'Space'
    // },
    gameSize: { w: 700, h: window.innerHeight },

    gameInit() {
        this.setContext()
        this.setCanvasSize()
        this.drawProvisionalBackground()
        this.createPlatform()
        this.createEnemies()
        this.createRiceBall()
        this.checkPlatformCollision()
        this.checkWasabiCollision()
        this.drawAll()
        this.setEventHandlers()
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
    },

    setCanvasSize() {
        document.querySelector('#myCanvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.gameSize.h)
    },

    drawProvisionalBackground() {
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    createPlatform() {
        this.platforms.push(
            new Platform(this.ctx, 50, 200, 250),
            new Platform(this.ctx, 250, 320, 220),
            new Platform(this.ctx, 0, 450, 250),
            new Platform(this.ctx, 500, 450, 220),
            new Platform(this.ctx, 200, 650, 150),
            new Platform(this.ctx, 400, 770, 200)
        )
    },

    createEnemies() {
        this.enemies.push(new Enemy(this.ctx))
    },

    createRiceBall() {
        this.riceBall = new Player(this.ctx, 40, 60, this.gameSize)
    },

    drawAll() {
        setInterval(() => {
            this.frameIndex++
            this.frameIndex % 20 === 0 ? this.createEnemies() : null
            this.clearAll()
            this.drawProvisionalBackground()
            this.riceBall.draw()
            this.platforms.forEach((elm) => {
                elm.draw()
            })
            this.enemies.forEach((elm) => {
                elm.moveDown()
                elm.draw()
            })
            this.checkPlatformCollision()
            this.checkWasabiCollision()
            // this.clearWasabi()
            this.createScroll()
        }, 60)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    checkPlatformCollision() {
        this.platforms.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.platformPos.x + elm.platformSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallRadius > elm.platformPos.x &&
                this.riceBall.riceBallPos.y < elm.platformPos.y + elm.platformSize.h &&
                this.riceBall.riceBallRadius + this.riceBall.riceBallPos.y > elm.platformPos.y) {
                this.riceBall.riceBallVel.y = 0
            }
        })
    },

    checkWasabiCollision() {
        this.enemies.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallRadius > elm.enemyPos.x &&
                this.riceBall.riceBallPos.y < elm.enemyPos.y + elm.enemySize.h &&
                this.riceBall.riceBallRadius + this.riceBall.riceBallPos.y > elm.enemyPos.y) {
                this.riceBall.lives--
                elm.enemySize.w = 0
                elm.enemySize.h = 0
            }
        })
    },

    // clearWasabi() {
    //     this.enemies = this.enemies.filter(enemy => enemy.posY >= this.gameSize.h)
    // },

    createScroll() {
        if (this.riceBall.riceBallVel.y > 0) {
            this.platforms.forEach((elem => {
                elem.platformPos.y -= 5
            }))
        }
    },

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.riceBall.moveRight() : null
            key === 'ArrowLeft' ? this.riceBall.moveLeft() : null
        })
    }

}