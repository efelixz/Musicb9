import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crie sua conta</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#94a3b8" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#94a3b8" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#94a3b8" secureTextEntry />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Começar agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 40, textAlign: 'center' },
  form: { width: '100%' },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 18,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
