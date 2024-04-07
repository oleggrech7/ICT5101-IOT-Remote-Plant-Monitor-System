#include <WiFiS3.h>
#include <ArduinoHttpClient.h>

#include "arduino_secrets.h"

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

WiFiClient wifiClient;
int status = WL_IDLE_STATUS;

int HTTP_PORT = 443;
char HOST_NAME[] = SECRET_API_BASE_URL;

HttpClient httpClient = HttpClient(wifiClient, HOST_NAME, HTTP_PORT);

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  // String fv = WiFi.firmwareVersion();
  // if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
  //   Serial.println("Please upgrade the firmware");
  // }

  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  // you're connected now, so print out the data:
  Serial.print("You're connected to the network\n");
  printWifiData();
}

void loop() {
  // put your main code here, to run repeatedly:
  if(WiFi.status() == WL_CONNECTED) {
    String addSensorReadingApi = "/api/add-sensor-reading";
    String contentType = "application/json";

    Serial.println("Starting Request");
    
    // // Uncomment once sensor is setup
    // // float sensorValue = analogRead(A0);
    // // String postData = "{\"reading\":\""; 
    // // postData += sensorValue;
    // // postData += "\"}";

    // //TODO: Add LED Code

    String postData = "{\"reading\": 12 }";

    httpClient.post(addSensorReadingApi, contentType, postData);

    // read the status code and body of the response
    int statusCode = httpClient.responseStatusCode();
    String response = httpClient.responseBody();

    Serial.println("Status code: " + String(statusCode));
    Serial.println("Response: " + response);
  }

  delay(100000000);
}

void printWifiData() {
  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  
  Serial.println(ip);
}
