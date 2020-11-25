package com.example.emmaus;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AjoutAlimentaire extends AppCompatActivity{
    private Button valider;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ajout_alimentaire);

        Spinner spinnerCat = findViewById();
        String[] catAlimentaires={"Conserves","Pâtes/riz/féculent"};
        List<String> catAli = new ArrayList<>(Arrays.asList(catAlimentaires));

        ArrayAdapter<String> spinnerArrayAdapterAlimenataire = new ArrayAdapter<String>(AjoutAlimentaire.this,android.R.layout.simple_spinner_item,catAli);
        spinnerArrayAdapterAlimenataire.setDropDownViewResource(android.R.layout.simple_spinner_item);
        spinnerCat.setAdapter(spinnerArrayAdapterAlimenataire);

        Spinner spinnerQte = (Spinner) findViewById(R.id.spinnerQte);
        String[] qteAlimentaires={"1","2","3","4","5","6","7","8","9","10","+10"};
        List<String> qteAli = new ArrayList<>(Arrays.asList(qteAlimentaires));

        ArrayAdapter<String> spinnerArrayAdapterQte = new ArrayAdapter<String>(AjoutAlimentaire.this,android.R.layout.simple_spinner_item,qteAli);
        spinnerArrayAdapterQte.setDropDownViewResource(android.R.layout.simple_spinner_item);
        spinnerQte.setAdapter(spinnerArrayAdapterQte);

        this.valider = (Button) findViewById(R.id.buttonValider);

        valider.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(AjoutAlimentaire.this, "Votre aliment a bien été ajouté",Toast.LENGTH_SHORT).show();
                Intent accueil = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(accueil);
                finish();
            }
        });


        /*valider.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent accueil = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(accueil);
                finish();
            }
        });*/


    }


}
