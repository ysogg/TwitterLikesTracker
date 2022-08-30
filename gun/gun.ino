int act1 = 12;
int act2 = 11;

void setup() {
    pinMode(act1, OUTPUT);
    pinMode(act2, OUTPUT);

    Serial.begin(9600);
}

void loop() {
    int val = Serial.readString().toInt();

    if (val == 2) {
        //Push forward
        digitalWrite(act1, HIGH);
        digitalWrite(act2, LOW);
    } else if (val == 1) {
        //Pull back
        digitalWrite(act1, LOW);
        digitalWrite(act2, HIGH);
    } else if (val == 3) {
        //Cut power
        digitalWrite(act1, LOW);
        digitalWrite(act2, LOW);
    }

    

    delay(100);
}
