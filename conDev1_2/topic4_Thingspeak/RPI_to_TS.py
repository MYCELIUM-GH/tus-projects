# ==== ==== IMPORTS ==== ====
from sense_emu import SenseHat
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
    read_response = requests.get(URL, params={'api_key': READ_KEY})
    if int(read_response.text) == 1:
        SenseHat().set_pixels([255, 255, 255] * 64)
    else:
        SenseHat().clear()
