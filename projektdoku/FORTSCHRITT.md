# Fortschritt – Skibrille mit Funk, GPS und Display

Stand: 10. November 2026

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
- **Stückliste** (`hardware/bom.csv`) mit Preisschätzung angelegt.
- Datenblatt und Schaltplan des Boards als PDF abgelegt (`hardware/quellen`).

### Website (Vite, Three.js, GSAP)
- Startseite (`index.html`), Brillenseite (`brille.html`), Schmuckseite (`schmuck.html`).
- 3D-Ansicht (`src/viewer3d.js`), Produktdaten (`src/products.js`), Schaltplan (`public/schaltplan.svg`).
- Build-Ordner `dist/` vorhanden (nicht in Git, steht in `.gitignore`).

## Termine

- **6. November 2026:** 2 × Heltec Wireless Tracker (HF 868 MHz) bei Tinytronics bestellen. Stand 10.11.: **Boards noch nicht da** (ob bestellt, bitte ergänzen).

## Offen: Entscheidungen und Klärungen

| Punkt | Was zu tun ist |
|---|---|
| **Board ist V1.2, Unterlagen nur für V1.1** | Heltec-Support (support@heltec.cn) oder Tinytronics fragen: Schaltplan, Pinplan, Änderungen zu V1.1. Vor dem Anschließen von Taster, Kompass, Mikrofon klären. |
| Akku-Stecker | JST XH (2,5 mm) passt nicht ins Board. Nach Ankunft der Boards: Polung am Batteriekabel prüfen, dann löten (siehe `UEBERGABE.md`). |
| Magnetstecker | Nicht wasserdicht im gesteckten Zustand. Unter den Kragen legen, Abreißverhalten testen. |
| Stückliste aktualisieren | `bom.csv` nennt beim Board noch V1.1 und OpenELab (liefert laut dir nicht nach Österreich). Auf Tinytronics und V1.2 anpassen. Akku ist schon auf RS PRO umgestellt. |

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

- Sind die Boards bestellt, und wann kommen sie?
- Sind Lötkolben, Schrumpfschlauch und ein USB-C-Datenkabel vorhanden?
- Stand der Website: was fehlt noch (Texte, Bilder, Veröffentlichung)?
- Termin oder Ziel (z. B. Skisaison)?

## Hinweise

- Laden nur im Warmen (über 0 °C), nie draußen bei Frost.
- Nur Akkus mit Schutzschaltung, Akku nicht am Kopf oder im Helm, Helm nicht verändern.
- Akku-Laufzeit, Reichweite und Kältefestigkeit sind bisher gerechnet oder aus Händlerangaben, nicht gemessen.
