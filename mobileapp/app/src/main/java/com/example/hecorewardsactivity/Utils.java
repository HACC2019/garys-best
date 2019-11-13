package com.example.hecorewardsactivity;

import android.os.Handler;
import android.os.Looper;

public class Utils {
    public static void runOnUIThread(Runnable runnable)
    {
        final Handler UIHandler = new Handler (Looper.getMainLooper());
        UIHandler.post(runnable);
    }
}

