# Einkaufsliste

Stand: 10. November 2026. Preise sind Richtwerte aus `hardware/bom.csv` und den Händlerseiten, Schätzungen sind markiert. „Erledigt“ = bestellt (`[x]`), „Erhalten“ = bereits da (✅) oder noch nicht da (❌).

## Muss (Prototyp)

Geplant: Die 2 Boards werden am 6. November 2026 bestellt. Stand 10.11.: **Boards noch nicht da.**

| Erledigt | Erhalten | Was | Menge | Preis ca. | Wo / Hinweis |
|---|---|---|---|---|---|
| [ ] | ❌ | Heltec Wireless Tracker, HF 868 MHz (inkl. Antenne, Adapterkabel, Akku-Kabel, Stiftleisten) | 1 | 23,50 € | Tinytronics, liefert nach Österreich. Versand im Warenkorb prüfen |
| [ ] | ❌ | **Zweites Board** für den Funktest | 1 | 23,50 € | wie oben (Funk braucht zwei Geräte) |
| [x] | ✅ | LiPo RS PRO 3,7 V 2 Ah (RS-Nr. 125-1266), Schutzschaltung, Entladen bis −20 °C | 2 | 28,75 € pro Stück + Versand | RS Österreich, liefert nach Österreich. **Angekommen und geprüft (10.11.)** |
| [ ] | ❌ | Schrumpfschlauch-Set (rot/schwarz, 1,5–3 mm) | 1 | 3–8 € (Schätzung) | Conrad, Amazon, Baumarkt (OBI, Hornbach, Bauhaus), alle liefern in Österreich. Für die Lötstellen Akku ↔ Batteriekabel |
| [ ] | ❌ | USB-C-**Datenkabel** (nur falls nötig) | 1 | ca. 5 € (Schätzung) | Liegt dem Board nicht bei. Erst ein vorhandenes USB-C-Kabel probieren. Wenn der Computer das Board damit nicht erkennt (reines Ladekabel), ein Datenkabel kaufen |
| [ ] | ❌ | Magnetischer Abreißstecker, 2-polig, mit Kabel | 1 | 2,90 € | BerryBase Pogo-Pin-Magnetstecker 2 A |
| [ ] | ❌ | Silikonkabel 2-adrig, 60–80 cm | 1 | ca. 3 € (Schätzung) | Länge an der Jacke messen |
| [ ] | ❌ | PPTC-Sicherung 1–2 A | 1 | 1–2 € (Schätzung) | am Pluspol nahe am Akku |
| [ ] | ❌ | Steckbrett und Jumperkabel | 1 | 5–8 € (Schätzung) | |

## Werkzeug (falls nicht vorhanden)

| Erledigt | Erhalten | Was | Wofür |
|---|---|---|---|
| [x] | ✅ | Multimeter | Akku-Polung prüfen (vorhanden, Akkus damit gemessen) |
| [ ] | ❌ | Lötkolben und Lötzinn | Akku an das Batteriekabel des Boards löten (Stecker passen nicht), später Stiftleisten und Magnetstecker |
| [ ] | ❌ | Küchenwaage | Gewicht von Board und Akku |
| [ ] | ❌ | Handy mit Bluetooth und Meshtastic-App | koppeln, Funktest |
| [ ] | ❌ | Computer mit Chrome oder Edge | Flashen über `flasher.meshtastic.org` |

## Später (nach erfolgreichem Funktest)

| Erledigt | Erhalten | Was | Preis ca. |
|---|---|---|---|
| [ ] | ❌ | Taster (4 Stück) | 3–6 € |
| [ ] | ❌ | MEMS-Mikrofon INMP441 | 3–5 € |
| [ ] | ❌ | Kompass QMC5883L | 2–4 € |
| [ ] | ❌ | Mini-OLED SSD1306 0,96" I2C | 3–5 € |
| [ ] | ❌ | 3D-Druck-Gehäuse (PETG) | 2–5 € |

## Optional

| Erhalten | Was | Hinweis |
|---|---|---|
| ❌ | Kleine Powerbank (BerryBase Art.-Nr. 53932, 12,09 €) | nur als Ersatz für den ersten Test, braucht „Always on“-Modus |
| ❌ | Zweiter Akku-Stecker SH1.25 | falls später ein anderer Akku angeschlossen wird |

## Summe (grob)

Muss-Teile: etwa 120–130 € mit zwei Boards und zwei RS-Akkus (57,50 €), ohne Versandkosten, Zoll und Werkzeug. Spätere Teile: etwa 13–25 €.
