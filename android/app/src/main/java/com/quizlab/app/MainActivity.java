package com.quizlab.app;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        try {
            Window window = getWindow();
            if (window != null) {
                // Enable system hardware acceleration on the main window
                window.addFlags(WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);
                window.setStatusBarColor(Color.parseColor("#0C0A09"));
                window.setNavigationBarColor(Color.parseColor("#0C0A09"));
            }

            WebView webView = this.bridge.getWebView();
            if (webView != null) {
                // Background color set to match app theme to eliminate initial flashes
                webView.setBackgroundColor(Color.parseColor("#0C0A09"));

                // Hardware layer acceleration for ultra-smooth 60-120 FPS rendering
                webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
                webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
                webView.setVerticalScrollBarEnabled(false);
                webView.setHorizontalScrollBarEnabled(false);
                
                WebSettings settings = webView.getSettings();
                settings.setDomStorageEnabled(true);
                settings.setDatabaseEnabled(true);
                settings.setOffscreenPreRaster(true);
                settings.setCacheMode(WebSettings.LOAD_DEFAULT);
            }
        } catch (Exception ignored) {
        }
    }
}
