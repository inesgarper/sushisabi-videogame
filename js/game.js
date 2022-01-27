const Game = {
    title: 'Sushisabi',
    authors: 'Mónica Sánchez Ugena e Inés García Periáñez',
    license: undefined,
    version: '1.0.0',
    ctx: undefined,
    platforms: [],
    enemies: [],
    bonus: [],
    ingredients: [],
    frameIndex: 0,
    level1Passed: false,
    isLevelScreenShowing: false,
    riceBall: undefined,
    // keys: {
    //    SPACE: 'Space'
    // },
    gameSize: { w: 700, h: window.innerHeight },

    gameInit() {
        this.setContext()
        this.setCanvasSize()
        this.drawProvisionalBackground()
        this.createPlatform()
        //this.createEnemies()
        this.createRiceBall()
        this.createIngredients()
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
        this.riceBall = new Player(this.ctx, 40, 60, this.gameSize, this.platforms, this.ingredients)
    },



    // ----------------------- LEVEL 1

    createPlatform() {
        this.platforms.push(
            new Platform(this.ctx, 0, 300, 170),
            new Platform(this.ctx, 200, 460, 170),
            new Platform(this.ctx, 70, 650, 170),
            new Platform(this.ctx, 400, 780, 170), // ingrediente aqui?
            new Platform(this.ctx, 150, 1000, 170),
            new Platform(this.ctx, 400, 1270, 170),
            new Platform(this.ctx, 70, 1450, 170), // ingrediente aqui
            new Platform(this.ctx, 280, 1650, 170),
            new Platform(this.ctx, 450, 1900, 170),
        )
    },

    createEnemies() {
        this.enemies.push(new Wasabi(this.ctx))
    },

    createIngredients() {
        this.ingredients.push(
            new Salmon(this.ctx, 480, 750),
            new Salmon(this.ctx, 80, 1420)
        )
    },

    createBonus() {
        this.bonus.push(new Bonus(this.ctx))
    },

    drawLevel1() {
        intervalId = setInterval(() => {
            this.frameIndex++
            this.frameIndex % 50 === 0 ? this.createEnemies() : null
            this.clearAll()
            this.drawProvisionalBackground()
            this.riceBall.riceBallVel.y > 0 ? this.riceBall.draw(this.frameIndex) : this.riceBall.draw()
            this.platforms.forEach((elm) => {
                elm.draw()
            })
            this.enemies.forEach((elm) => {
                elm.moveDown()
                elm.draw()
            })
            this.riceBall.bullets.forEach((elm) => {
                elm.moveUp()
                elm.draw(this.frameIndex)
            })
            this.ingredients.forEach((elm) => {
                elm.draw()
            })
            if (this.checkPlatformCollision()) {
                this.riceBall.riceBallVel.y = 0
                this.riceBall.isMoving = false
            } else {
                this.riceBall.isMoving = true
            }
            this.checkWasabiCollision()
            this.checkIngredientsCollision()
            this.checkBonusCollision()
            this.checkBulletCollision()
            this.clearWasabi()
            this.clearBullets()
            this.gravity()
            this.clearPlatforms()
            //this.createScroll()
            this.gameOver()
            this.firstLevelPassed()
        }, 1000 / 60)
    },

    firstLevelPassed() {
        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallSize.h >= this.gameSize.h && this.ingredients.length === 0) {
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
                this.riceBall.lives = 3
            }
        })
    },

    createLevel2Platforms() {
        this.platforms.push(
            new Platform(this.ctx, 0, 300, 150),
            new Platform(this.ctx, 200, 460, 170),
            new Platform(this.ctx, 70, 620, 150),
            new Platform(this.ctx, 400, 780, 170),
            new Platform(this.ctx, 150, 940, 200),
            new Platform(this.ctx, 400, 1100, 150),
            new Platform(this.ctx, 70, 1260, 150),
            new Platform(this.ctx, 280, 1420, 100),
            new Platform(this.ctx, 450, 1580, 170),
            new Platform(this.ctx, 50, 1740, 150),
            new Platform(this.ctx, 350, 1900, 150),
            new Platform(this.ctx, 150, 2060, 200),
            new Platform(this.ctx, 80, 2200, 150),
            new Platform(this.ctx, 550, 2380, 100),
            new Platform(this.ctx, 150, 2540, 250),
            new Platform(this.ctx, 40, 2700, 200),
            // new Platform(this.ctx, 250, 2860, 150),
            // new Platform(this.ctx, 350, 3020, 200),
            // new Platform(this.ctx, 50, 3180, 160),
            // new Platform(this.ctx, 450, 3340, 100),
            // new Platform(this.ctx, 150, 3500, 250),
            // new Platform(this.ctx, 50, 3660, 210),
            // new Platform(this.ctx, 70, 3820, 180)
        )
    },

    createLevel2Enemies() {
        this.enemies.push(new HotWasabi(this.ctx))
    },

    drawLevel2() {
        setInterval(() => {
            this.frameIndex++
            //this.frameIndex % 40 === 0 ? this.createEnemies() : null
            //this.frameIndex % 80 === 0 ? this.createLevel2Enemies() : null
            if (this.frameIndex % 300 === 0 && this.frameIndex >= 300) {
                this.createBonus()
            }
            this.clearAll()
            this.drawProvisionalBackground()
            this.riceBall.riceBallVel.y > 0 ? this.riceBall.draw(this.frameIndex) : this.riceBall.draw()
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
            if (this.checkPlatformCollision()) {
                this.riceBall.riceBallVel.y = 0
                this.riceBall.isMoving = false
            } else {
                this.riceBall.isMoving = true
            }
            //this.checkPlatformCollision()
            this.checkWasabiCollision()
            this.checkBonusCollision()
            this.checkBulletCollision()
            this.clearWasabi()
            this.clearBullets()
            this.gravity()
            this.clearPlatforms()
            this.gameOver()
            //this.createScroll()
        }, 1000 / 60)
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

    clearBullets() {
        this.riceBall.bullets = this.riceBall.bullets.filter(elm => elm.bulletPos.y >= 0)
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(elm => elm.platformPos.y > 0)
        if (this.platforms.length === 0) {
            this.riceBall.isMoving = true;
        }
    },

    // -------------- COLLISIONS

    checkPlatformCollision() {
        return this.platforms.some((elm) => {
            return this.riceBall.riceBallPos.x < elm.platformPos.x + elm.platformSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w >= elm.platformPos.x &&
                this.riceBall.riceBallPos.y < elm.platformPos.y + elm.platformSize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y >= elm.platformPos.y
        })
    },

    checkWasabiCollision() {
        this.enemies.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w > elm.enemyPos.x &&
                this.riceBall.riceBallPos.y < elm.enemyPos.y + elm.enemySize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y > elm.enemyPos.y) {

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
        this.ingredients.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.ingredientPos.x + elm.ingredientSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w > elm.ingredientPos.x &&
                this.riceBall.riceBallPos.y < elm.ingredientPos.y + elm.ingredientSize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y > elm.ingredientPos.y) {

                // elimina el ingrediente
                const indexOfIngredientToRemove = this.ingredients.indexOf(elm)
                this.ingredients.splice(indexOfIngredientToRemove, 1)
                console.log(this.ingredients)
            }
        })
    },

    checkBonusCollision() {
        this.bonus.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.bonusPos.x + elm.bonusSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w > elm.bonusPos.x &&
                this.riceBall.riceBallPos.y < elm.bonusPos.y + elm.bonusSize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y > elm.bonusPos.y) {

                this.riceBall.bulletsCounter = 10
                this.riceBall.lives += 3
                //this.canShoot()

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

                    console.log('wasabi muerto')
                    const indexOfWasabiToRemove = this.enemies.indexOf(elmEnemy)
                    this.enemies.splice(indexOfWasabiToRemove, 1)

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

        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallSize.h >= this.gameSize.h && this.ingredients.length > 0) {
            clearInterval(intervalId)
            alert('HAS TOCADO EL SUELO PALETO')
        }
    },


    // SCROLL

    gravity() {
        if (this.riceBall.riceBallPos.y <= (this.gameSize.h / 2)) {
            //this.riceBallVel.y += this.riceBallPhysics.gravity
            //this.riceBallPos.y += this.riceBallVel.y
        } else {
            this.platforms.forEach((eachPlatform) => {
                if (this.riceBall.riceBallPos.y > 0 && this.platforms.length > 0) {
                    eachPlatform.platformPos.y -= this.riceBall.riceBallVel.y
                }
            })
            this.ingredients.forEach((eachIngredient) => {
                if (this.riceBall.riceBallPos.y > 0) {
                    eachIngredient.ingredientPos.y -= this.riceBall.riceBallVel.y
                }
            })
            if (this.platforms.length) {
                this.riceBall.riceBallPos.y = this.gameSize.h / 2
            } else {
                console.log('PROBANDO')
            }
        }
    },

    // createScroll() {
    //     if (this.riceBall.riceBallVel.y > 0) {
    //         this.ingredients.forEach((elm) => {
    //             elm.ingredientPos.y -= 5
    //         })
    //         this.platforms.forEach((elm => {
    //             elm.platformPos.y -= 5
    //         }))
    //         // meter tb enemigos
    //     }
    // },


    // CONTROLS

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.riceBall.moveRight() : null
            key === 'ArrowLeft' ? this.riceBall.moveLeft() : null

            /* 
            if (key === 'ArrowRight' && !(arr.includes('ArrowRight'))) {
                arr.push('ArrowRight')
            }
            */
            if (this.riceBall.bulletsCounter > 0)
                if (key === ' ') {
                    this.riceBall.shoot()
                    this.riceBall.bulletsCounter--
                }
        })
    },
}