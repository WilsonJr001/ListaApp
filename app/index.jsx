import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('normal'); // Estado para prioridade

  const handleAddTask = () => {
    if (!input.trim()) {
      Alert.alert('Erro', 'Digite uma tarefa antes de criar.');
      return;
    }

    const novaTarefa = {
      id: Date.now().toString(),
      title: input.trim(),
      priority, // Adiciona a prioridade
    };

    Alert.alert('Sucesso', 'Tarefa criada com sucesso!'); 

    router.push({
      pathname: '/task-list',
      params: { nova: JSON.stringify(novaTarefa) },
    });

    setInput('');
    setPriority('normal'); // Reseta a prioridade
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ListApp</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua tarefa"
        placeholderTextColor="#888"
        value={input}
        onChangeText={setInput}
      />

      <Picker
        selectedValue={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
        style={styles.picker}
        dropdownIconColor="#4e89ae" 
      >
        <Picker.Item label="Alta" value="high" />
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Baixa" value="low" />
      </Picker>

      <Pressable style={styles.buttonPrimary} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Criar Nova Tarefa</Text>
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={() => router.push('/task-list')}>
        <Text style={styles.buttonText}>Ver Lista de Tarefas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // cor de fundo suave
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 40,
    color: '#2b2d42',
  },
  input: {
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    padding: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#4e89ae',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonSecondary: {
    backgroundColor: '#76c893',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },
});
