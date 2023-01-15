speed = 0
turn = 0
radio.set_group(128)
Move = 0
X = 0
Y = 0
pos_0 = -1
pos_1 = 450
pos_2 = 512
pos_3 = 550
pos_4 = 1025

def on_forever():
    global X, Y, turn, speed
    X = pins.analog_read_pin(AnalogPin.P2)
    Y = 1024 - pins.analog_read_pin(AnalogPin.P1)
    turn = Math.map(1024 - X, 0, 1023, -90, 90)
    speed = Math.map(Y, 0, 1023, 0, 180)
    radio.send_value("left", speed + turn)
    radio.send_value("right", speed - turn)
basic.forever(on_forever)

def on_forever2():
    basic.clear_screen()
    if Move == 0:
        led.plot(2, 2)
    elif Move == 1:
        led.plot(2, 0)
    elif Move == 2:
        led.plot(3, 1)
    elif Move == 3:
        led.plot(4, 2)
    elif Move == 4:
        led.plot(3, 3)
    elif Move == 5:
        led.plot(2, 4)
    elif Move == 6:
        led.plot(1, 3)
    elif Move == 7:
        led.plot(0, 2)
    elif Move == 8:
        led.plot(1, 1)
    else:
        led.plot(2, 2)
    basic.pause(10)
basic.forever(on_forever2)

def on_forever3():
    global Move
    if X > pos_3 and X < pos_4 and (Y > pos_1 and Y < pos_3):
        Move = 7
    elif X > pos_3 and X < pos_4 and (Y > pos_3 and Y < pos_4):
        Move = 6
    elif X > pos_1 and X < pos_3 and (Y > pos_3 and Y < pos_4):
        Move = 5
    elif X > pos_0 and X < pos_1 and (Y > pos_3 and Y < pos_4):
        Move = 4
    elif X > pos_0 and X < pos_1 and (Y > pos_1 and Y < pos_3):
        Move = 3
    elif X > pos_0 and X < pos_1 and (Y > pos_0 and Y < pos_1):
        Move = 2
    elif X > pos_1 and X < pos_3 and (Y > pos_0 and Y < pos_1):
        Move = 1
    elif X > pos_3 and X < pos_4 and (Y > pos_0 and Y < pos_1):
        Move = 8
    else:
        Move = 0
basic.forever(on_forever3)
