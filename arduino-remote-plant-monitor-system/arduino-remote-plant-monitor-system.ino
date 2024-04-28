#include <WiFiS3.h>
#include <WiFiSSLClient.h>
#include <ArduinoHttpClient.h>

#include "arduino_secrets.h"

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

WiFiSSLClient wifiClient;
int status = WL_IDLE_STATUS;

int HTTP_PORT = 443;
char HOST_NAME[] = SECRET_API_BASE_URL;

HttpClient httpClient = HttpClient(wifiClient, HOST_NAME, HTTP_PORT);

void setup() {
  // Checking for the WiFi module
  if (WiFi.status() == WL_NO_MODULE) {
    // No module found so don't continue with the process
    while (true)
      ;
  }

  // Attempting to connect to WiFi network
  while (status != WL_CONNECTED) {
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // Waiting 15 seconds for connection to establish
    delay(15000);
  }

  pinMode(13, OUTPUT);  // Pin pointing to red LED
  pinMode(8, OUTPUT);   // Pin pointing to green LED
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(8, HIGH);  // Turning on green LED indicating we have a connection

    String addSensorReadingApi = "/api/add-sensor-reading";
    String contentType = "application/json";

    float sensorValue = analogRead(A0);

    String postData = "{\"reading\":";
    postData += sensorValue;
    postData += "}";

    // Inspiration for this value: https://github.com/passion-tech/Hello-tech/blob/master/Soil_moisture_Sensor_with_Relay___Lcd.ino
    if (sensorValue > 625) {
      digitalWrite(13, HIGH);  // Turning on red LED indicating that the soil is dry
    }

    int statusCode = 0;

    while (statusCode != 201) {
      httpClient.post(addSensorReadingApi, contentType, postData);

      // Reading the status code of the response
      statusCode = httpClient.responseStatusCode();
    }

    // Blink LED to show that request has been made
    digitalWrite(8, LOW);
    delay(1000);
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);  // Turning off green LED indicating we do not have a connection
  }

  delay(3600000);  // Take reading every 1 hour
}
