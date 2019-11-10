package com.example.hecorewardsactivity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;

public class paymentQues extends AppCompatActivity {
    public RadioButton appPayment;
    public RadioButton creditCardPayment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment_ques);

        appPayment = findViewById(R.id.appPayment);
        creditCardPayment = findViewById(R.id.creditCardPayment);
    }

    public void proceedToNextQuestion(View view){
        if (appPayment.isChecked())
        {
            Intent commentSection = new Intent(this, endPoint.class);
            this.startActivity(commentSection);
        }
        else if(creditCardPayment.isChecked())
        {
            Intent creditCard = new Intent(this, creditCard.class);
            this.startActivity(creditCard);
        }
    }
}
