/* Create a WiFi access point and provide a web server on it. */
// include ESP8266 WIFI Libraries
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
//#include <ESP8266WebServer.h>
#include <WebSocketsServer.h>
#include <ESPAsyncTCP.h>
#include "ESPAsyncWebServer.h"
#include "FS.h"

// include libraries for NIR
#include "AS726X.h"
AS726X sensor;//Creates the sensor object


//Define Network Credentials
#ifndef APSSID
//#define APSSID "NIR Spectral Sensor"
//#define APPSK  "1234567890"
#define APSSID "PLDTHOMEDSL_Rumple/Aya"
#define APPSK  "misaku1212"
#endif

/* Set these to your desired credentials. */
const char *ssid = APSSID;
const char *password = APPSK;

//data structure for NIR
struct Spectral {
  float _610nm;
  float _680nm;
  float _730nm;
  float _780nm;
  float _810nm;
  float _860nm;
  float tempC;
} spectral;

//data structure for Users
struct User {
  String username = "admin";
  String password = "admin";
  int stats = 0;
} user;

//data structure for Settings
struct Setting {
  float sampling = 3;
  int gain = 3;
  int measurement_mode = 2;
  String company_name = "USTP";
  String license_code = "EXAMPLE";
  int remember = 0;
  int with_bulb = 0;
  int show_graph = 0;
  int show_misc = 0;
} setting;

uint8_t pin_led = 2;

//ESP8266WebServer server(80);

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

WebSocketsServer webSocket = WebSocketsServer(81);

void setup() {
  // put your setup code here, to run once:

  pinMode(pin_led, OUTPUT);
  Serial.begin(115200);
  //setting up NIR
  Wire.begin(4, 5);
  sensor.begin(Wire, setting.gain, setting.measurement_mode);
  sensor.setBulbCurrent(3);
  sensor.setIndicatorCurrent(0);


  // Connect to a WiFi network
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print(F("Connected to "));
  Serial.println(ssid);
  Serial.print(F("IP address: "));
  Serial.println(WiFi.localIP());

  //Configuring Access Point
  //  Serial.println(F("Configuring access point..."));
  //  WiFi.softAP(ssid, password); //You can remove the password parameter if you want the AP to be open.

  //  IPAddress myIP = WiFi.softAPIP();
  //  Serial.print("AP IP address: ");
  //  Serial.print(myIP);
  //  server.on("/", handleRoot);

  // Initialize SPIFFS
  if (!SPIFFS.begin()) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // During setup - keep a pointer to the handler
  AsyncStaticWebHandler* handler = &server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html").setCacheControl("max-age=600");

  // At a later event - change Cache-Control
  handler->setCacheControl("max-age=30");

  //  Route to ajax responsed file
  server.on("/login", HTTP_POST, [](AsyncWebServerRequest * request) {

    AsyncWebServerResponse *response;
    Serial.println("Someone wanna login!");
    //    Check if GET parameter exists
    if ((request->hasParam("username", true)) && (request->hasParam("password", true))) {
      AsyncWebParameter* username = request->getParam("username", true);
      AsyncWebParameter* password = request->getParam("password", true);
      Serial.print(F("Username: "));
      Serial.println(username->value().c_str());
      Serial.print(F("Password: "));
      Serial.println(password->value().c_str());
      if (user.username == username->value().c_str() && user.password == password->value().c_str()) {
        //        if (user.username == "admin" && user.password == "admin") {
        user.stats = true;
        Serial.println("Accepted!");
        response = request->beginResponse(200, "text/json", "{\"event\":\"login\",\"username\":\"" + String(user.username) + "\",\"password\":\"" + String(user.password) + "\",\"status\":" + user.stats + ",\"remember\":" + setting.remember + "}");
      }
      else {
        user.stats = false;
        Serial.println("Denied!");
        response = request->beginResponse(200, "text/json", "{\"event\":\"login\",\"username\":\"" + String(user.username) + "\",\"password\":\"" + String(user.password) + "\",\"status\":" + user.stats + ",\"remember\":" + setting.remember + "}");
      }
    }
    response->addHeader("Access-Control-Allow-Origin", "*");
    response->addHeader("Allow", "HEAD,GET,PUT,POST,DELETE,OPTIONS");
    response->addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT");
    response->addHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept");
    request->send(response);
  });

  //  Route to ajax responsed file
  server.on("/save_setting", HTTP_POST, [](AsyncWebServerRequest * request) {

    AsyncWebServerResponse *response;
    Serial.println("Someone wanna save!");
    //    Check if POST parameter exists
    if (request->hasParam("sampling", true) && request->hasParam("gain", true) && request->hasParam("measurement_mode", true) && request->hasParam("company_name", true) && request->hasParam("license_code", true) && request->hasParam("show_graph", true) && request->hasParam("show_misc", true) && request->hasParam("with_bulb", true)) {
      AsyncWebParameter* p = request->getParam("sampling", true);
      setting.sampling = p->value().toInt();
      p = request->getParam("gain", true);
      setting.gain = p->value().toInt();
      p = request->getParam("measurement_mode", true);
      setting.measurement_mode = p->value().toInt();
      p = request->getParam("company_name", true);
      setting.company_name = (String)p->value().c_str();
      p = request->getParam("license_code", true);
      setting.license_code = (String)p->value().c_str();
      p = request->getParam("with_bulb", true);
      setting.with_bulb = p->value().toInt();
      p = request->getParam("show_graph", true);
      setting.show_graph = p->value().toInt();
      p = request->getParam("show_misc", true);
      setting.show_misc = p->value().toInt();
      response = request->beginResponse(200, "text/json", "{\"event\":\"save_setting\",\"status\":\"saved\"}");
      //      response = request->beginResponse(200, "text/json", "{\"event\":\"save_setting\",\"sampling\":\"" + String(setting.sampling) + "\",\"gain\":\"" + String(setting.gain) + "\",\"measurement\":" + setting.measurement_mode + ",\"company_name\":" + setting.company_name + ",\"show_graph\":" + setting.show_graph + ",\"show_misc\":" + setting.show_misc + ",\"license_code\":" + setting.license_code + "}");
      Serial.println("Saved!");
      response->addHeader("Access-Control-Allow-Origin", "*");
      response->addHeader("Allow", "HEAD,GET,PUT,POST,DELETE,OPTIONS");
      response->addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT");
      response->addHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept");
    } else {
      response = request->beginResponse(200, "text/json", "{\"event\":\"save_setting\",\"status\":\"error\"}");
      response->addHeader("Access-Control-Allow-Origin", "*");
      response->addHeader("Allow", "HEAD,GET,PUT,POST,DELETE,OPTIONS");
      response->addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT");
      response->addHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept");
      Serial.println("Not saved!");
    }
    request->send(response);
  });

  //  Route to ajax responsed file
  server.on("/load_setting", HTTP_POST, [](AsyncWebServerRequest * request) {
    Serial.println("Someone wanna load the setting!");
    AsyncWebServerResponse *response = request->beginResponse(200, "text/json", "{\"event\":\"load_setting\",\"status\":\"loaded\",\"sampling\":" + (String)setting.sampling + ",\"gain\":" + (String)setting.gain + ",\"measurement_mode\":" + (String)setting.measurement_mode + ",\"company_name\":\"" + (String)setting.company_name + "\",\"show_graph\":" + (String)setting.show_graph + ",\"with_bulb\":" + (String)setting.with_bulb + ",\"show_misc\":" + (String)setting.show_misc + ",\"license_code\":\"" + (String)setting.license_code + "\"}");
    sensor.setGain(setting.gain);
    sensor.setMeasurementMode(setting.measurement_mode);
    Serial.println("Loaded!");

    response->addHeader("Access-Control-Allow-Origin", "*");
    response->addHeader("Allow", "HEAD,GET,PUT,POST,DELETE,OPTIONS");
    response->addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT");
    response->addHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept");
    request->send(response);
  });

  //  server.onNotFound(handleNotFound);

  server.begin();
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  Serial.println();
  Serial.println(F("\HTTP server started"));
}
//void handleNotFound()
//{
//  server.send(404, "text/plain", "");
//}
void loop() {
  // put your main code here, to run repeatedly:
  webSocket.loop();

  //  server.handleClient();
  //  if(Serial.available() > 0){
  //    char c[] = {(char)Serial.read()};
  //    webSocket.broadcastTXT(c, sizeof(c));
  //  }
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_TEXT) {
    if (payload[0] == '*') {
      scan('*');
    }
    else if (payload[0] == '#') {
      scan('#');
    }
    else {
      for (int i = 0; i < length; i++)
        Serial.print((char) payload[i]);
      Serial.println();
    }
  }

}
void scan(char args) {
  int count = 0;
  (!sensor.dataAvailable()) ? sensor.enableIndicator() : sensor.disableIndicator();
  while (count < setting.sampling) {
    (setting.with_bulb) ? sensor.takeMeasurementsWithBulb() : sensor.takeMeasurements();
    //        (sensor.dataAvailable()) ? Spectral spectral : NULL;
    if (sensor.getVersion() == SENSORTYPE_AS7263)
    {
      //  Get all NIR channel reading and store to a composite variable
      spectral._610nm += sensor.getCalibratedR();
      spectral._680nm += sensor.getCalibratedS();
      spectral._730nm += sensor.getCalibratedT();
      spectral._780nm += sensor.getCalibratedU();
      spectral._810nm += sensor.getCalibratedV();
      spectral._860nm += sensor.getCalibratedW();
      spectral.tempC += sensor.getTemperature();

      //  Display the NIR channel readings to Serial Monitor
      //      Serial.print(spectral._610nm , 2);
      //      Serial.print(",");
      //      Serial.print(spectral._680nm, 2);
      //      Serial.print(",");
      //      Serial.print(spectral._730nm , 2);
      //      Serial.print(",");
      //      Serial.print(spectral._780nm , 2);
      //      Serial.print(",");
      //      Serial.print(spectral._810nm , 2);
      //      Serial.print(",");
      //      Serial.print(spectral._860nm , 2);
    }
    //    Serial.print("|\ttempC[");
    //    Serial.print(spectral.tempC , 1);
    //    Serial.print("]\n");
    count++;
  }
  spectral._610nm = spectral._610nm / setting.sampling;
  spectral._680nm = spectral._680nm / setting.sampling;
  spectral._730nm = spectral._730nm / setting.sampling;
  spectral._780nm = spectral._780nm / setting.sampling;
  spectral._810nm = spectral._810nm / setting.sampling;
  spectral._860nm = spectral._860nm / setting.sampling;
  spectral.tempC = spectral.tempC / setting.sampling;
  String spectral_data;
  if (args == '*') {
    spectral_data= "{\"Ch1\":" + String(spectral._610nm) + ",\"Ch2\":" + String(spectral._680nm) + ",\"Ch3\":" + String(spectral._730nm) + ",\"Ch4\":" + String(spectral._780nm) + ",\"Ch5\":" + String(spectral._810nm) + ",\"Ch6\":" + String(spectral._860nm) + ",\"TempC\":" + String(spectral.tempC) + ",\"dist\":\"predicting\"}";
  } else {
    spectral_data = "{\"Ch1\":" + String(spectral._610nm) + ",\"Ch2\":" + String(spectral._680nm) + ",\"Ch3\":" + String(spectral._730nm) + ",\"Ch4\":" + String(spectral._780nm) + ",\"Ch5\":" + String(spectral._810nm) + ",\"Ch6\":" + String(spectral._860nm) + ",\"TempC\":" + String(spectral.tempC) + ",\"dist\":\"labeling\"}";
  }
  webSocket.broadcastTXT(spectral_data);
  spectral._610nm = 0;
  spectral._680nm = 0;
  spectral._730nm = 0;
  spectral._780nm = 0;
  spectral._810nm = 0;
  spectral._860nm = 0;
  spectral.tempC = 0;
}
