# Peak Link – Tagebuch: Der erste Funktest

**Datum:** 20. November 2026
**Kurz gesagt:** Beide Boards laufen. Sie haben GPS und funken. Die erste verschlüsselte Nachricht ist von Board zu Board angekommen.

---

## Worum es geht

Peak Link ist eine smarte Skibrille. Damit findet man seine Freunde auf der Piste und kann sich Nachrichten schicken, **ganz ohne Handynetz**. Dafür funken kleine Boards über **LoRa** auf 868 MHz und bilden zusammen ein **Mesh-Netz**. Jedes Gerät leitet Nachrichten der anderen weiter, so wächst die Reichweite. Als Software dient **Meshtastic**.

Heute ging es zum ersten Mal um echte Hardware statt um Planung.

---

## Die Hardware

| Teil | Was |
|---|---|
| 2 × Board | Heltec Wireless Tracker **V1.2** (ESP32-S3, LoRa-Funkchip SX1262, GPS UC6580, kleines Farbdisplay) |
| Antenne | 868-MHz-Stabantenne, über ein Adapterkabel (IPEX auf SMA) am Board |
| Strom | vorerst USB-C (PC oder Powerbank), später ein LiPo-Akku in der Jackentasche |

---

## Was heute passiert ist

### 1. Antennenkabel repariert
Beim ersten Board war das dünne Antennenkabel aus der goldenen Schraubbuchse **herausgerissen**. Ich habe es selbst wieder angelötet und mit dem Multimeter geprüft:
- Innenleiter mit Innenleiter: verbunden ✅
- Abschirmung mit Gehäuse: verbunden ✅
- Innenleiter mit Gehäuse: **kein** Kurzschluss ✅

Danach kam ein Schrumpfschlauch darüber. Später hat sich gezeigt, dass das Kabel einwandfrei funkt.

### 2. Polung für den Akku geprüft
Der Akku hat einen anderen Stecker als das Board (2,5 mm statt 1,25 mm). Er wird deshalb später an das mitgelieferte Batteriekabel gelötet. Vorher musste klar sein, welche Farbe Plus ist. Das Board hing dazu am USB, und ich habe am Batteriekabel gemessen: **+4,14 V, Rot = Plus**. Das ist dieselbe Farbe wie am Akku.

### 3. Meshtastic aufgespielt („geflasht“)
- Im Browser über `flasher.meshtastic.org`
- Für die V1.2 gibt es dort keinen eigenen Eintrag. Die Firmware für **„Wireless Tracker V1.1“** funktioniert aber.
- Erst kam „Failed to connect“. Das Board musste in den **Boot-Modus**: USER-Taste halten, RST drücken, USER loslassen.
- Danach lief es bis 100 % durch. Version **2.7.26**.

### 4. Mit dem Handy verbunden
- Meshtastic-App am iPhone, Verbindung per Bluetooth (PIN vom Display)
- Region auf **EU 868 MHz** gestellt, das erlaubte Band in Europa. Ohne Region funkt das Board nicht.

### 5. GPS-Test draußen
Das Board hing an einer Powerbank, ich war draußen unter freiem Himmel. Nach wenigen Minuten:
- **28 Satelliten** bei Board 1, **11 Satelliten** bei Board 2
- Position und Höhe stehen direkt am Display

### 6. Das Mesh-Netz in der Umgebung
Überraschung: Schon das erste Board hat **fremde Meshtastic-Geräte** in der Umgebung empfangen. Abends waren es **24 Knoten** in der Liste. Manche hört man direkt, andere kommen über **2 Hops**, also über andere Geräte weitergereicht. Ein Gerät war rund **14 km**, eines sogar rund **39 km** entfernt. Genau dieses Mesh-Prinzip soll später auf der Piste funktionieren.

### 7. Board 2 eingerichtet
Genau wie Board 1: flashen, Region einstellen, GPS testen. Die zwei Boards heißen jetzt **1a68** und **0390**.

### 8. Der erste Funktest 🎉
- Board 2 empfängt Board 1 direkt, mit **„Signal Good“**.
- Die erste Direktnachricht scheiterte, weil die Boards ihre **Schlüssel** noch nicht ausgetauscht hatten. Nach „Benutzerinfo austauschen“ in der App ging es.
- Die Nachricht **„Test2“** ging von Board 2 an Board 1. Sie war **verschlüsselt** und kam mit **„Delivered to recipient“** an. Am Display von Board 1 stand: *„Test2 – @Meshtastic 0390“*.

---

## Was ich gelernt habe

- **Antenne immer vor dem Einschalten anstecken.** Ohne Antenne kann der Funkchip beim Senden kaputtgehen.
- Die kleinen **IPEX-Antennenstecker** sind fummelig. Sie müssen genau mittig sitzen und brauchen einen kräftigen, geraden Druck. Sie vertragen nur etwa 30 Steckvorgänge.
- **ESP32-S3 flashen:** Wenn „Failed to connect“ kommt, braucht es den Boot-Modus.
- **Meshtastic rundet die Position** im öffentlichen Kanal absichtlich auf etwa 3 km, zum Schutz der Privatsphäre. Für „Freunde finden“ braucht es deshalb einen eigenen, privaten Kanal mit genauer Position.
- Direktnachrichten sind **Ende-zu-Ende-verschlüsselt**. Die Geräte müssen sich dafür erst „kennenlernen“.

---

## Wie es weitergeht

1. **Privater Kanal** „PeakLink“ mit genauer Position für die Gruppe (heute begonnen)
2. **Reichweitentest** draußen: Wie weit kommen die Nachrichten?
3. **Akku anlöten** und Laufzeit sowie Kälteverhalten in der Jackentasche testen
4. Danach: Kompass, Mikrofon für Sprachnachrichten und Tasten an der Brille

---

## Zahlen auf einen Blick

| | |
|---|---|
| Boards in Betrieb | 2 |
| Firmware | Meshtastic 2.7.26 |
| Funkband | EU 868 MHz, Preset „Long Range – Fast“ |
| GPS | 28 bzw. 11 Satelliten |
| Fremde Knoten empfangen | 24 |
| Weitester Knoten in der Liste | ca. 39 km |
| Erste verschlüsselte Nachricht | ✅ angekommen |
