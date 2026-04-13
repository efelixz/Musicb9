import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function VoiceCaptureScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
           <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
           </View>
           <Text style={styles.progressText}>Amostra 2 de 5</Text>
        </View>

        <Text style={styles.title}>Leia a frase abaixo em voz alta:</Text>

        <View style={styles.phraseContainer}>
          <Text style={styles.phrase}>
            "O horizonte azul encontra o brilho intenso do sol da manhã, trazendo paz ao coração."
          </Text>
        </View>

        <View style={styles.visualizer}>
          {[...Array(10)].map((_, i) => (
             <View key={i} style={[styles.visualizerBar, { height: 20 + Math.random() * 40 }]} />
          ))}
        </View>

        <TouchableOpacity style={styles.recordButton}>
           <View style={styles.recordInner} />
        </TouchableOpacity>

        <Text style={styles.recordLabel}>Toque para gravar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 60,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 3,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  progressText: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 20,
  },
  phraseContainer: {
    backgroundColor: '#1e293b',
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 40,
  },
  phrase: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  visualizer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    marginBottom: 60,
  },
  visualizerBar: {
    width: 4,
    backgroundColor: '#3b82f6',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ef4444',
  },
  recordLabel: {
    color: '#fff',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
  }
});
