import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, Rafael</Text>
          <Text style={styles.subtitle}>Pronto para criar?</Text>
        </View>

        <TouchableOpacity style={styles.newProjectCard}>
          <Text style={styles.cardTitle}>Novo Projeto</Text>
          <Text style={styles.cardDescription}>Crie uma música do zero</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Projetos Recentes</Text>
        <View style={styles.projectItem}>
          <View style={styles.projectIcon}>
            <Text style={styles.projectIconText}>V</Text>
          </View>
          <View>
            <Text style={styles.projectName}>Vibe de Verão</Text>
            <Text style={styles.projectMeta}>Pop • 124 BPM</Text>
          </View>
        </View>

        <View style={styles.projectItem}>
          <View style={[styles.projectIcon, { backgroundColor: '#8b5cf6' }]}>
            <Text style={styles.projectIconText}>N</Text>
          </View>
          <View>
            <Text style={styles.projectName}>Noite de Luar</Text>
            <Text style={styles.projectMeta}>Lo-fi • 80 BPM</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  newProjectCard: {
    backgroundColor: '#2563eb',
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDescription: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  projectIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  projectIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  projectMeta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});
