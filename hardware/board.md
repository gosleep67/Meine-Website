# Board: Heltec Wireless Tracker V1.2 (Unterlagen von V1.1)

Alles zum Board in einer Datei. Stand: 2. November 2026.

Quellen: Datenblatt „Wireless Tracker V1.1“ (Rev 1.1.1) und Schaltplan „HTIT-Tracker_V0.5“, beide von der Heltec-Seite heruntergeladen (Ordner `quellen`), außerdem Heltec-Pinplan, Heltec-Hardware-Update-Log und die OpenELab-Produktseite.

**Wichtig: Das Board ist V1.2.** Auf der Heltec-Seite gibt es Datenblatt, Schaltplan und Pinplan nur für V1.0 und V1.1. Zu V1.2 habe ich keine eigenen Unterlagen gefunden und nichts darüber, was sich geändert hat. Alle Pin- und Strom-Angaben in dieser Datei stammen von V1.1 und sind für V1.2 **nicht bestätigt**.

## 1. Was es ist

Ein fertiges Entwicklungsboard mit Controller, LoRa-Funk, GPS und Display. Für den Prototyp der Skibrille ersetzt es Funk, GPS und Display auf einmal.

## 2. Technische Daten

| Punkt | Wert |
|---|---|
| Controller | ESP32-S3FN8, Dual-Core, WLAN und Bluetooth 5 (BLE) |
| Funkchip | SX1262 (LoRa) |
| GPS | UC6580, L1 + L5, GPS/GLONASS/BDS/Galileo, Kaltstart < 26 s, Genauigkeit ca. 1,5 m |
| Frequenz | zwei Modelle: **LF** 470–510 MHz (China) und **HF** 863–928 MHz (EU868, US915 u. a.) |
| Sendeleistung | max. 21 ± 1 dBm (867–870 MHz und 902–928 MHz) |
| Empfindlichkeit | −135 dBm (SF12, 125 kHz) |
| Display | 0,96" TFT, 160×80, eingebaut |
| Anschlüsse | USB-C, Akku-Anschluss (1,25 mm, laut Datenblatt „SH1.25-2“, laut Tinytronics Molex PicoBlade-kompatibel), LoRa-Antenne (IPEX/U.FL), GNSS-Antenne (IPEX/U.FL) |
| Antennen | WLAN/Bluetooth: eingebaute Federantenne. GPS: eingebaute Antenne (weißes Quadrat auf der Platine) und zusätzlich eine IPEX-Buchse. **LoRa: keine eingebaute Antenne**, nur eine IPEX-Buchse |
| Akku | 3,7-V-LiPo, Laden und Überladeschutz auf dem Board |
| Betriebstemperatur | −20 °C bis 70 °C |
| Maße | 65,48 × 28,06 × 13,52 mm |

### Stromverbrauch (aus dem Datenblatt, Akkubetrieb)

| Modus | Strom |
|---|---|
| GPS an | 89 mA |
| Empfang (RX) | 59 mA |
| Senden bei 14 / 17 / 22 dBm | 148 / 163 / 178 mA |
| Bluetooth | 75 mA |
| Schlafmodus | 15 µA |

Grobe Rechnung von mir (nicht gemessen): GPS und Empfang zusammen sind ca. 150 mA. Mit einem Akku von 1000 mAh wären das etwa 6–7 Stunden, bei Kälte eher weniger. Ein Akku mit 2000 mAh hält entsprechend länger.

### Stromversorgung

- Es darf nur **eine** Stromquelle angeschlossen sein. Ausnahme: Ein Akku darf zum Laden zusätzlich an USB oder den 5-V-Pin.
- Ausgänge: 3,3 V bis 500 mA, Vext bis 350 mA (versorgt TFT und GPS).
- Akku-Eingang: 3,3–4,2 V, der Akku muss mindestens 250 mA liefern können.

## 3. Kaufen

| Händler | Preis (ca.) | Link |
|---|---|---|
| Tinytronics (Niederlande, Lager Eindhoven, 868 MHz) | 23,50 € inkl. MwSt., laut Seite über 100 Stück auf Lager | https://www.tinytronics.nl/nl/development-boards/microcontroller-boards/met-gps/heltec-wireless-tracker-v1.1-esp32-s3-sx1262-lora-868mhz-gnss-met-0.96-inch-tft-display |
| Heltec-Shop (Hersteller, China) | ca. 22,90 $ | https://heltec.org/shop-default/new-incomes/page/10 |
| Rokland (USA, Seite „en-de“) | 29,95 € | https://store.rokland.com/en-de/products/heltec-wireless-tracker-v1-1-wi-fi-lora-bt-gnss |
| OpenELab EU (868 MHz) | 25–29 € | https://openelab.io/fi/products/heltec-wireless-tracker-esp32s3-gps |

OpenELab liefert laut dir nicht nach Österreich. **Tinytronics liefert laut dir nach Österreich** und ist damit die Wahl für die Bestellung. Die Versandkosten siehst du im Warenkorb. Ob Heltec und Rokland nach Österreich liefern, habe ich nicht bestätigt. Bei Bestellungen aus China (Heltec-Shop) kommen Zoll- oder Mehrwertsteuerkosten dazu. Die Preise stammen aus Händlerlisten und können sich ändern.

Lieferumfang laut Tinytronics-Produktseite: 1 × Wireless Tracker, 2 × Stiftleiste 16-polig, 2 × Stiftleiste 8-polig, 1 × SMA-LoRa-Antenne 868 MHz, 1 × IPEX-auf-SMA-Adapterkabel, 1 × Akku-Kabel. Das USB-Kabel ist nicht dabei.

Anschlüsse laut Tinytronics: Akku-Stecker Molex PicoBlade (kompatibel), LoRa-Antenne IPEX/MHF1 (U.FL), WLAN/Bluetooth-Antenne eingebaut, GPS-Antenne eingebaut (zusätzlich IPEX-Buchse).

## 4. Was passt

- Controller, LoRa-Chip, GPS, Display, USB-C und Akkuladung sind vorhanden und passen zum Plan.
- Das HF-Modell deckt EU868 ab (863–870 MHz, laut Datenblatt-Tabelle). Die Region wird in der Software auf EU_868 gestellt.
- Bluetooth ist vorhanden, damit das Handy später Sprache in Text umwandeln und ans Board schicken kann.
- Eine Antenne und ein Akku-Anschlusskabel gehören zum Standard-Lieferumfang.
- Das Board ist V1.1 mit zusätzlichem GPS-Spannungsregler. Dort muss GPIO 3 auf HIGH, damit das GPS Strom bekommt (Hardware-Update-Log).
- Preis ca. 25–29 € in der EU.

## 5. Was noch geprüft werden muss

### Vor dem Kauf

| Punkt | Warum | Wie prüfen |
|---|---|---|
| **Modell HF, nicht LF** | Das Datenblatt führt beide Bänder in einer Zeile, aber es sind zwei Modelle. Das LF-Modell (470–510 MHz) ist für China und für Europa nicht geeignet. | Erledigt: Tinytronics nennt 868 MHz und das Modell „Wireless Tracker-HF“ |
| LoRa-Antenne | Das Board hat für LoRa keine eingebaute Antenne. Bei Tinytronics liegt laut Produktseite eine SMA-Antenne für 868 MHz mit IPEX-auf-SMA-Kabel im Paket. | Erledigt, wenn du bei Tinytronics bestellst |
| **V1.2 ohne Unterlagen** | Das Board ist V1.2. Heltec hat nur Unterlagen für V1.0 und V1.1 veröffentlicht. Was V1.2 ändert, habe ich nirgends gefunden. | Heltec-Support (support@heltec.cn) oder Heltec-Forum nach Schaltplan, Pinplan und Änderungen zu V1.1 fragen. Auch bei Tinytronics nachfragen |
| USB-Kabel im Paket? | Tinytronics liefert kein USB-Kabel mit. | Datenkabel USB-C separat besorgen |
| Lagerstand, Lieferzeit, Zoll | Ein Händler (Kawkav) zeigte „nicht lieferbar“. Die OpenELab-Seite nennt 10–20 Tage Lieferzeit aus China. | Seite ansehen, EU-Lager bevorzugen |

### Nach dem Auspacken (noch ohne Strom)

| Punkt | Warum | Wie prüfen |
|---|---|---|
| Antenne anstecken | Ohne Antenne kann die Endstufe Schaden nehmen. | IPEX-Antenne an „LoRa“ stecken |
| Pin-Beschriftung | Neben den Stiftleisten stehen die GPIO-Nummern auf der Platine. Bei V1.2 gibt es keinen bestätigten Pinplan. | Beschriftung mit dem Pinplan in dieser Datei vergleichen, besonders GPIO 3, 4, 5, 6, 7, 17, 21 und 37 |
| Akku-Stecker und Polung | Falsche Polung kann das Board zerstören. Das Datenblatt sagt nichts zur Belegung. | Plus und Minus mit dem Board abgleichen, Kabel im Zweifel tauschen |

### Beim ersten Einschalten

| Punkt | Wie prüfen |
|---|---|
| Board startet, TFT zeigt etwas | USB-C anschließen |
| Flashen klappt (falls Meshtastic fehlt) | `flasher.meshtastic.org` mit Chrome oder Edge |
| Region EU_868 gesetzt | Meshtastic-App, LoRa-Einstellungen |
| GPS-Fix | Draußen mit freiem Himmel, einige Minuten warten |
| Aktuelle Firmware | Frühere Meshtastic-Versionen hatten Probleme mit dem GPS der V1.1, laut Händler behoben |

## 6. Pinbelegung des Boards

Abgeglichen mit Datenblatt (Tabellen J2/J3) und Schaltplan von V1.1. **Für V1.2 nicht bestätigt.**

### Schon belegt (nicht anfassen)

| GPIO | Funktion |
|---|---|
| 8, 9, 10, 11, 12, 13, 14 | LoRa: NSS, SCK, MOSI, MISO, RST, Busy, DIO1 |
| 33, 34 | GPS UART (GNSS_TX, GNSS_RX) |
| 35, 36 | GPS Reset und PPS |
| 47, 48 | GPS-Modul: Boot_Mode und D_SEL |
| 3 | Vext-Steuerung (Strom für GPS und TFT, HIGH = an) |
| 1 | Akkuspannung messen (VBAT = Messwert × 4,9) |
| 2 | ADC-Steuerung |
| 38, 39, 40, 41, 42 | TFT (CS, RES, RS, SCLK, SDIN) |
| 21 | TFT-Hintergrundlicht |
| 19, 20 | USB (D−, D+) |
| 43, 44 | Konsole (UART0) |
| 0 | User-Taster / Boot |
| 26 | Flash (SPICS1), vermeiden |
| 15, 16 | 32,768-kHz-Quarz (im Pinplan als „Connected“ markiert, im Schaltplan mit Kondensatoren eingezeichnet) |

### Frei nutzbar

| GPIO | Status |
|---|---|
| 4, 5, 6, 7 | frei (ADC1, Touch) |
| 17 | frei (UART1 TX) |
| 37 | frei |
| 18 | steuert die weiße Zusatz-LED („LED Write Ctrl“). Nutzbar, die LED kann dabei leuchten. |
| 45, 46 | Boot-Pins (Strapping) des ESP32-S3. Nur mit Vorsicht: nach dem Start als Ein-/Ausgang nutzbar, aber beim Einschalten dürfen keine Bauteile den Pegel festhalten. |

Sicher frei sind 4, 5, 6, 7, 17 und 37. GPIO 18 geht mit Einschränkung, GPIO 45 und 46 nur mit Vorsicht. Das sind neun Pins.

Hinweis: Der große Heltec-Pinplan (Bild „HT-Tracker_V1 Pin map“, auf der Platine steht „HTIT-Tracker V1.0“) stimmt Pin für Pin mit der Tabelle oben überein. Er gilt für V1.0 und V1.1. Für V1.2 ist er nicht bestätigt.

## 7. Grenzen, die man kennen sollte

| Punkt | Folge |
|---|---|
| −20 °C Betriebstemperatur | Beim Skifahren kann es kälter werden. Muss getestet werden. |
| 65 × 28 × 13,5 mm | Für die Brille zu groß. Nur für den Prototyp, später eigene Platine. |
| Nur eine Stromquelle | Nicht gleichzeitig USB und 5-V-Pin anschließen. |
| 10 % Sendezeit pro Stunde im EU-868-Band (laut Meshtastic) | Reicht für Text, nicht für Dauer-Tracking. |
| Akkulaufzeit | Nicht gemessen, nur grob gerechnet (siehe oben). |
| Reichweite | Nicht gemessen, kommt aus deinen Tests. |

## 8. Was noch fehlt (mitbestellen oder bereithalten)

| Was | Wofür |
|---|---|
| **Zweites Board** | Für den Funktest braucht man zwei Geräte. |
| USB-C-**Datenkabel** | Zum Flashen. Reine Ladekabel reichen nicht. |
| Handy mit Bluetooth und Meshtastic-App | Zum Koppeln und für den Funktest. |
| Computer mit Chrome oder Edge | Für `flasher.meshtastic.org`. |
| Multimeter | Akku-Polung am Stecker prüfen, bevor er ans Board kommt. |
| Lötkolben und Lötzinn | Die 2 mitgelieferten Stiftleisten müssen vermutlich angelötet werden, bevor das Board ins Steckbrett passt. Für den ersten Funktest nicht nötig. |
| Küchenwaage | Board und Akku wiegen. |
| Zweiter Akku-Stecker (SH1.25) | Falls du später einen anderen Akku anschließen willst. Ein Anschlusskabel liegt dem Paket bei. |

Eine LoRa-Antenne musst du nicht extra kaufen. Bei Tinytronics liegt eine 868-MHz-Antenne mit Adapterkabel im Paket. Die Stiftleisten sind lose beigelegt und müssen angelötet werden, wenn du das Board ins Steckbrett stecken willst.

## 9. Ergebnis

Das Board passt für den Prototyp: günstig, mit Funk, GPS, Display und Meshtastic. Bei Tinytronics stimmen Modell (HF, 868 MHz) und Antenne. Offen ist V1.2: Dazu gibt es keine eigenen Unterlagen. Ob die Meshtastic-Firmware V1.2 richtig erkennt, ist nicht bestätigt. Bevor du Taster, Kompass oder Mikrofon anschließt, müssen die Pins für V1.2 bestätigt sein. Nach dem Auspacken zuerst die Antenne anstecken, die Pin-Beschriftung auf der Platine mit dem Pinplan abgleichen und die Akku-Polung prüfen. Danach geht es weiter mit Akku, Kompass und Mikrofon.
