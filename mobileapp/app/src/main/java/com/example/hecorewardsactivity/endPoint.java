package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
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
            json.addProperty("DidTheCarCharge", chargingSession.carCharged);
            json.addProperty("CardDeclined", creditCard.cardDeclined);
            json.addProperty("CardReaderBroken", creditCard.cardReaderBroken);
            json.addProperty("IsTesla", teslaQues.isTesla);
            json.addProperty("PortType", portQues.port);
            json.addProperty("AdditionalComments", endPoint.additionalComments);
            String data = json.toString(); //data to post
            OutputStream out = null;
            URL url = null;
            try {
                Log.d("fmliwannadie", data);
                url = new URL("https://hecoweb.azurewebsites.net/postsurvey?json=" + data);//URL to call
                HttpURLConnection cl = (HttpURLConnection) url.openConnection();
                cl.setRequestMethod("GET");
                cl.setDoOutput(true);

                BufferedReader br = new BufferedReader(new InputStreamReader(cl.getInputStream()));
                String o = br.readLine();
                Log.d("fmliwannadie", o);
                br.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    });

}
