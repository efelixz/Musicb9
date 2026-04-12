import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
          <Text style={styles.title}>Voicify</Text>
        </View>

        <Text style={styles.subtitle}>Sua voz. Sua música. Sua identidade.</Text>

        <View style={styles.hero}>
          <Text style={styles.heroText}>[Visualizador de Áudio Mobile]</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar com minha Voz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 48,
  },
  hero: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  heroText: {
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2563eb',
    width: '100%',
    padding: 18,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outlineButton: {
    width: '100%',
    padding: 18,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  outlineButtonText: {
    color: '#475569',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
