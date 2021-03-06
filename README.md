[![CircleCI](https://circleci.com/gh/safiranugroho/sensor-sensibility.svg?style=svg&circle-token=3fe1314a8e988c7b669d506dec9fa37311ee356f)](https://circleci.com/gh/safiranugroho/sensor-sensibility)
# Sensor Sensibility

## Challenge
The challenge is to read the sensor data from the stream and create visualisations of the rolling average for each of the:
- temperature
- humidity
- radiation
- light readings

for the underlying sensor groups as well as totals across all groups.

The visualisations should be updated in near real time.

The sensor stream it connects to can be found here: https://www.pubnub.com/developers/realtime-data-streams/sensor-network/

## Requirements
- Node.js 8.15+

## Running the application
Clone the repository and run `./go` to run the application locally.
This will open `http://localhost:1234` on your browser. It should look something like:

![alt text](docs/screenshot.png "App screenshot")