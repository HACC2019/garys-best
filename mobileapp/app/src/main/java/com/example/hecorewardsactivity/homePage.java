package com.example.hecorewardsactivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class homePage extends AppCompatActivity {
    JsonObject json = new JsonObject();
    String getpoints;
    String ret;

    public void getPointsData() {
        thread.start();
    }

    Thread thread = new Thread(new Runnable() {
        @Override
        public void run() {
            SharedPreferences settings = getApplicationContext().getSharedPreferences("licenseData", 0);
            SharedPreferences.Editor editor = settings.edit();
            editor.putString("LicensePlate", plate.licensePlate);

// Apply the edits!
            editor.apply();

            // Get from the SharedPreferences
            String LicensePlate = settings.getString("LicensePlate", plate.licensePlate);
            json.addProperty("LicensePlate", LicensePlate);
            String GetPoints = json.toString(); //data to post

            if (!GetPoints.contains("null")) {
                OutputStream out = null;
                URL url = null;
                try {
                    url = new URL("https://hecoweb.azurewebsites.net/getpoints");
                    HttpURLConnection cl = (HttpURLConnection) url.openConnection();
                    cl.setRequestMethod("POST");
                    cl.setDoOutput(true);

                    String postReq = "json=" + GetPoints;

                    DataOutputStream os = new DataOutputStream(cl.getOutputStream());
                    os.writeBytes(postReq);
                    os.flush();
                    os.close();
                    BufferedReader br = new BufferedReader(new InputStreamReader(cl.getInputStream()));
                    ret = br.readLine();
                    JsonElement jelement = new JsonParser().parse(ret);
                    JsonObject jobject = jelement.getAsJsonObject();
                    getpoints = jobject.get("Points").toString();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

    });


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getPointsData();
        super.onCreate(savedInstanceState);
        Handler h = new Handler();
        h.postDelayed(new Runnable() {
            @Override
            public void run() {
                setContentView(R.layout.activity_main);
                Toolbar toolbar = findViewById(R.id.toolbar);
                setSupportActionBar(toolbar);

                FloatingActionButton fab = findViewById(R.id.fab);
                fab.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                                .setAction("Action", null).show();
                    }
                });

                TextView points = findViewById(R.id.points);
                points.setText(getpoints);
            }
        }, 1500);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void getLicensePlate(View view) {
        Intent intent = new Intent(this, plate.class);
        startActivity(intent);
    }

}
