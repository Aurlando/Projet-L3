// components/ProgressGraph.js
import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// --- Fonction RK4 pour progression vers objectif ---
const rk4Step = (f, y, t, h) => {
  const k1 = f(t, y);
  const k2 = f(t + h / 2, y + (h * k1) / 2);
  const k3 = f(t + h / 2, y + (h * k2) / 2);
  const k4 = f(t + h, y + h * k3);
  return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
};

// Modèle de progression vers objectif
const progressionFunction = (objectif, y) => {
  return 0.1 * (objectif - y);
};

// Calcul RK4 sur N jours (vers objectif en %)
const calculateRK4 = (objectif, jours = 30) => {
  if (!objectif || objectif <= 0) return Array.from({ length: jours }, () => 0);
  
  let y = 0;
  const h = 1;
  const data = [];

  for (let t = 0; t < jours; t++) {
    y = rk4Step((t, y) => progressionFunction(objectif, y), y, t, h);
    const value = Math.min(y, objectif);
    // Convertir en pourcentage
    data.push((value / objectif) * 100);
  }
  return data;
};

// Sécuriser les valeurs pour éviter NaN, Infinity ou valeurs négatives
const safeValue = (v, min = 0, max = 100) => {
  const num = Number(v);
  if (!isFinite(num) || isNaN(num)) return min;
  return Math.max(min, Math.min(num, max));
};

export default function ProgressGraph({ 
  objectif = 0, 
  realProgress = null,
  isGuest = false
}) {
  const screenWidth = Dimensions.get('window').width - 40;

  // Calculer la courbe prévue (RK4) seulement une fois avec useMemo
  const predictedCurve = useMemo(() => {
    if (isGuest || !objectif || objectif <= 0) {
      return Array.from({ length: 30 }, () => 0);
    }
    return calculateRK4(objectif, 30).map(v => safeValue(v, 0, 100));
  }, [objectif, isGuest]);

  // Calculer la courbe réelle
  const realCurve = useMemo(() => {
    if (isGuest) {
      return Array.from({ length: 30 }, () => 0);
    }

    if (realProgress && Array.isArray(realProgress) && realProgress.length > 0) {
      return realProgress.map(v => safeValue(v, 0, 100));
    }

    // Si pas de données réelles, retourner une courbe à 0
    return Array.from({ length: 30 }, () => 0);
  }, [realProgress, isGuest]);

  // Sécuriser les données pour le graphique
  const safePredicted = predictedCurve.map(v => safeValue(v));
  const safeReal = realCurve.map(v => safeValue(v));

  // Pour react-native-chart-kit, utiliser un seul dataset avec la moyenne ou afficher la progression réelle
  const mainDataSet = isGuest ? safePredicted : safeReal;
  const legendText = isGuest ? 'Courbe prévue (mode démo)' : 'Progression réelle';

  return (
    <View style={{ marginVertical: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#fff' }}>
        Votre progression
      </Text>

      <LineChart
        data={{
          labels: Array.from({ length: 30 }, (_, i) => i % 5 === 0 ? (i + 1).toString() : ''),
          datasets: [
            { 
              data: mainDataSet
            }
          ],
          legend: [legendText],
        }}
        width={screenWidth}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: '#1e1e1e',
          backgroundGradientFrom: '#1e1e1e',
          backgroundGradientTo: '#2d2d2d',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(139, 195, 74, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '1'
          }
        }}
        bezier
        style={{ 
          marginVertical: 8,
          borderRadius: 16 
        }}
      />
      
      {/* Afficher la courbe prévue RK4 seulement si pas en mode guest */}
      {!isGuest && (
        <LineChart
          data={{
            labels: Array.from({ length: 30 }, (_, i) => i % 5 === 0 ? (i + 1).toString() : ''),
            datasets: [
              { 
                data: safePredicted
              }
            ],
            legend: ['Prévue (RK4)'],
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#1e1e1e',
            backgroundGradientFrom: '#1e1e1e',
            backgroundGradientTo: '#2d2d2d',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '1'
            }
          }}
          bezier
          style={{ 
            marginVertical: 8,
            borderRadius: 16 
          }}
        />
      )}
    </View>
  );
}
