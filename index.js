const keyboard = document.querySelector('#keyboard')
const row1 = document.querySelector('#row1')
const row2 = document.querySelector('#row2')
const row3 = document.querySelector('#row3')
const inputBox = document.querySelector('#inputBox')

let shift = false
let lastKey

const keyRows = [
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm'], ['']]

for (let i = 0; i < keyRows.length; i++) {
    let row = document.createElement('div')
    row.setAttribute('id', `row${i}`)
    row.classList.add('row')
    for (let key of keyRows[i]) {
        let button = document.createElement('button')
        button.classList.add('btn')
        button.setAttribute('id', `${key}_Button`)
        button.innerText = `${key}`
        button.addEventListener('click', (event) => {
            const allButtons = document.querySelectorAll('.btn')
            allButtons.forEach(b => {
                if (b.getAttribute('id') !== 'capslockButton') {
                    b.classList.remove('active')
                }
            })
            // button.classList.add('active')
            console.log(`Last key was : ${lastKey}`)
            if (button.getAttribute('id') === 'shift_Button') {
                button.classList.add('active')
                shift = !shift
                shift && allButtons.forEach(b => {
                    if (b.getAttribute('id').length === 7) {
                        b.innerHTML = `${b.innerHTML.toUpperCase()}`
                    }
                })
            } else if (button.getAttribute('id') === 'capslock_Button') {
                button.classList.add('active')
                shift = !shift
                shift && allButtons.forEach(b => {
                    if (b.getAttribute('id').length === 7) {
                        b.innerHTML = `${b.innerHTML.toUpperCase()}`
                    }
                })
                shift && button.classList.add('active')
                !shift && button.classList.remove('active')
            } else if (button.getAttribute('id') === 'tab_Button') {
                inputBox.value = `${inputBox.value}     `
            } else {
                if (lastKey === 'Shift') {
                    shift = false
                    allButtons.forEach(b => {
                        if (b.getAttribute('id').length === 7) {
                            b.innerHTML = `${b.innerHTML.toLowerCase()}`
                        }
                    })
                }


                if (shift) {
                    inputBox.value = `${inputBox.value}${key.toUpperCase()}`
                    console.log(`${key.toUpperCase()}`)

                } else {
                    inputBox.value = `${inputBox.value}${key}`
                    console.log(`${key}`)
                }
            }
            if (lastKey !== 'Shift' && !shift) {
                allButtons.forEach(b => {
                    if (b.getAttribute('id').length === 7) {
                        b.innerHTML = `${b.innerHTML.toLowerCase()}`
                    }
                })
            }
            lastKey = key
        })
        // addEventListener('keydown', (event) => {
        //     console.log(event.key)

        //     if (event.key === 'Escape') {
        //         allButtons.forEach(b => b.classList.remove('active'))
        //     }
        //     if (event.key === key) {
        //         allButtons.forEach(b => b.classList.remove('active'))
        //         button.classList.add('active')
        //         console.log("YAY!")
        //     }
        // })
        row.appendChild(button)
    }
    keyboard.appendChild(row)
}

const allButtons = document.querySelectorAll('.btn')
const shiftBtn = document.querySelector('#shift_Button')

addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        shift = true
        shiftBtn.classList.add('active')
        allButtons.forEach(b => {
            if (b.getAttribute('id').length === 7) {
                b.innerHTML = `${b.innerHTML.toUpperCase()}`
            }
        })
    } else {
        console.log(e.key)
    }
    console.log(lastKey)
})

addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        shift = false
        shiftBtn.classList.remove('active')
        allButtons.forEach(b => {
            b.innerHTML = `${b.innerHTML.toLowerCase()}`
        })
    }
})

