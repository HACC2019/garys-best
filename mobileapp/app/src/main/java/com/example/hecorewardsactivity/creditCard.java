package com.example.hecorewardsactivity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;

public class creditCard extends AppCompatActivity {
    public RadioButton declinedCard;
    public RadioButton ReaderBroken;
    public static boolean cardDeclined;
    public static boolean cardReaderBroken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_credit_card);

        declinedCard = findViewById(R.id.declinedCard);
        ReaderBroken = findViewById(R.id.readerBroken);

        if(declinedCard.isChecked()){
            cardDeclined = true;
            cardReaderBroken = false;
        }

        if(ReaderBroken.isChecked()){
            cardDeclined = false;
            cardReaderBroken = true;
        }
    }
    public void proceedToCommentSection(View view){
        Intent commentSection = new Intent(this, endPoint.class);
        this.startActivity(commentSection);
    }
}
