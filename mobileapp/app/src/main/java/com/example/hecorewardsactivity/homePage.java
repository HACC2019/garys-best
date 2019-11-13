package com.example.hecorewardsactivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

public class homePage extends AppCompatActivity {
    JsonObject json = new JsonObject();
    static String getpoints;
    String ret;

    public void getPointsData() {
        thread.start();
    }

    Thread thread = new Thread(new Runnable() {
        @Override
        public void run() {
            SharedPreferences settings = getApplicationContext().getSharedPreferences("licenseData", 0);

            // Get from the SharedPreferences
            String LicensePlate = settings.getString("LicensePlate", plate.licensePlate);
            json.addProperty("LicensePlate", LicensePlate);
            String GetPoints = json.toString(); //data to post
            if (!GetPoints.contains("null")) {
                URL url = null;
                try {
                    url = new URL("https://hecoweb.azurewebsites.net/api/app/getpoints?json=" + GetPoints);
                    InputStream cl =  url.openStream();

                    BufferedReader br = new BufferedReader(new InputStreamReader(cl));
                    ret = br.readLine();
                    JsonElement jelement = new JsonParser().parse(ret);
                    JsonObject jobject = jelement.getAsJsonObject();
                    getpoints = jobject.get("Points").toString().replace("\"","");
                    br.close();
                    Utils.runOnUIThread(new Runnable() {
                        @Override
                        public void run() {
                            TextView points = findViewById(R.id.points);
                            points.setText(getpoints);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else
            {
                Utils.runOnUIThread(new Runnable() {
                    @Override
                    public void run() {
                        TextView points = findViewById(R.id.points);
                        points.setText("0");
                    }
                });
            }
        }

    });


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getPointsData();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void getLicensePlate(View view) {
        if(getpoints == null) {
            Intent plate = new Intent(this, plate.class);
            this.startActivity(plate);
        }
        else
        {
            Intent chargingSess = new Intent(this, chargingSession.class);
            this.startActivity(chargingSess);
        }
    }

}
