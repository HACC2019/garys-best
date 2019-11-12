package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class endPoint extends AppCompatActivity {
    private EditText comment;
    public static String additionalComments;
    public static String message;
    private Button finish;
    endPoint instance;

    Gson gson = new Gson();
    JsonObject json = new JsonObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_comment_section);

        comment = findViewById(R.id.getComments);
        finish = findViewById(R.id.finish);
        additionalComments = comment.getText().toString();
        instance = this;
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
                url = new URL("https://hecoweb.azurewebsites.net/api/app/postsurvey?json=" + data);//URL to call
                InputStream cl = url.openStream();

                BufferedReader br = new BufferedReader(new InputStreamReader(cl));
                String ret = br.readLine();
                JsonElement jelement = new JsonParser().parse(ret);
                JsonObject jobject = jelement.getAsJsonObject();
                message = jobject.get("Message").getAsString();
                Log.d("****************", message);
                br.close();
                Utils.runOnUIThread(new Runnable() {
                    @Override
                    public void run() {
                        TextView thankYou = findViewById(R.id.thankyou);
                        TextView text = findViewById(R.id.textView2);
                        thankYou.setVisibility(View.GONE);
                        text.setVisibility(View.GONE);
                        TextView rewardMessage = findViewById(R.id.rewardMsg);
                        rewardMessage.setText(message);
                        Handler h = new Handler();
                        h.postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                Intent intent = new Intent(instance , homePage.class);
                                startActivity(intent);
                            }
                        }, 3000);
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    });

    public void sendHomePage(View view) {
        sendToServer();
    }


}
