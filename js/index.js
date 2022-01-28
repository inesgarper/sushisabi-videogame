const startButton = document.querySelector('button')
const canvas = document.querySelector('.hidden')

startButton.addEventListener('click', () => {
    canvas.setAttribute('class', 'showing')
    document.activeElement.blur()
    Game.gameInit()
})