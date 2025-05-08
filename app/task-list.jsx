import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

let tarefasGlobais = [
  { id: '1', title: 'Estudar React Native', priority: 'high' },
  { id: '2', title: 'Ir ao mercado', priority: 'normal' },
  { id: '2', title: 'Assistir o jogo do galo', priority: 'high' },
];

const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 1, normal: 2, low: 3 };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export default function TaskListScreen() {
  const { nova } = useLocalSearchParams();
  const [tasks, setTasks] = useState([...tarefasGlobais]);

  useFocusEffect(
    React.useCallback(() => {
      if (nova) {
        try {
          const novaTarefa = JSON.parse(nova);
          const jaExiste = tarefasGlobais.find((t) => t.id === novaTarefa.id);
          if (!jaExiste) {
            tarefasGlobais.push(novaTarefa);
            setTasks(sortTasksByPriority([...tarefasGlobais])); 
          }
        } catch (err) {
          console.warn('Erro ao processar nova tarefa:', err);
        }
      }
    }, [nova]) 
  );

  const handleDelete = (id) => {
    tarefasGlobais = tarefasGlobais.filter((t) => t.id !== id); 
    setTasks(sortTasksByPriority([...tarefasGlobais])); 
  };

  const renderItem = ({ item }) => {

    // cor para cada prioridade
    const priorityColors = {
      high: '#d00000', 
      normal: '#f9c74f', 
      low: '#90be6d',
    };

    return (
      <View style={[styles.taskRow, { borderLeftColor: priorityColors[item.priority] }]}>
        <View>
          <Text style={styles.item}>{item.title}</Text>
          <Text style={styles.priority}>
            {item.priority === 'high' ? 'Alta' : item.priority === 'normal' ? 'Normal' : 'Baixa'}
          </Text>
        </View>
        <Pressable onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>🗑️</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa adicionada ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2b2d42',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5, 
  },
  item: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    flexShrink: 1,
  },
  priority: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  delete: {
    fontSize: 20,
    color: '#d00000',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
});
