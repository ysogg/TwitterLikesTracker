char val;
int act1 = 13;
int act2 = 12;

void setup() {
    pinMode(act1, OUTPUT);
    pinMode(act2, OUTPUT);
}

void loop() {
    if (Serial.available()) {
        val = Serial.read();
    }

    if (val == 'H') {
        //Push forward
        digitalWrite(act1, HIGH);
        digitalWrite(act2, LOW);
    } else if (val == 'L') {
        //Pull back
        digitalWrite(act1, LOW);
        digitalWrite(act2, HIGH);
    } else if (val == 'X') {
        //Cut power
        digitalWrite(act1, LOW);
        digitalWrite(act2, LOW);
    }

    Serial.end();
    Serial.begin(9600);

    delay(100);
}
