import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ProjectsScreen() {
  const projects = [
    { id: '1', title: 'Vibe de Verão', genre: 'Pop', status: 'Ready' },
    { id: '2', title: 'Noite de Luar', genre: 'Lo-fi', status: 'Processing' },
    { id: '3', title: 'Amanhecer', genre: 'Jazz', status: 'Draft' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <h1 style={styles.title}>Meus Projetos</h1>
      </View>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.projectCard}>
            <View>
              <Text style={styles.projectTitle}>{item.title}</Text>
              <Text style={styles.projectSubtitle}>{item.genre}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Ready' ? '#22c55e' : '#3b82f6' }]}>
               <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  projectCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  projectSubtitle: { color: '#64748b', fontSize: 12 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});
