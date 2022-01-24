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
        this.createIngredients()
        this.checkPlatformCollision()
        this.checkWasabiCollision()
        this.checkIngredientsCollision()
        this.drawAll()
        this.setEventHandlers()
        this.gameOver()
        this.youWin()
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
            new Platform(this.ctx, 400, 770, 200),
            new Platform(this.ctx, 50, 900, 250),
            new Platform(this.ctx, 280, 1050, 100),
            new Platform(this.ctx, 450, 1200, 250)
        )
    },

    createEnemies() {
        this.enemies.push(new Enemy(this.ctx))
    },

    createRiceBall() {
        this.riceBall = new Player(this.ctx, 40, 60, this.gameSize)
    },

    createIngredients() {
        this.ingredient = new Ingredient(this.ctx, 70, 420)
    },

    drawAll() {
        intervalId = setInterval(() => {
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
            this.ingredient?.draw()
            this.checkPlatformCollision()
            this.checkWasabiCollision()
            this.checkIngredientsCollision()
            this.clearWasabi()
            this.createScroll()
            this.gameOver()
            this.youWin()
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

                // elimina el wasabi colisionado
                const indexOfWasabiToRemove = this.enemies.indexOf(elm)
                this.enemies.splice(indexOfWasabiToRemove, 1)

                // las vidas disminuyen en 1
                this.loseLive()
            }
        })
    },

    loseLive() {
        this.riceBall.lives--
        console.log(`me quedan ${this.riceBall.lives} vidas`)
    },

    checkIngredientsCollision() {
        if (this.ingredient) {
            if (this.riceBall.riceBallPos.x < this.ingredient?.ingredientPos.x + this.ingredient?.ingredientSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallRadius > this.ingredient?.ingredientPos.x &&
                this.riceBall.riceBallPos.y < this.ingredient?.ingredientPos.y + this.ingredient?.ingredientSize.h &&
                this.riceBall.riceBallRadius + this.riceBall.riceBallPos.y > this.ingredient?.ingredientPos.y) {
                // el contador de ingredientes aumenta en 1
                this.updateIngredientesCounter()

                // elimina el ingrediente
                this.ingredient = undefined
            }
        }
    },

    updateIngredientesCounter() {
        this.riceBall.ingredients++
        console.log(`tengo ${this.riceBall.ingredients} ingrediente`)
    },

    clearWasabi() {
        this.enemies = this.enemies.filter(elm => elm.enemyPos.y <= this.gameSize.h)
    },

    gameOver() {
        if (this.riceBall.lives <= 0) {
            clearInterval(intervalId)
            alert('HAS PERDIDO PRINGADO')
        }

        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallRadius >= this.gameSize.h && this.riceBall.ingredients <= 0) {
            clearInterval(intervalId)
            alert('HAS TOCADO EL SUELO PALETO')
        }
    },

    youWin() {
        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallRadius >= this.gameSize.h && this.riceBall.ingredients > 0) {
            clearInterval(intervalId)
            alert('HAS GANADOOOOOOO')
        }
    },

    createScroll() {
        if (this.riceBall.riceBallVel.y > 0) {
            if (this.ingredient) {
                this.ingredient.ingredientPos.y -= 5
            }

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