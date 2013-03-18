package com.example.cordova.hellocordova;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import org.apache.cordova.*;

public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//        loadUrl("file:///android_asset/www/index_cordova.html");
//        loadUrl("file:///android_asset/www/capture_video.html");
//        loadUrl("file:///android_asset/www/websqldb.html");
//        loadUrl("file:///android_asset/www/contatos_webstorage.html");
//        loadUrl("file:///android_asset/www/notificacoes.html");
//        loadUrl("file:///android_asset/www/geolocalizacao.html");
        loadUrl("file:///android_asset/www/api_files.html");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
}
