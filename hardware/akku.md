# Akku für die Skibrille (Variante B: Jackentasche)

Alles zum Akku in einer Datei. Stand: 6. November 2026.

Grundlage: Datenblatt des Boards (Heltec Wireless Tracker), Produktseite Tinytronics, Händlerseiten und Fachartikel zu Lithium-Akkus bei Kälte. Eigene Rechnungen und Empfehlungen sind als solche gekennzeichnet.

## 1. Idee

Der Akku liegt warm und geschützt in der **Innentasche der Jacke**. Ein dünnes Kabel läuft vom Board am Schlaf am Hals entlang unter den Kragen. In der Mitte sitzt ein **magnetischer Abreißstecker**, der sich bei einem Sturz lösen soll.

## 2. Was das Board verlangt

| Punkt | Wert | Quelle |
|---|---|---|
| Akku-Anschluss | 2-polig, 1,25 mm, Molex PicoBlade-kompatibel (im Datenblatt „SH1.25-2“) | Datenblatt, Tinytronics |
| Spannung | 3,3–4,2 V (3,7-V-LiPo oder Li-Ion mit einer Zelle) | Datenblatt |
| Strom | Akku muss mindestens 250 mA liefern können | Datenblatt |
| Laden | auf dem Board (Lade-, Überlade- und Entladeschutz), Ladestrom steht nicht im Datenblatt | Datenblatt |
| Stromquellen | nur eine gleichzeitig. Ausnahme: Akku darf zum Laden an USB oder 5-V-Pin | Datenblatt |
| Mitgeliefert | 1 × Batteriekabel | Tinytronics |

## 3. Wie lange hält ein Akku?

Aus dem Datenblatt (Akkubetrieb): GPS an 89 mA, Empfang 59 mA, Senden bei 17 dBm 163 mA, Schlaf 15 µA.

Grobe Rechnung von mir, nicht gemessen: Mit GPS und Empfang zusammen sind es etwa 150 mA, mit Display eher 150–200 mA.

| Kapazität | Laufzeit (ca.) | Gewicht (ca.) |
|---|---|---|
| 1000 mAh | 5–6,5 Stunden | 15–20 g (Schätzung) |
| 1500 mAh | 7,5–10 Stunden | keine Angabe gefunden |
| 2000 mAh | 10–13 Stunden | 33–40 g (Händlerangaben) |

Bei Kälte sinkt die Laufzeit. Eine genaue Zahl für Standard-LiPos bei −20 °C habe ich nicht gefunden. Für einen Skitag (8 Stunden) wäre **ca. 2000 mAh** die sichere Wahl, auch wenn der Akku in der warmen Jacke liegt.

## 4. Welcher Akku

| Punkt | Empfehlung |
|---|---|
| Typ | 3,7-V-LiPo oder Li-Ion, **eine Zelle** |
| Kapazität | ca. 2000 mAh |
| Bauform | flach, z. B. 103450 (ca. 10 × 34 × 50 mm) |
| Stecker am Akku | beliebig 2-polig (z. B. JST PH 2,0), da ein eigenes Kabel dazwischenliegt. Am Board gilt 1,25 mm |
| Schutz | **eingebaute Schutzschaltung (PCM)** |
| Temperatur | Das Datenblatt sollte Entladen bei Kälte erlauben (mein Zielwert: bis etwa −20 °C). Manche Akkus nennen nur 0–45 °C, zum Beispiel der BerryBase LP-785060 |
| Polung | vor dem Anschließen prüfen |

Wichtig:
- Wenn du den Akku **direkt** ans Board stecken willst, brauchst du 2-polig und 1,25 mm. Viele billige LiPos haben einen 3-poligen 1,25-mm-Stecker (mit Temperaturfühler), der **nicht** passt. In meinem Aufbau mit Kabel und Magnetstecker spielt das keine Rolle.
- Eine Schutzschaltung ist bei vielen Angeboten nicht ausdrücklich genannt. Vor dem Kauf auf der Produktseite prüfen.
- Falls der Akku einen anderen Stecker hat, kannst du das mitgelieferte Batteriekabel verwenden. Das erfordert Löten und Aufmerksamkeit bei der Polung. Ein Kurzschluss am LiPo ist gefährlich.

### Wichtig: Der Stecker am Akku ist egal

Zwischen Akku und Board liegt ohnehin ein eigenes Kabel mit Magnetstecker (siehe Abschnitt 5). Das Ende am Board ist das mitgelieferte Batteriekabel mit dem 1,25-mm-Stecker. Am Akku-Ende kannst du **jeden** Stecker verwenden, auch den weit verbreiteten JST PH 2,0 mm, wenn du dort die passende Buchse an das Kabel lötest. Du musst also keinen Akku mit 1,25-mm-Stecker finden. Wichtig sind nur: eine Zelle, Schutzschaltung, passende Größe und die richtige Polung.

### Shops, die zu dir liefern (Stand heute)

**BerryBase (Deutschland)** liefert laut Versandseite in EU-Länder, also auch nach Österreich: DHL-Paket 9,90 € bis 249,99 €, ab 250 € kostenlos. Lieferzeit für Österreich steht nicht auf der Seite.

| Artikel | Preis | Eckdaten | Verfügbarkeit |
|---|---|---|---|
| [LP-785060 LiPo 3,7 V, 2500 mAh, 2-Pin JST](https://www.berrybase.de/en/lp-785060-lithium-polymer-lipo-battery-3.7v-2500mah-with-2-pin-jst-connector) | 7,70 € | PKCell, Schutzelektronik, Stecker JST PH 2,0, Kabel ca. 8 cm. Datenblatt: **Betriebstemperatur nur 0–45 °C**, Ladestrom 1250 mA (max. 2500 mA), Entladeschluss 3,0 V | **zurzeit nicht lieferbar** (Benachrichtigung möglich) |
| [LP-503562 LiPo 3,7 V, 1200 mAh, 2-Pin JST](https://www.berrybase.de/en/lp-503562-lithium-polymer-lipo-battery-3.7v-1200mah-with-2-pin-jst-connector) | 5,50 € | PKCell, Schutzelektronik, Versandgewicht 21 g | **zurzeit nicht lieferbar** |
| Kompakte Powerbank 5000 mAh, schwarz (Art.-Nr. 53932) | 12,09 € | für den ersten Test | lieferbar, 10 Stück, 1–3 Tage (siehe [Suchergebnis](https://www.berrybase.de/en/search?search=lipo%202000mAh)) |

Die Größen von 785060 (ca. 7,8 × 50 × 60 mm) und 503562 (ca. 5 × 35 × 62 mm) lese ich aus der Typenbezeichnung ab, sie stehen nicht ausdrücklich auf den Seiten.

**Nicht geeignet oder nicht bestätigt:**

| Angebot | Grund |
|---|---|
| [MakerNova 2000 mAh, JST 1.25](https://makernova.io/products/makernova-2000mah-rechargeable-battery-with-jst-1-25-connector-for-meshtastic-heltec-lilygo-arduino-and-other-devices) | 7,95 €, Schutzschaltung vorhanden, aber **ausverkauft** und „Fast US shipping“ |
| eBay.de, 4er-Pack 2000 mAh Micro JST 1.25 | Das geprüfte Angebot ist **beendet**, Verkäufer aus Großbritannien |
| [Purecrea 2000 mAh (Digitec.ch)](https://www.digitec.ch/en/s1/product/purecrea-lipo-battery-2000mah-jst-125-lithium-ion-polymer-2000-mah-370-v-rc-batteries-47920251) | Schweiz, Schutzschaltung nicht genannt, Preis und Lieferung nach Österreich nicht geprüft |
| [103450 2000 mAh (Ameridroid)](https://ameridroid.com/products/3-7v-lipo-rechargeable-battery) | USA, Preis nicht geprüft |
| OpenELab (Heltec-Akku 800 mAh) | liefert laut dir nicht nach Österreich |

### Akkus mit Kälte-Angabe (Entladen mindestens bis −10 °C)

Die Temperaturwerte stammen meist aus Händlerangaben, nicht aus einem Datenblatt des Zellenherstellers. Vor dem Kauf im Datenblatt prüfen.

| Akku | Entladetemperatur laut Quelle | Eckdaten | Bezug / Lieferung nach Österreich |
|---|---|---|---|
| **[RS PRO LiPo 3,7 V 2 Ah, RS-Nr. 125-1266](https://at.rs-online.com/web/p/akku-sondergroessen/1251266) (neu gewählt)** | Laut Datenblatt (Modell SR674361P): Laden 0–45 °C, **Entladen −20 bis 60 °C**, Lagern −20 bis 60 °C | 2000 mAh, 63 × 43,5 × 7 mm, 40 g, **Schutzschaltung (PCM)** laut Datenblatt (Überladung 4,28 V, Tiefentladung 2,90 V, Überstrom ab ca. 4 A), Stecker JST XHP-2 (2,5 mm) an 50 mm Kabel, Ladestrom normal 400 mA, max. 1000 mA, max. Entladen 2000 mA, UN38.3 | **RS Österreich** (at.rs-online.com). 23,96 € netto, **28,75 € inkl. MwSt.**, 151 Stück auf Lager (Stand 6.11.2026). Versand Österreich laut RS-Seite: **14,95 € unter 50 € netto**, 8,95 € unter 100 €, ab 100 € frei, Lieferung am nächsten Werktag. Preise auf der Seite sind netto, RS richtet sich vor allem an Firmen: ob du als Privatperson bestellen kannst, im Warenkorb oder beim Kundenservice (02852/505) prüfen |
| [Electrokit LiPo 3,7 V 2000 mAh, JST-PH](https://www.electrokit.com/en/batteri-lipo-3.7v-2000mah) (vorher gewählt) | Laden 0–55 °C, **Entladen −20 bis 55 °C** | 2000 mAh, 50 × 40 × 8 mm, 32,9 g, Schutzschaltung (PCM), JST-PH, Kabel 50 mm | Schweden, 169 SEK inkl. 25 % MwSt. Liefert laut dir nur nach Deutschland, **nicht nach Österreich** |
| [PKNERGY LP103450 2000 mAh (Eckstein)](https://eckstein-shop.de/LiPo-Akku-Lithium-Ion-Polymer-Batterie-37V-2000mAh-mit-JST-PHR-2-Stecker-LP103450-EN) | **nicht angegeben** (Datenblatt ließ sich nicht auslesen) | 2000 mAh, Schutzschaltung, JST-PH 2,0, 35,2 g, 7,95 € | Deutschland. Lieferung nach Österreich nicht geprüft. Nur als Ersatz, wenn das Datenblatt Entladen bis −20 °C bestätigt |
| 103450 / 103454, 2000 mAh bei eBay und Amazon | −20 bis 60 °C (Händlerangaben, Entladen). Laden 0 bis 45 °C | Schutzschaltung wird bei vielen genannt, Stecker sehr verschieden | Zellen oft von Händlern aus Asien oder UK. Auf Angabe „Entladen −20 °C“ im Angebot achten |
| [EEMB LP103454LC, Tieftemperatur-Zelle](https://www.eemb.com/products-56) | −40 bis +60 °C | 2000 mAh, **blanke Zelle mit Lötfahnen ohne Stecker und ohne Schutzschaltung** | Brauchst du zusätzlich ein Schutzschaltungs-Modul. Nur mit Lötkenntnissen. Lieferung nicht geprüft |
| CMB- und Grepow-Tieftemperaturakkus | bis −40 °C | fertige Packs mit JST oder Molex | Hersteller, meist nur auf Anfrage oder in größeren Mengen |

**Ohne Temperaturangabe im Angebot, deshalb nicht empfohlen:**

| Akku | Preis | Hinweis |
|---|---|---|
| EREMIT 654060, 2000 mAh | 6,89 € | 60 × 40 × 6,4 mm, 35 g, JST-PH 2,0, Schutzschaltung, lieferbar in 2–5 Tagen. **Temperatur steht nicht auf der Seite** (Datenblatt liegt als Download auf der Herstellerseite). Versand ins Ausland nur für „vereinbarte Lieferungen an Firmenkunden“, Privatkunden werden an den Partner funkelektronik.at verwiesen |
| lithium-polymer-akkus.de LP654065, 2000 mAh | Preis nur auf Anfrage | 6,5 × 40 × 66 mm, 40 g, JST PHR-2, Schutzschaltung. Keine Temperaturangabe. Mindestbestellung 5 Stück |

**Ergebnis der Suche (6.11.2026):** Der **RS PRO 2 Ah (125-1266)** hat praktisch dieselben Werte wie der Electrokit-Akku (2000 mAh, eine Zelle, Schutzschaltung, Entladen bis −20 °C) und wird von **RS Österreich** geliefert. Unterschiede: Laden nur bis 45 °C statt 55 °C (zu Hause egal), etwas größer und 7 g schwerer, anderer Stecker (XHP 2,5 mm, egal wegen eigenem Kabel), deutlich teurer (28,75 € plus 14,95 € Versand).

## 5. Kabel und Abreißstecker

Aufbau:

Board (PicoBlade-Stecker) – Kabel – **magnetischer Stecker** – Kabel – Akku in der Jackentasche

| Teil | Hinweis |
|---|---|
| Kabel | dünnes, flexibles Silikonkabel, 2 Adern. Länge etwa 60–80 cm, an der Jacke ausmessen. Bei dieser Länge ist der Spannungsabfall klein (grobe Rechnung von mir: unter 0,1 V bei Sendestrom) |
| Magnetischer Stecker | 2-polig, z. B. [BerryBase Pogo-Pin-Magnetstecker 2 A mit Kabel](https://www.berrybase.de/en/berrybase-pogo-pin-plug-and-socket-magnetic-2a-dc-with-cable/plug-port-with-lugs/type-2-pin): 2 A bei 36 V, 2,54 mm Raster, Kabel 150 mm, 2,90 € (Wasserdichtigkeit nicht angegeben) |
| Alternative | [Promax 2-Pin-auf-USB-C-Magnetstecker](https://promaxpogopin.com/magnetic-cable-connectors/usb-c-to-2-pin/): 5 V, 2 A, nach Herstellerangabe staub- und wassergeschützt. Prüfen, ob für 3,7 V geeignet |
| Sicherung | Ich empfehle eine Sicherung (z. B. rückstellbare PPTC, 1–2 A) am Pluspol nahe am Akku, falls das Kabel oder der Stecker kurzgeschlossen wird. Das ist meine Empfehlung, nicht getestet |

Wichtig beim Magnetstecker:
- Ein Magnetstecker ist laut einem Datenblatt (Farnell/Amphenol) im verbundenen Zustand **nicht wasserdicht**, auch wenn die einzelnen Hälften geschützt sind. Deshalb den Stecker **innen unter den Kragen** legen, nicht außen.
- Die Polung muss durch die Bauform eindeutig sein, damit der Stecker nicht verkehrt einrastet.
- Ob er sich bei einem Sturz zuverlässig löst und nicht schon bei normaler Bewegung abgeht, muss man testen.

## 6. Kälte

Aus Fachartikeln (Hersteller-Blogs, keine Prüfung):
- **Laden unter 0 °C ist verboten.** Standard-Lithium-Akkus (auch LiPo) dürfen unter dem Gefrierpunkt nicht geladen werden. Es kann sich Lithium auf der Anode ablagern, das ist dauerhaft und kann gefährlich sein. Normal lädt man zwischen 0 und 45 °C.
- **Entladen bei Kälte** ist weiter möglich (oft bis −20 °C angegeben), aber mit weniger Kapazität.
- Eine genaue Prozentzahl für normale LiPos bei −20 °C habe ich nicht gefunden.

Quellen: [Grepow zu Ladung und Entladung bei Kälte](https://www.grepow.com/blog/charge-and-discharge-design-of-low-temperature-battery), [SunLith zur Ladetemperatur](https://sunlithenergy.com/?p=3578).

Folgerungen:
- Akku in der Innentasche nah am Körper, nicht außen.
- **Zu Hause im Warmen laden**, nie draußen bei Frost.
- Das Board selbst arbeitet laut Datenblatt von −20 °C bis 70 °C.

## 7. Sicherheit

- Nur Zellen mit Schutzschaltung verwenden und die Polung vor dem Anschließen prüfen (Multimeter).
- Keine Zellen mit unterschiedlicher Kapazität oder Ladung parallel schalten.
- Akku weich und flach lagern, nicht an Ecken oder harte Teile pressen. Bei einem Sturz kann ein LiPo durchstochen werden und brennen. Ein Rückenprotektor kann den Platz verändern.
- Aufgeblähte, warme oder beschädigte Akkus sofort abstecken und nicht mehr verwenden.
- Den Akku nicht direkt am Kopf oder im Helm unterbringen.
- Den Helm nicht verändern (nicht bohren, nicht den Innenraum umbauen).

## 8. Alternative für den ersten Test: Powerbank

Statt eines LiPo kannst du eine kleine Powerbank (5 V) in die Jackentasche stecken und per USB-C-Kabel mit dem Board verbinden.

| | Powerbank | LiPo mit Schutz |
|---|---|---|
| Aufwand | gering, kein Löten | mittel, Kabel und Stecker bauen |
| Sicherheit | Schutz und Laden eingebaut | Schutzschaltung nötig, Laden über das Board |
| Gewicht | meist schwerer | leichter |
| Risiko | viele Powerbanks schalten bei kleinem Strom (unter ca. 50–100 mA) ab. Das Board braucht im Sparmodus wenig | Polung, Stecker |

Vor dem Kauf prüfen, ob die Powerbank einen **Modus für kleine Ströme** („Always on“) hat. Das Datenblatt verlangt für USB 4,75–6 V und mindestens 500 mA. Dann darf kein Akku gleichzeitig als zweite Quelle am Board hängen.

## 9. Was noch zu prüfen ist

| Punkt | Wie prüfen |
|---|---|
| Akku mit 2-poligem 1,25-mm-Stecker und Schutzschaltung, passend an das Board | Produktseite lesen, Stecker nach Lieferung mit dem Board vergleichen |
| Polung des Akkusteckers und der Buchse am Board | Multimeter |
| Ladestrom des Boards bei 2000 mAh | Heltec-Support fragen oder beim Laden messen |
| Abreißverhalten des Magnetsteckers | Zugtest mit Kabel, bevor du ihn benutzt |
| Kabellänge | an der echten Jacke messen |
| Akku-Laufzeit | draußen messen |
| Temperatur in der Innentasche | Einen Skitag lang mit einem Thermometer messen und mit dem Betriebsbereich des Akkus vergleichen (bei BerryBase LP-785060 nur 0–45 °C) |
| Dichtigkeit des Steckers unter dem Kragen | im Schnee testen |
| V1.2-Board (siehe board.md) | Pins und Stecker nach dem Auspacken prüfen |

## 10. Ergebnis

**Gewählt (neu, 6.11.2026): RS PRO LiPo 3,7 V 2 Ah, RS-Nr. 125-1266**, bei [RS Österreich](https://at.rs-online.com/web/p/akku-sondergroessen/1251266). Laden 0–45 °C, Entladen −20 bis 60 °C, Schutzschaltung, 63 × 43,5 × 7 mm, 40 g, 28,75 € inkl. MwSt. plus 14,95 € Versand. Lieferung nach Österreich: **ja** (RS Österreich, Lieferung am nächsten Werktag). Offen: ob RS an Privatpersonen verkauft (beim Bestellen sehen), Polung des XHP-Steckers (Multimeter).

Vorher gewählt war der Electrokit 2000 mAh. Er wurde ersetzt, weil Electrokit nicht nach Österreich liefert.

Achte beim Kauf auf den **Temperaturbereich im Datenblatt**: Der BerryBase LP-785060 ist nur für 0–45 °C angegeben und deshalb für Frost nicht ideal, auch wenn er in der Jacke warm liegt.

Für den Prototyp: ein flacher 2000-mAh-LiPo mit Schutzschaltung und passendem 2-poligem 1,25-mm-Stecker in der Jacken-Innentasche, ein 60–80 cm langes Silikonkabel mit Magnet-Abreißstecker unter dem Kragen und eine kleine Sicherung am Pluspol. Wenn du keinen passenden Akku findest oder nicht löten willst, nimm zum ersten Test eine kleine Powerbank mit Modus für kleine Ströme. Geladen wird nie bei Frost.
