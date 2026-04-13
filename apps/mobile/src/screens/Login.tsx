import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Voicify</Text>
        <Text style={styles.title}>Bem-vindo de volta</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Não tem conta? Criar agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  logo: { fontSize: 42, fontWeight: '900', color: '#3b82f6', textAlign: 'center', marginBottom: 10 },
  title: { fontSize: 18, color: '#94a3b8', textAlign: 'center', marginBottom: 40 },
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
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 30 },
  linkText: { color: '#3b82f6', textAlign: 'center', fontWeight: '600' }
});
