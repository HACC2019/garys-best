package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.content.SharedPreferences;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.JsonObject;


public class plate extends AppCompatActivity {
    private EditText licenseInput;
    public static String licensePlate;

    JsonObject json = new JsonObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_plate);

        licenseInput = findViewById(R.id.plateNumber);
        licensePlate = licenseInput.getText().toString();
    }



    public void questions(View view){
        Intent questions = new Intent(this, chargingSession.class);
        startActivity(questions);
    }
}
