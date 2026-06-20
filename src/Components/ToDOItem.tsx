import { Todo } from "@/types/todo";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";


type todoitemprops = {
    todo: Todo,
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ToDoItem({ todo, onToggle, onDelete }: todoitemprops) {

    return (
        <View style={styles.container}>
            <Text
                style={[styles.todoText, todo.completed && styles.completed]}
            >
                {todo.text}
            </Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.doneButton}

                    onPress={() => onToggle(todo.id)}
                >
                    <Text style={styles.buttonText}>{todo.completed ? "Undo" : "Done"}</Text></Pressable>
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => onDelete(todo.id)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    completed: {
        textDecorationLine: "line-through"
    },
    todoText: {
        flex: 1,
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 8,
    },

    doneButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },

    deleteButton: {
        backgroundColor: "#f44336",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});