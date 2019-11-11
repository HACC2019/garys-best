package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class endPoint extends AppCompatActivity {
    private EditText comment;
    public static String additionalComments;
    private Button finish;

    Gson gson = new Gson();
    JsonObject json = new JsonObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_comment_section);

        comment = findViewById(R.id.getComments);
        finish = findViewById(R.id.finish);
        additionalComments = comment.getText().toString();

    }

    public void sendHomePage(View view) {
        sendToServer();
        Intent intent = new Intent(this, homePage.class);
        startActivity(intent);
    }

    public void sendToServer() {
        thread.start();
    }

    Thread thread = new Thread(new Runnable() {
        @Override
        public void run() {
            json.addProperty("LicensePlate", plate.licensePlate);
            json.addProperty("carCharged", chargingSession.carCharged);
            json.addProperty("cardDeclined", creditCard.cardDeclined);
            json.addProperty("cardReaderBroken", creditCard.cardReaderBroken);
            json.addProperty("isTesla", teslaQues.isTesla);
            json.addProperty("additionalComments", endPoint.additionalComments);
            String data = json.toString(); //data to post
            OutputStream out = null;
            URL url = null;
            try {
                url = new URL("https://hecoweb.azurewebsites.net/postsurvey");//URL to call
                HttpURLConnection cl = (HttpURLConnection) url.openConnection();
                cl.setRequestMethod("POST");
                cl.setDoOutput(true);

                String postReq = "json=" + data;

                DataOutputStream os = new DataOutputStream(cl.getOutputStream());
                os.writeBytes(postReq);
                os.flush();
                os.close();
                BufferedReader br = new BufferedReader(new InputStreamReader(cl.getInputStream()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    });

}
