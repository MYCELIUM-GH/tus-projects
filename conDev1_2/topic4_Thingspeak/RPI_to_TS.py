# ==== ==== IMPORTS ==== ====
from sense_hat import SenseHat
import requests
# ==== ==== CONFIG ==== ====
URL = "https://api.thingspeak.com/update"
WRITE_KEY = 'IABFSW5TZMPAWRSD'
READ_KEY = 'D0M58PFDLIFHL53J'
# ==== ==== MAIN LOOP ==== ====
while True:
    temp = SenseHat().get_temperature()
    humidity = SenseHat().get_humidity()
    pressure = SenseHat().get_pressure()
    # FIX FOR ZEROS IN HUMIDITY READINGS
    lastHumidity = 50
    if humidity == 0:
        humidity = lastHumidity
    else:
        lastHumidity = humidity
    # WRITE ->
    write_payload = {
        'api_key': WRITE_KEY,
        'field1': temp,
        'field2': humidity,
        'field3': pressure
    }
    write_response = requests.get(URL, params=write_payload)
    # READ ->
    read_payload = {
        'api_key': READ_KEY,
        'field1': 'temp',
        'field2': 'humidity',
        'field3': 'pressure'
    }
    read_response = requests.get(URL, params=read_payload)
    if read_response.text == 1:
        SenseHat().show_message("Temp: " + str(temp), text_colour=[255, 0, 0])
        SenseHat().show_message("Humidity: " + str(humidity), text_colour=[0, 255, 0])
        SenseHat().show_message("Pressure: " + str(pressure), text_colour=[0, 0, 255])
    else:
        SenseHat().clear()
