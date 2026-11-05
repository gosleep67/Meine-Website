# Fortschritt – Skibrille mit Funk, GPS und Display

Stand: 5. November 2026

Ich kenne nur, was im Projektordner steht (Website und `hardware/`). Was du schon bestellt, gekauft oder gelötet hast, steht dort nicht. Das ist unten als „bitte ergänzen“ markiert.

## Erledigt

### Recherche und Auswahl (Stand 2. November 2026, siehe `hardware/`)
- **Board gewählt:** Heltec Wireless Tracker (ESP32-S3, LoRa SX1262, GPS, 0,96"-TFT). Modell HF (868 MHz), Bezug bei Tinytronics (liefert nach Österreich, ca. 23,50 €). Antenne und Adapterkabel liegen bei.
- **Akku gewählt:** Electrokit LiPo 3,7 V 2000 mAh (Entladen −20 bis 55 °C, mit Schutzschaltung). Bestellweg über die Adresse deiner Freundin in Deutschland.
- **Akku-Konzept:** Akku in der Jacken-Innentasche, 60–80 cm Silikonkabel, magnetischer Abreißstecker unter dem Kragen, Sicherung (PPTC) am Pluspol.
- **Pinbelegung** des Boards (V1.1) dokumentiert: frei sind GPIO 4, 5, 6, 7, 17, 37.
- **Stückliste** (`hardware/bom.csv`) mit Preisschätzung angelegt.
- Datenblatt und Schaltplan des Boards als PDF abgelegt (`hardware/quellen`).

### Website (Vite, Three.js, GSAP)
- Startseite (`index.html`), Brillenseite (`brille.html`), Schmuckseite (`schmuck.html`).
- 3D-Ansicht (`src/viewer3d.js`), Produktdaten (`src/products.js`), Schaltplan (`public/schaltplan.svg`).
- Build-Ordner `dist/` vorhanden (nicht in Git, steht in `.gitignore`).

## Termine

- **6. November 2026:** 2 × Heltec Wireless Tracker (HF 868 MHz) bestellen (Tinytronics). Vorher bei Tinytronics nachfragen, welche Board-Version (V1.2?) geliefert wird.

## Offen: Entscheidungen und Klärungen

| Punkt | Was zu tun ist |
|---|---|
| **Board ist V1.2, Unterlagen nur für V1.1** | Heltec-Support (support@heltec.cn) oder Tinytronics fragen: Schaltplan, Pinplan, Änderungen zu V1.1. Vor dem Anschließen von Taster, Kompass, Mikrofon klären. |
| Akku-Versand | Electrokit liefert nicht nach Österreich. Regeln des Paketdienstes für Lithium-Akkus prüfen (Freundin schickt oder bringt mit). |
| Akku-Alternative | Falls Electrokit scheitert: BerryBase LP-785060 (nur 0–45 °C, derzeit nicht lieferbar) oder Reichelt, Conrad, Amazon.de prüfen. Für den ersten Test geht eine kleine Powerbank mit „Always on“-Modus. |
| Magnetstecker | Nicht wasserdicht im gesteckten Zustand. Unter den Kragen legen, Abreißverhalten testen. |
| Stückliste aktualisieren | `bom.csv` nennt noch V1.1, OpenELab (liefert laut dir nicht nach Österreich) und ein OLED. Auf Tinytronics und V1.2 anpassen. |

## Offen: Aufbau und Tests (nach Lieferung)

1. Antenne an den LoRa-Anschluss stecken, **bevor** Strom anliegt.
2. Pin-Beschriftung mit dem Pinplan vergleichen (GPIO 3, 4, 5, 6, 7, 17, 21, 37).
3. Akku-Polung am Stecker mit Multimeter prüfen.
4. Board per USB-C starten, Meshtastic flashen (`flasher.meshtastic.org`, Chrome oder Edge), Region EU_868 setzen.
5. GPS-Fix draußen testen (einige Minuten). GPIO 3 muss HIGH sein.
6. Funktest mit zwei Boards und Handy (Bluetooth, Meshtastic-App). Reichweite messen.
7. Akku: Laufzeit, Temperatur in der Innentasche (einen Skitag, mit Thermometer), Zugtest Magnetstecker, Dichtigkeit im Schnee.
8. Später: Taster, Kompass QMC5883L, Mikrofon INMP441, Gehäuse (3D-Druck), eigene Platine (Board ist für die Brille zu groß).

## Bitte ergänzen (weiß ich nicht)

- Was ist schon bestellt oder angekommen?
- Wurde schon etwas gelötet, geflasht oder getestet?
- Stand der Website: was fehlt noch (Texte, Bilder, Veröffentlichung)?
- Termin oder Ziel (z. B. Skisaison)?

## Hinweise

- Laden nur im Warmen (über 0 °C), nie draußen bei Frost.
- Nur Akkus mit Schutzschaltung, Akku nicht am Kopf oder im Helm, Helm nicht verändern.
- Akku-Laufzeit, Reichweite und Kältefestigkeit sind bisher gerechnet oder aus Händlerangaben, nicht gemessen.
