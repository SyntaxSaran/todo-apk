import ToDoItem from "@/Components/ToDoItem";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isloaded, setIsloaded] = useState(false);

  const STORAGE_KEY = "todos";

  useEffect(() => { loadTodos(); }, [])
  useEffect(() => { if (isloaded) saveTodos(); }, [todos, isloaded])

  function addTodo() {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
    setInput("");
  }
  function deleteTodo(id: string) {
    setTodos(prev => prev.filter(todo => todo.id != id));
  }
  function toggleTodo(id: string) {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }
  function clearCompleted() {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }
  async function loadTodos() {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedTodos) setTodos(JSON.parse(storedTodos))
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setIsloaded(true);
    }
  }
  async function saveTodos() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo APP</Text>
      <View style={styles.addTodoContainer}>
        <TextInput

          style={styles.input}
          placeholder="Enter a Task"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={() => addTodo()}><Text style={styles.buttonText}>Add ToDo</Text></Pressable>
      </View>
      <Text>
        Remaining: {
          todos.filter(todo => !todo.completed).length
        }
      </Text>
      <Pressable style={styles.clearButton} onPress={() => clearCompleted()}><Text style={styles.buttonText}>Clear Completed</Text></Pressable>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No tasks yet</Text>}
        renderItem={({ item }) => (
          <ToDoItem todo={item} onDelete={deleteTodo} onToggle={toggleTodo} />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addTodoContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 0.9,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  addButton: {
    flex: 0.1,
    backgroundColor: "#0c35a7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: 'center',

  },
  clearButton: {
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
