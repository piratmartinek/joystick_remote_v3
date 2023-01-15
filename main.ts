let speed = 0
let turn = 0
let Move = 0
let Y = 0
let X = 0
radio.setGroup(128)
let pos_0 = -1
let pos_1 = 450
let pos_2 = 512
let pos_3 = 550
let pos_4 = 1025
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
basic.forever(function () {
    if (X > pos_3 && X < pos_4 && (Y > pos_1 && Y < pos_3)) {
        Move = 7
    } else if (X > pos_3 && X < pos_4 && (Y > pos_3 && Y < pos_4)) {
        Move = 6
    } else if (X > pos_1 && X < pos_3 && (Y > pos_3 && Y < pos_4)) {
        Move = 5
    } else if (X > pos_0 && X < pos_1 && (Y > pos_3 && Y < pos_4)) {
        Move = 4
    } else if (X > pos_0 && X < pos_1 && (Y > pos_1 && Y < pos_3)) {
        Move = 3
    } else if (X > pos_0 && X < pos_1 && (Y > pos_0 && Y < pos_1)) {
        Move = 2
    } else if (X > pos_1 && X < pos_3 && (Y > pos_0 && Y < pos_1)) {
        Move = 1
    } else if (X > pos_3 && X < pos_4 && (Y > pos_0 && Y < pos_1)) {
        Move = 8
    } else {
        Move = 0
    }
})
basic.forever(function () {
    basic.clearScreen()
    if (Move == 0) {
        led.plot(2, 2)
    } else if (Move == 1) {
        led.plot(2, 0)
    } else if (Move == 2) {
        led.plot(3, 1)
    } else if (Move == 3) {
        led.plot(4, 2)
    } else if (Move == 4) {
        led.plot(3, 3)
    } else if (Move == 5) {
        led.plot(2, 4)
    } else if (Move == 6) {
        led.plot(1, 3)
    } else if (Move == 7) {
        led.plot(0, 2)
    } else if (Move == 8) {
        led.plot(1, 1)
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        radio.sendValue("pushedbutton", 13)
        basic.showLeds(`
            # . . . .
            # # . . .
            # # # . .
            # # . . .
            # . . . .
            `)
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendValue("pushedbutton", 14)
        basic.showLeds(`
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        radio.sendValue("pushedbutton", 15)
        basic.showLeds(`
            . . . . #
            . . . # #
            . . # # #
            . . . # #
            . . . . #
            `)
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendValue("pushedbutton", 16)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            `)
    } else {
        led.plot(2, 2)
    }
    basic.pause(10)
})
basic.forever(function () {
    X = 1024 - pins.analogReadPin(AnalogPin.P2)
    Y = pins.analogReadPin(AnalogPin.P1)
    turn = Math.map(1024 - X, 0, 1023, -100, 100)
    speed = Math.map(Y, 0, 1023, -100, 100)
    radio.sendValue("left", Math.constrain(speed - turn, -100, 100))
    radio.sendValue("right", Math.constrain(speed + turn, -100, 100))
})
