const Game = {
    title: 'Sushisabi',
    authors: 'Mónica Sánchez Ugena e Inés García Periáñez',
    license: undefined,
    version: '1.0.0',
    ctx: undefined,
    platforms: [],
    enemies: [],
    bonus: [],
    frameIndex: 0,
    level1Passed: false,
    isLevelScreenShowing: false,
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
        this.createBonus()
        this.checkPlatformCollision()
        this.checkWasabiCollision()
        this.checkIngredientsCollision()
        this.checkBonusCollision()
        this.checkBulletCollision()
        this.drawLevel1()
        this.setEventHandlers()
        this.gameOver()
        this.firstLevelPassed()
        this.startSecondLevel()
    },

    // INITIAL SETUP

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



    // CREATE PLAYER

    createRiceBall() {
        this.riceBall = new Player(this.ctx, 40, 60, this.gameSize)
    },



    // ----------------------- LEVEL 1

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
            new Platform(this.ctx, 450, 1200, 250),
        )
    },

    createEnemies() {
        this.enemies.push(new Wasabi(this.ctx))
    },

    createIngredients() {
        this.ingredient = new Salmon(this.ctx, 70, 420)
    },

    createBonus() {
        this.bonus.push(new Bonus(this.ctx))
    },

    drawLevel1() {
        intervalId = setInterval(() => {
            this.frameIndex++
            this.frameIndex % 20 === 0 ? this.createEnemies() : null
            this.frameIndex % 300 === 0 ? this.createBonus() : null
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
            this.bonus.forEach((elm) => {
                elm.moveDown()
                elm.draw()
            })
            this.riceBall.bullets.forEach((elm) => {
                elm.moveUp()
                elm.draw()
            })
            this.ingredient?.draw()
            this.checkPlatformCollision()
            this.checkWasabiCollision()
            this.checkIngredientsCollision()
            this.checkBonusCollision()
            this.checkBulletCollision()
            this.clearWasabi()
            this.createScroll()
            this.gameOver()
            this.firstLevelPassed()
        }, 60)
    },

    firstLevelPassed() {
        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallRadius >= this.gameSize.h && this.riceBall.ingredients > 0) {
            clearInterval(intervalId)
            this.printWinLevel1Screen()
            this.level1Passed = true
        }
    },

    printWinLevel1Screen() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)

        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'red'
        this.ctx.fillText('Listo! Pulsa para pasar al siguiente nivel', 70, 350)

        this.isLevelScreenShowing = true
    },


    // ----------------------------- LEVEL 2

    startSecondLevel() {
        const canvas = document.querySelector('#myCanvas')
        canvas.addEventListener("click", (e) => {
            if (this.level1Passed && this.isLevelScreenShowing === true) {
                this.clearAll()
                this.riceBall.riceBallPos.x = 60
                this.riceBall.riceBallPos.y = 40
                this.clearPlatformsArray()
                this.clearEnemiesArray()
                this.createLevel2Platforms()
                this.createLevel2Enemies()
                this.drawLevel2()
                this.isLevelScreenShowing = false
            }
        })
    },

    createLevel2Platforms() {
        this.platforms.push(
            new Platform(this.ctx, 0, 200, 250),
            new Platform(this.ctx, 50, 320, 220),
            new Platform(this.ctx, 400, 450, 250),
            new Platform(this.ctx, 50, 450, 220),
            new Platform(this.ctx, 200, 650, 150),
            new Platform(this.ctx, 400, 770, 200),
            new Platform(this.ctx, 50, 900, 250),
            new Platform(this.ctx, 280, 1050, 100),
            new Platform(this.ctx, 450, 1200, 250),
            new Platform(this.ctx, 50, 1300, 50),
            new Platform(this.ctx, 350, 1400, 150),
            new Platform(this.ctx, 150, 1500, 200),
            new Platform(this.ctx, 80, 1600, 150),
            new Platform(this.ctx, 550, 1700, 50),
            new Platform(this.ctx, 150, 1800, 250),
            new Platform(this.ctx, 40, 1900, 200),
            new Platform(this.ctx, 250, 2000, 150),
            new Platform(this.ctx, 350, 2100, 200),
            new Platform(this.ctx, 50, 2200, 160),
            new Platform(this.ctx, 450, 2300, 80),
            new Platform(this.ctx, 150, 2400, 250),
            new Platform(this.ctx, 50, 2500, 210),
            new Platform(this.ctx, 70, 2600, 180)
        )
    },

    createLevel2Enemies() {
        this.enemies.push(new HotWasabi(this.ctx))
    },

    drawLevel2() {
        setInterval(() => {
            this.frameIndex++
            this.frameIndex % 20 === 0 ? this.createEnemies() : null
            this.frameIndex % 50 === 0 ? this.createLevel2Enemies() : null
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
            // this.riceBall.bullets.forEach((elm) => {
            //     elm.draw()
            // })
            this.checkPlatformCollision()
            this.checkWasabiCollision()
            // this.checkBulletCollision()
            this.clearWasabi()
            this.gameOver()
            this.createScroll()
        }, 60)
    },

    // ----------- CLEAR FUNCTIONS

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    clearWasabi() {
        this.enemies = this.enemies.filter(elm => elm.enemyPos.y <= this.gameSize.h)
    },

    clearPlatformsArray() {
        this.platforms = []
    },

    clearEnemiesArray() {
        this.enemies = []
    },

    // -------------- COLLISIONS

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

                // las vidas disminuyen
                this.riceBall.lives -= elm.damage
                console.log(`me quedan ${this.riceBall.lives} vidas`)
            }
        })
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

    checkBonusCollision() {
        this.bonus.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.bonusPos.x + elm.bonusSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallRadius > elm.bonusPos.x &&
                this.riceBall.riceBallPos.y < elm.bonusPos.y + elm.bonusSize.h &&
                this.riceBall.riceBallRadius + this.riceBall.riceBallPos.y > elm.bonusPos.y) {

                this.riceBall.bulletsCounter = 10
                this.canShoot()

                // elimina el bonus
                const indexOfBonusToRemove = this.bonus.indexOf(elm)
                this.bonus.splice(indexOfBonusToRemove, 1)
            }
        })
    },

    checkBulletCollision() {
        this.riceBall.bullets.forEach((elmBullet) => {
            this.enemies.forEach((elmEnemy) => {
                if (elmEnemy.enemyPos.x < elmBullet.bulletPos.x + elmBullet.bulletRadius &&
                    elmEnemy.enemyPos.x + elmEnemy.enemySize.w > elmBullet.bulletPos.x &&
                    elmEnemy.enemyPos.y < elmBullet.bulletPos.y + elmBullet.bulletRadius &&
                    elmEnemy.enemySize.h + elmEnemy.enemyPos.y > elmBullet.bulletPos.y) {
                    alert('cualquier cosa')
                }
            })
        })
    },


    // CHECK INGREDIENTES 

    updateIngredientesCounter() {
        this.riceBall.ingredients++
        console.log(`tengo ${this.riceBall.ingredients} ingrediente`)
    },


    // GAME OVER

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


    // SCROLL

    createScroll() {
        if (this.riceBall.riceBallVel.y > 0) {
            if (this.ingredient) {
                this.ingredient.ingredientPos.y -= 5
            }

            this.platforms.forEach((elm => {
                elm.platformPos.y -= 5
            }))
        }
    },


    // CONTROLS

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.riceBall.moveRight() : null
            key === 'ArrowLeft' ? this.riceBall.moveLeft() : null
        })
    },

    canShoot() {
        if (this.riceBall.bulletsCounter > 0) {
            document.addEventListener('keydown', event => {
                const { key } = event
                if (key === ' ') {
                    this.riceBall.shoot()
                    this.riceBall.bulletsCounter--
                    console.log(this.riceBall.bulletsCounter)
                }
            })
        }
    }
}