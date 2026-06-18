import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Checkbox,
  Chip,
  Spinner,
  Surface,
  Input,
  TextField,
  useThemeColor,
} from "heroui-native";
import { View, Text, ScrollView, Alert } from "react-native";

import { Container } from "@/components/container";
import { orpc } from "@/utils/orpc";

import { useTask } from "hooks";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

export default function TodosScreen() {
  const {
    newTodoText,
    setNewTodoText,
    todos,
    createMutation,
    toggleMutation,
    deleteMutation,
    handleAddTodo,
  } = useTask(orpc);

  const mutedColor = useThemeColor("muted");
  const dangerColor = useThemeColor("danger");
  const foregroundColor = useThemeColor("foreground");

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed });
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMutation.mutate({ id }),
      },
    ]);
  };

  const isLoading = todos?.isLoading;
  const completedCount = todos?.data?.filter((t) => t.completed).length || 0;
  const totalCount = todos?.data?.length || 0;

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="mb-4 py-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-black tracking-tight text-white">
              Tasks
            </Text>
            {totalCount > 0 && (
              <Chip variant="secondary" color="accent" size="sm">
                <Chip.Label>
                  {completedCount}/{totalCount}
                </Chip.Label>
              </Chip>
            )}
          </View>
        </View>

        <Surface className={[frontendLayout.cardSurface, "mb-4 p-3"].join(" ")}>
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={newTodoText}
                  onChangeText={setNewTodoText}
                  placeholder="Add a new task..."
                  editable={!createMutation.isPending}
                  onSubmitEditing={handleAddTodo}
                  returnKeyType="done"
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              variant={
                createMutation.isPending || !newTodoText.trim()
                  ? "secondary"
                  : "primary"
              }
              isDisabled={createMutation.isPending || !newTodoText.trim()}
              onPress={handleAddTodo}
              size="sm"
            >
              {createMutation.isPending ? (
                <Spinner size="sm" color="default" />
              ) : (
                <Ionicons
                  name="add"
                  size={20}
                  color={
                    createMutation.isPending || !newTodoText.trim()
                      ? mutedColor
                      : foregroundColor
                  }
                />
              )}
            </Button>
          </View>
        </Surface>

        {isLoading && (
          <View className="items-center justify-center py-12">
            <Spinner size="lg" />
            <Text className="mt-3 text-sm text-white/60">Loading tasks...</Text>
          </View>
        )}

        {todos?.data && todos.data.length === 0 && !isLoading && (
          <Surface className={[frontendLayout.cardSurface, "items-center justify-center py-10"].join(" ")}>
            <Ionicons name="checkbox-outline" size={40} color={mutedColor} />
            <Text className="mt-3 font-medium text-white">
              No tasks yet
            </Text>
            <Text className="mt-1 text-xs text-white/60">
              Add your first task to get started
            </Text>
          </Surface>
        )}

        {todos?.data && todos.data.length > 0 && (
          <View className="gap-2">
            {todos.data.map((todo) => (
              <Surface
                key={todo.id}
                className={[frontendLayout.cardSurface, "p-3"].join(" ")}
              >
                <View className="flex-row items-center gap-3">
                  <Checkbox
                    isSelected={todo.completed}
                    onSelectedChange={() =>
                      handleToggleTodo(todo.id, todo.completed)
                    }
                  />
                  <View className="flex-1">
                    <Text
                      className={`text-sm ${todo.completed ? "text-white/55 line-through" : "text-white"}`}
                    >
                      {todo.text}
                    </Text>
                  </View>
                  <Button
                    isIconOnly
                    variant="ghost"
                    onPress={() => handleDeleteTodo(todo.id)}
                    size="sm"
                  >
                    <Ionicons
                      name="trash-outline"
                      size={16}
                      color={dangerColor}
                    />
                  </Button>
                </View>
              </Surface>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
