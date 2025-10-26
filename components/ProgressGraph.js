// components/ProgressGraph.js
import React, { useMemo } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

// --- Fonction RK4 ---
const rk4Step = (f, y, t, h) => {
    const k1 = f(t, y);
    const k2 = f(t + h / 2, y + (h * k1) / 2);
    const k3 = f(t + h / 2, y + (h * k2) / 2);
    const k4 = f(t + h, y + h * k3);
    return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
};

const progressionFunction = (objectif, y) => 0.1 * (objectif - y);

const calculateRK4 = (objectif, jours = 30) => {
    if (!objectif || objectif <= 0)
        return Array.from({ length: jours }, () => 0);
    let y = 0;
    const h = 1;
    const data = [];
    for (let t = 0; t < jours; t++) {
        y = rk4Step((t, y) => progressionFunction(objectif, y), y, t, h);
        const value = Math.min(y, objectif);
        data.push((value / objectif) * 100);
    }
    return data;
};

const safeValue = (v, min = 0, max = 100) => {
    const num = Number(v);
    if (!isFinite(num) || isNaN(num)) return min;
    return Math.max(min, Math.min(num, max));
};

export default function ProgressGraph({
    objectif = 0,
    realProgress = null,
    isGuest = false,
}) {
    const screenWidth = Dimensions.get("window").width - 40;

    // Courbe prévue
    const predictedCurve = useMemo(() => {
        if (isGuest || !objectif || objectif <= 0)
            return Array.from({ length: 30 }, () => 0);
        return calculateRK4(objectif, 30).map((v) => safeValue(v));
    }, [objectif, isGuest]);

    // Courbe réelle
    const realCurve = useMemo(() => {
        if (isGuest) return Array.from({ length: 30 }, () => 0);
        if (realProgress && Array.isArray(realProgress))
            return realProgress.map((v) => safeValue(v));
        return Array.from({ length: 30 }, () => 0);
    }, [realProgress, isGuest]);

    return (
        <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "#fff",
                }}
            >
                Votre progression
            </Text>

            <LineChart
                data={{
                    labels: Array.from({ length: 30 }, (_, i) =>
                        i % 5 === 0 ? (i + 1).toString() : ""
                    ),
                    datasets: [
                        {
                            data: realCurve,
                            color: (opacity = 1) =>
                                `rgba(139, 195, 74, ${opacity})`,
                            strokeWidth: 2,
                        },
                        {
                            data: predictedCurve,
                            color: (opacity = 1) =>
                                `rgba(255, 140, 0, ${opacity})`,
                            strokeWidth: 2,
                        },
                    ],
                    legend: ["Progression réelle", "Prévue (RK4)"],
                }}
                width={screenWidth}
                height={220}
                yAxisSuffix="%"
                yAxisInterval={10}
                chartConfig={{
                    backgroundColor: "#1e1e1e",
                    backgroundGradientFrom: "#1e1e1e",
                    backgroundGradientTo: "#2d2d2d",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // labels en blanc
                    labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: { r: "0" }, // pas de points
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
                fromZero
            />

            {/* Légendes axes */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: screenWidth,
                    marginTop: 5,
                }}
            >
                <Text style={{ color: "#fff" }}>0 Jour</Text>
                <Text style={{ color: "#fff" }}>30 Jours</Text>
            </View>
            <Text style={{ color: "#fff", marginTop: 4 }}>
                Progression (% de leçons terminées)
            </Text>
        </View>
    );
}
