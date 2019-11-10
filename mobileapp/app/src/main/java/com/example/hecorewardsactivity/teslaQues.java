package com.example.hecorewardsactivity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;

public class teslaQues extends AppCompatActivity {
    public RadioButton isATesla;
    public RadioButton isNotTesla;
    public static boolean isTesla;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tesla_ques);
        isATesla = findViewById(R.id.teslaOwned);
        isNotTesla = findViewById(R.id.noTeslaOwned);

        if(isATesla.isChecked()){
            isTesla = true;
        }
        else {
            isTesla = false;
        }

    }

    public void proceedToNextQuestion(View view) {
        Intent portType = new Intent(this, portQues.class);
        this.startActivity(portType);
    }
}
