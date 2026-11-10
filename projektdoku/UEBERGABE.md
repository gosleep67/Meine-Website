# Übergabe für einen neuen Chat – Skibrille „Peak Link“

Stand: 10. November 2026. Diese Datei am Anfang eines neuen Chats mitschicken.

## Wer ich bin und was ich will

- Ich wohne in **Österreich**. Bei jedem Shop immer sagen, **ob er nach Österreich liefert** (und Versandkosten). Wenn das nicht geprüft ist, so kennzeichnen.
- Ich bin Anfänger in Elektronik. Bitte Schritt für Schritt erklären, auf Deutsch, einfache Sprache.
- Projektordner: `C:\Users\fabis\Documents\meine-website` (Git-Repo, Website mit Vite, Three.js, GSAP).

## Das Projekt

Eine smarte Skibrille mit LoRa-Gruppenfunk, ohne Handynetz:
- **Links Taster:** Modus wechseln. **Rechts Taster:** Lied vor und zurück.
- **Kleines Display rechts unten:** Richtung und Entfernung zu den Freunden.
- **Sprachnachrichten:** Sprache → Text am Handy → per LoRa zu den Freunden.
- Kompass, Mesh-Netz (Meshtastic als Basis).
- Alle tragen Helm, das Brillenband läuft über den Helm.
- **Akku in der Jacken-Innentasche** (warm, geschützt), 60–80 cm Silikonkabel am Hals unter den Kragen, **magnetischer Abreißstecker**, PPTC-Sicherung am Pluspol.

## Gewählte Teile

| Teil | Auswahl | Stand |
|---|---|---|
| Board (2 Stück für Funktest) | **Heltec Wireless Tracker V1.2, HF 868 MHz**, Tinytronics (NL, liefert nach AT), ca. 23,50 € | **Noch nicht da.** Antenne, Antennenkabel und Batteriekabel (1,25 mm, Molex PicoBlade-kompatibel) liegen bei, USB-C-Kabel nicht |
| Akku (2 Stück) | **RS PRO LiPo 3,7 V 2 Ah, RS-Nr. 125-1266** (Modell SR674361P), RS Österreich, 28,75 € + Versand | **Angekommen, beide geprüft:** 3,85 V und 3,84 V, Rot = Plus, flach, ok. Herstelldatum 17.07.2026 |

Akku-Daten laut Datenblatt: Schutzschaltung (PCM), Laden 0–45 °C, **Entladen −20 bis 60 °C**, 63 × 43,5 × 7 mm, 40 g, 7,4 Wh, Stecker JST XH 2-polig (2,5 mm) an ca. 5 cm verdrilltem Kabel.

Der vorher gewählte Electrokit-Akku wurde ersetzt, weil Electrokit nicht nach Österreich liefert.

## Wo ich gerade stehe

**Problem:** Der Akku-Stecker (JST XH, 2,5 mm) passt nicht ins Board (1,25 mm).

**Plan (wenn die Boards da sind):**
1. Batteriekabel aus dem Tinytronics-Paket ins Board stecken und auf der Platine nachsehen, welche **Kabelfarbe auf „+“** liegt (Farben können vertauscht sein!). Foto an Claude schicken.
2. Weißen Stecker am Akku abzwicken, **einen Draht nach dem anderen**, Enden sofort abkleben.
3. Am Board-Kabel nur das andere Ende abzwicken (der kleine Stecker bleibt dran). **Am Board selbst nichts abschneiden.**
4. Abisolieren (ca. 5 mm), verzinnen, **Schrumpfschlauch vorher drüberschieben**, Plus an Plus und Minus an Minus löten, Lötstellen versetzt.
5. Vor dem Anstecken mit dem Multimeter am kleinen Stecker messen (ca. 3,8 V, richtige Polung).

**Bis dahin:** Akkus mit Stecker, bei Zimmertemperatur, auf nicht brennbarer Unterlage lagern. Nicht laden nötig.

## Noch zu besorgen

- Lötkolben und Lötzinn (falls nicht vorhanden)
- Schrumpfschlauch-Set (rot/schwarz, 1,5–3 mm)
- USB-C-**Datenkabel** (erst ein vorhandenes testen)
- Später: Magnetstecker (BerryBase 2,90 €), Silikonkabel, PPTC-Sicherung, Kompass QMC5883L, Mikrofon INMP441, Taster, Display

## Danach (Reihenfolge)

1. Boards per USB-C starten, Meshtastic flashen (`flasher.meshtastic.org`, Chrome/Edge), Region **EU_868**.
2. Antenne **vor** dem Einschalten anstecken.
3. GPS draußen testen, Funktest zwischen zwei Boards, Reichweite messen.
4. Akku-Laufzeit und Temperatur in der Jackentasche messen.
5. Dann: Kompass und Mikrofon (vorgeschlagene Pins: Taster GPIO 4–7, Kompass SDA 17 / SCL 37, Mikrofon SCK 46 / WS 45 / SD 18). **Pins gelten für V1.1, für V1.2 noch nicht bestätigt.**

## Wichtige Regeln

- Akku **nie unter 0 °C laden**, nur zu Hause.
- Akku **nie direkt an USB oder ein Ladegerät**, geladen wird nur über das Board.
- Akku nicht am Kopf oder im Helm, Helm nicht verändern.
- Am Board nur eine Stromquelle gleichzeitig (Ausnahme: Akku lädt über USB).

## Dateien im Projekt

- `hardware/board.md` + `.pdf`: alles zum Board (Daten, Pins, Kauf)
- `hardware/akku.md` + `.pdf`: alles zum Akku (aktuell, RS PRO)
- `hardware/bom.csv`: Stückliste
- `hardware/quellen/`: Datenblatt und Schaltplan des Boards
- `projektdoku/FORTSCHRITT.md`, `EINKAUFSLISTE.md`: auf Stand 10.11.2026 (RS-Akku, Tinytronics-Board)
