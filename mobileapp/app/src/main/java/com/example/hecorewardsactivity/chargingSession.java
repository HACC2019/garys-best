package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;

import androidx.appcompat.app.AppCompatActivity;

public class chargingSession extends AppCompatActivity {
    public RadioButton successfulSess;
    public RadioButton unsuccessfulSess;
    public static boolean carCharged;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questions);

        successfulSess = findViewById(R.id.SuccessfulSess);
        unsuccessfulSess = findViewById(R.id.UnsuccessfulSess);

    }

    public void proceedToNextQuestion(View view){
        if (successfulSess.isChecked())
        {
            carCharged = true;
            Intent commentSection = new Intent(this, endPoint.class);
            this.startActivity(commentSection);
        }
        else if(unsuccessfulSess.isChecked())
        {
            carCharged = false;
            Intent question2 = new Intent(this, successfulPayment.class);
            this.startActivity(question2);
        }
    }


}
