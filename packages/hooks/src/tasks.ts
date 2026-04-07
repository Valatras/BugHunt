import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { orpc as ORPC } from "../../../apps/native/utils/orpc";


export function useTask(orpc: typeof ORPC) {
  const [newTodoText, setNewTodoText] = useState("");
    const todos = useQuery(orpc.todo.getAll.queryOptions());
    const createMutation = useMutation(
      orpc.todo.create.mutationOptions({
        onSettled: () => {
          todos.refetch();
          setNewTodoText("");
        },
      }),
    );
    const toggleMutation = useMutation(
      orpc.todo.toggle.mutationOptions({
        onSettled: () => {
          todos.refetch();
        },
      }),
    );
    const deleteMutation = useMutation(
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

  const isLoading = todos?.isLoading;
  const completedCount = todos?.data?.filter((t: { completed: boolean }) => t.completed).length || 0;
  const totalCount = todos?.data?.length || 0;

  return {
    newTodoText, setNewTodoText, todos, createMutation, toggleMutation, deleteMutation, isLoading, completedCount, totalCount, handleAddTodo
  }

}