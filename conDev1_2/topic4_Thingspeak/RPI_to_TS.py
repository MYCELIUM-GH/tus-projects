# ==== ==== IMPORTS ==== ====
from sense_hat import SenseHat
import requests
import sys
# ==== ==== CONFIG ==== ====
URL = "https://api.thingspeak.com/update"
READ_URL = "https://api.thingspeak.com/channels/3258326/fields/1/last.txt"
WRITE_KEY = 'IABFSW5TZMPAWRSD'
READ_KEY = '5QNI75HK9VD8JHJK'
# ==== ==== DISPLAY FUNCTION ==== ====
def displayBar(val, colStart, maxVal, colour):
	fraction = min(val / maxVal, 1.0)
	height = int(fraction * 8)

	for y in range(8):
		pixelColour = colour if y < height else [0, 0, 0]
		SenseHat().set_pixel(colStart, y, pixelColour)
		SenseHat().set_pixel(colStart + 1, y, pixelColour)
# ==== ==== MAIN LOOP ==== ====
print("running. press ctrl + c to exit. for LED display use HTTP req")
try:
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
		# SET READINGS ->
		write_payload = {
			'api_key': WRITE_KEY,
			'field1':  temp,
			'field2':  humidity,
			'field3':  pressure
		}
		write_response = requests.get(URL, params=write_payload)
		# GET READINGS ->
		read_response = requests.get(READ_URL, params={'api_key': READ_KEY})

		if int(read_response.text) == 1:
			SenseHat().clear()
			displayBar( temp,     0, 50,   [255, 0, 0])
			displayBar( humidity, 2, 100,  [0, 0, 255])
			displayBar( pressure, 4, 1100, [0, 255, 0])
		else:
			SenseHat().clear()
except KeyboardInterrupt:
	print("\interrupted by user. exiting")
	SenseHat().clear()
	sys.exit()
