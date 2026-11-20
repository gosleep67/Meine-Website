# Fortschritt – Skibrille mit Funk, GPS und Display

Stand: 16. November 2026

Ich kenne nur, was im Projektordner steht (Website und `hardware/`). Was du schon bestellt, gekauft oder gelötet hast, steht dort nicht. Das ist unten als „bitte ergänzen“ markiert.

## Erledigt

### Recherche und Auswahl (Stand 2. November 2026, siehe `hardware/`)
- **Board gewählt:** Heltec Wireless Tracker (ESP32-S3, LoRa SX1262, GPS, 0,96"-TFT). Modell HF (868 MHz), Bezug bei Tinytronics (liefert nach Österreich, ca. 23,50 €). Antenne und Adapterkabel liegen bei.
- **Akku gewählt (6.11.):** RS PRO LiPo 3,7 V 2 Ah, RS-Nr. 125-1266 (Modell SR674361P), von RS Österreich. Schutzschaltung, Entladen −20 bis 60 °C, Laden 0–45 °C, 63 × 43,5 × 7 mm, 40 g, Stecker JST XH 2,5 mm. Ersetzt den Electrokit-Akku, weil Electrokit nicht nach Österreich liefert.

### Akkus angekommen (10. November 2026)
- **2 Akkus da und geprüft:** 3,85 V und 3,84 V, Rot = Plus, flach und unbeschädigt, Herstelldatum 17.07.2026.
- Der Akku-Stecker (JST XH, 2,5 mm) passt nicht ins Board (1,25 mm). Lösung: Akkukabel an das mitgelieferte Batteriekabel des Boards löten (Plan in `UEBERGABE.md`). Erst wenn die Boards da sind, weil die Polung am Board-Kabel geprüft werden muss.
- Bis dahin: Akkus mit Stecker bei Zimmertemperatur auf nicht brennbarer Unterlage lagern.
- **Akku-Konzept:** Akku in der Jacken-Innentasche, 60–80 cm Silikonkabel, magnetischer Abreißstecker unter dem Kragen, Sicherung (PPTC) am Pluspol.
- **Pinbelegung** des Boards (V1.1) dokumentiert: frei sind GPIO 4, 5, 6, 7, 17, 37.
- **Stückliste** (`hardware/bom.csv`) mit Preisschätzung angelegt, am 10.11. auf den aktuellen Stand gebracht (2 × Board V1.2 von Tinytronics, 2 × RS-Akku, Lötzubehör).
- Datenblatt und Schaltplan des Boards als PDF abgelegt (`hardware/quellen`).

### Boards angekommen und erste Prüfungen (16.–20. November 2026)
- **2 × Heltec Wireless Tracker V1.2** von Tinytronics erhalten (Version auf der Platine bestätigt).
- Lieferumfang: LoRa-Antenne (SMA), Adapterkabel IPEX-1/U.FL auf SMA, Batteriekabel 1,25 mm (rot/schwarz, Enden blank), Stiftleisten, ein dünnes IPEX-Kabel mit blanker Spitze.
- **Adapterkabel Board 1 war defekt:** Das Koaxkabel war aus der SMA-Buchse gerissen. Selbst angelötet, mit Multimeter geprüft (Mitte–Mitte Durchgang, Schirm–Schirm Durchgang, Mitte–Schirm kein Durchgang), mit Schrumpfschlauch isoliert. Antenne an Buchse „LoRa“ (rechts) gesteckt.
- **Polung Batteriekabel geprüft (20.11.):** Board per USB-C am Computer, am Batteriekabel gemessen: **+4,14 V, Rot = Plus**. Passt zum Akku (Rot = Plus). USB-C-Kabel funktioniert (auch Daten, siehe unten).
- Hinweis: Der Akku-Stecker (JST XH 2,5 mm) passt wie erwartet nicht in die Board-Buchse, nichts beschädigt.
- **Meshtastic geflasht (Board 1, 20.11.):** flasher.meshtastic.org, Gerät „Heltec Wireless Tracker V1.1“ (V1.2 ist dort nicht gelistet), Firmware 2.7.26 Beta, „Löschen und Installieren“, 115200 Baud. Erst „Failed to connect“, mit USER-Taste + RST in den Boot-Modus gebracht, dann 100 %. **USB-C-Kabel kann Daten** (VendorID 0x303a erkannt).
- **Board 1 eingerichtet (20.11.):** Willkommens-Menü am Board mit USER-Taste bestätigt (kurz = weiter, lang = auswählen), Region am Board gewählt, wurde aber **nicht gespeichert**. Mit der Meshtastic-App am iPhone per Bluetooth verbunden (PIN vom Display, Name **Meshtastic_1a68**). **Region EU_868** dann in der App über **Verbinden → „Set Up Radio“** gesetzt (unter Einstellungen → LoRa war sie nicht auswählbar). Preset: Long Range – Fast.
- **Erster Außentest Board 1 (20.11., abends):** Powerbank über USB-C. **GPS-Fix nach wenigen Minuten: 28 Satelliten**, Position und Höhe am Display, „No Heading“ (normal, noch kein Kompass). **Funkempfang funktioniert:** Fremde Meshtastic-Knoten in der Umgebung werden über LoRa empfangen (am Abend 24 Knoten in der Liste, teils direkt, teils über 2 Hops) (Antenne und selbst gelötetes Antennenkabel ok). Die Meshtastic-Firmware „Wireless Tracker V1.1“ funktioniert damit auch auf der V1.2 (Display, GPS, LoRa). Auf der Platine steht „HTIT-Tracker V1.2“.

### Website (Vite, Three.js, GSAP)
- Startseite (`index.html`), Brillenseite (`brille.html`), Schmuckseite (`schmuck.html`).
- 3D-Ansicht (`src/viewer3d.js`), Produktdaten (`src/products.js`), Schaltplan (`public/schaltplan.svg`).
- Build-Ordner `dist/` vorhanden (nicht in Git, steht in `.gitignore`).

## Termine

- **6. November 2026:** 2 × Heltec Wireless Tracker (HF 868 MHz) bei Tinytronics bestellen. **Beide Boards am 16.11. angekommen.** Händler: Tinytronics. Version laut Platine: **V1.2** (bestätigt 16.11.).

## Offen: Entscheidungen und Klärungen

| Punkt | Was zu tun ist |
|---|---|
| **Board ist V1.2, Unterlagen nur für V1.1** | Heltec-Support (support@heltec.cn) oder Tinytronics fragen: Schaltplan, Pinplan, Änderungen zu V1.1. Vor dem Anschließen von Taster, Kompass, Mikrofon klären. |
| Akku-Stecker | JST XH (2,5 mm) passt nicht ins Board. Nach Ankunft der Boards: Polung am Batteriekabel prüfen, dann löten (siehe `UEBERGABE.md`). |
| Magnetstecker | Nicht wasserdicht im gesteckten Zustand. Unter den Kragen legen, Abreißverhalten testen. |

## Offen: Aufbau und Tests (nach Lieferung)

1. Antenne an den LoRa-Anschluss stecken, **bevor** Strom anliegt.
2. Pin-Beschriftung mit dem Pinplan vergleichen (GPIO 3, 4, 5, 6, 7, 17, 21, 37).
3. Polung am Batteriekabel des Boards prüfen, Akku anlöten, vor dem Anstecken mit Multimeter messen (Akkus selbst sind schon geprüft).
4. Board per USB-C starten, Meshtastic flashen (`flasher.meshtastic.org`, Chrome oder Edge), Region EU_868 setzen.
5. GPS-Fix draußen testen (einige Minuten). GPIO 3 muss HIGH sein.
6. Funktest mit zwei Boards und Handy (Bluetooth, Meshtastic-App). Reichweite messen.
7. Akku: Laufzeit, Temperatur in der Innentasche (einen Skitag, mit Thermometer), Zugtest Magnetstecker, Dichtigkeit im Schnee.
8. Später: Taster, Kompass QMC5883L, Mikrofon INMP441, Gehäuse (3D-Druck), eigene Platine (Board ist für die Brille zu groß).

## Bitte ergänzen (weiß ich nicht)

- ~~Version~~ erledigt: V1.2 (16.11.)
- Sind Lötkolben, Schrumpfschlauch und ein USB-C-Datenkabel vorhanden? (Multimeter ist vorhanden.)
- Stand der Website: was fehlt noch (Texte, Bilder, Veröffentlichung)?
- Termin oder Ziel (z. B. Skisaison)?

## Hinweise

- Laden nur im Warmen (über 0 °C), nie draußen bei Frost.
- Nur Akkus mit Schutzschaltung, Akku nicht am Kopf oder im Helm, Helm nicht verändern.
- Akku-Laufzeit, Reichweite und Kältefestigkeit sind bisher gerechnet oder aus Händlerangaben, nicht gemessen.
