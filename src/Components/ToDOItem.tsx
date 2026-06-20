import { Todo } from "@/types/todo";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";


type todoitemprops = {
    todo: Todo,
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, text: string) => void;
}

export default function ToDoItem({ todo, onToggle, onDelete, onUpdate }: todoitemprops) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    return (
        <View style={styles.container}>
            {isEditing ?
                <TextInput
                    style={styles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                // autoFocus
                /> : <Text style={[styles.todoText, todo.completed && styles.completed]}>
                    {todo.text}
                </Text>
            }
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.editButton}
                    onPress={() => {
                        if (isEditing) {
                            onUpdate(todo.id, editText)
                            setIsEditing(false)
                        } else {
                            setIsEditing(true);
                        }
                    }}
                >
                    <Text style={styles.buttonText}>{isEditing ? "Save" : "Edit"}</Text>
                </Pressable>

                <Pressable
                    style={styles.doneButton}

                    onPress={() => onToggle(todo.id)}
                >
                    <Text style={styles.buttonText}>{todo.completed ? "Undo" : "Done"}</Text>
                </Pressable>

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
    editInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
    },

    editButton: {
        backgroundColor: "#2196F3",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
    },
});