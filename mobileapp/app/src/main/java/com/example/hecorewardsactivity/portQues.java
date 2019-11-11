package com.example.hecorewardsactivity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class portQues extends AppCompatActivity {
    public ImageButton chadmoPlug;
    public ImageButton cssPlug;
    public static String port = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_port_type);

        chadmoPlug = findViewById(R.id.chadmoPlug);
        cssPlug = findViewById(R.id.cssPlug);

        if(chadmoPlug.isSelected()){
            port = "CHADEMO";
        }
        else{
            port = "DCCCOMBOTYP1";
        }
    }
    public void proceedToCommentSection(View view){
            Intent commentSection = new Intent(this, endPoint.class);
            this.startActivity(commentSection);
    }
}
