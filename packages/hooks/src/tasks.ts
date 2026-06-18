import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

// Shared todo workflow used by both the web and native demos.
export function useTask(orpc: any) {
  const [newTodoText, setNewTodoText] = useState("");
  const todos = useQuery<TodoItem[]>(orpc.todo.getAll.queryOptions());

  const createMutation = useMutation<unknown, Error, { text: string }, unknown>(
    orpc.todo.create.mutationOptions({
      onSettled: () => {
        todos.refetch();
        setNewTodoText("");
      },
    }),
  );

  const toggleMutation = useMutation<
    unknown,
    Error,
    { id: number; completed: boolean },
    unknown
  >(
    orpc.todo.toggle.mutationOptions({
      onSettled: () => {
        todos.refetch();
      },
    }),
  );

  const deleteMutation = useMutation<unknown, Error, { id: number }, unknown>(
    orpc.todo.delete.mutationOptions({
      onSettled: () => {
        todos.refetch();
      },
    }),
  );

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      createMutation.mutate({ text: newTodoText });
    }

    setNewTodoText("");
  };

  const completedCount =
    todos.data?.filter((todo) => todo.completed).length ?? 0;

  const totalCount = todos.data?.length ?? 0;

  return {
    newTodoText,
    setNewTodoText,
    todos,
    createMutation,
    toggleMutation,
    deleteMutation,
    isLoading: todos.isLoading,
    completedCount,
    totalCount,
    handleAddTodo,
  };
}
