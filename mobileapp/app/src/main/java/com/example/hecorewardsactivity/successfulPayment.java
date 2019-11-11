package com.example.hecorewardsactivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;


import androidx.appcompat.app.AppCompatActivity;

public class successfulPayment extends AppCompatActivity {
    public static RadioButton successfulPay;
    public static RadioButton unsuccessfulPay;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question2);
    }

    public void proceedToNextQuestion(View view){
        successfulPay = findViewById(R.id.SuccessfulPay);
        unsuccessfulPay = findViewById(R.id.UnsuccessfulPay);

        if (successfulPay.isChecked())
        {
            Intent teslaQues = new Intent(this, teslaQues.class);
            this.startActivity(teslaQues);
        }
        else if(unsuccessfulPay.isChecked())
        {
            Intent paymentQues = new Intent(this, paymentQues.class);
            this.startActivity(paymentQues);
        }
    }
}
