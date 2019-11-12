package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.content.SharedPreferences;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.JsonObject;

import java.io.InputStream;
import java.net.URL;


public class plate extends AppCompatActivity {
    private EditText licenseInput;
    public static String licensePlate;

    JsonObject json = new JsonObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_plate);

    }



    public void questions(View view){
        licenseInput = findViewById(R.id.plateNumber);
        licensePlate = licenseInput.getText().toString();
        SharedPreferences settings = getApplicationContext().getSharedPreferences("licenseData", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString("LicensePlate", plate.licensePlate);

        // Apply the edits
        editor.apply();

        URL url = null;
        try {
            url = new URL("https://hecoweb.azurewebsites.net/api/app/getpoints?json=" + licensePlate);
            InputStream cl = url.openStream();
        } catch (Exception e) {
            e.printStackTrace();
        }

        Intent questions = new Intent(this, chargingSession.class);
        startActivity(questions);
    }
}
