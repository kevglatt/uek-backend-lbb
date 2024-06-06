LB-b
==

Alle Abhängigkeiten installieren:
````bash
npm install
````

Das Projekt starten:
````shell
nodemon --watch .\controller.js --watch .\swagger.js --exec "npm start"
````

Tests
----
Die Postman Test-Collection wurde exportiert. Diese einfach bei Postman importieren.

Damit die Tests einwandfrei laufen, muss zuerst der POST "login" Request ausgeführt werden.

API Dokumentation
---
Die Rest Endpunkte wurden mit Swagger autogen generiert. Sobald das Projekt läuft sieht man sie unter folgendem Link  http://localhost:3000/api-docs