const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: '',
        capsLock: false
    },
    init() {
        this.elements.main = document.createElement('div')
        this.elements.keysContainer = document.createElement('div')

        this.elements.main.classList.add('keyboard', "keyboardHidden")
        this.elements.keysContainer.classList.add('keysContainer')
        this.elements.keysContainer.appendChild(this._createKeys())

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboardKey')

        this.elements.main.appendChild(this.elements.keysContainer)
        document.body.appendChild(this.elements.main)

        const textAreas = document.querySelectorAll('.useKeyboard')
        textAreas.forEach(textArea => {
            textArea.addEventListener('focus', () => {
                this.open(
                    textArea.value,
                    function (currentValue) {
                        textArea.value = currentValue
                    }
                )
            })
        })
    },
    _createKeys() {
        const fragment = document.createDocumentFragment()
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
            'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
            'space'
        ]
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        }
        keyLayout.forEach(key => {
            const keyElement = document.createElement('button')
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1

            keyElement.setAttribute("type", "button")
            keyElement.classList.add("keyboardKey")

            switch (key) {

                case 'backspace':
                    keyElement.classList.add("keyboardKeyWide")
                    keyElement.innerHTML = createIconHTML('backspace')
                    console.log(createIconHTML('backspace'))
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
                        this._triggerEvent("oninput")
                    })
                    break
                case 'caps':
                    keyElement.classList.add("keyboardKeyWide", "keyboardActivatable")
                    keyElement.innerHTML = createIconHTML('keyboard_capslock')
                    const indicator = document.createElement('div')
                    indicator.classList.add("keyboardIndicator")
                    keyElement.appendChild(indicator)
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock()
                        indicator.classList.toggle("keyboardIndicatorActive", this.properties.capsLock)
                    })
                    break
                case 'enter':
                    keyElement.classList.add("keyboardKeyWide")
                    keyElement.innerHTML = createIconHTML('keyboard_return')
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n"
                        this._triggerEvent("oninput")
                    })
                    break
                case 'space':
                    keyElement.classList.add("keyboardKeyExtraWide")
                    keyElement.innerHTML = createIconHTML('space_bar')
                    keyElement.addEventListener('click', () => {
                        this.properties.value += " "
                        this._triggerEvent("oninput")
                    })
                    break
                case 'done':
                    keyElement.classList.add("keyboardKeyWide", "keyboardKeyDone")
                    keyElement.innerHTML = createIconHTML('check_circle')
                    keyElement.addEventListener('click', () => {
                        this.close()
                        this._triggerEvent("onclose")
                    })
                    break
                default:
                    keyElement.textContent = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase()
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? `${key.toUpperCase()}` : `${key.toLowerCase()}`
                        console.log(this.properties.value)
                        this._triggerEvent("oninput")
                    })
                    break
            }
            fragment.appendChild(keyElement)
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"))
            }
        })


        return fragment
    },
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value)
        }
    },
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock
        for (let key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
            }
        }
        console.log(this.properties.capsLock)
    },
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput
        this.eventHandlers.onclose = onclose
        this.elements.main.classList.remove('keyboardHidden')
    },
    close() {
        this.properties.value = ''
        this.eventHandlers.onclose = oninput
        this.eventHandlers.oninput = onclose
        this.elements.main.classList.add('keyboardHidden')
    }
}

window.addEventListener("DOMContentLoaded", () => {
    Keyboard.init()
    // Keyboard.open("dcode",
    //     function (currentValue) {
    //         console.log(`Value changed! Here it is: ${currentValue}`)
    //     },
    //     function (currentValue) {
    //         console.log(`Keyboard closed! Current value = ${currentValue}`)
    //     }
    // )
})

