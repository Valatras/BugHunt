import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";

import { Container } from "@/components/container";
import { orpc } from "@/utils/orpc";

export default function InsectsScreen() {
  const [newInsect, setNewInsect] = useState({ name: "", Sci_Name: "" });
  const insects = useQuery(orpc.insect.getAll.queryOptions());
  const createMutation = useMutation(
    orpc.insect.create.mutationOptions({
      onSuccess: () => {
        insects.refetch();
        setNewInsect({ name: "", Sci_Name: "" });
      },
    }),
  );

  const handleAddInsect = () => {
    if (newInsect.name.trim() && newInsect.Sci_Name.trim()) {
      createMutation.mutate({
        name: newInsect.name,
        sci_name: newInsect.Sci_Name,
      });
    }
  };

  const isLoading = insects?.isLoading; /* Data fetching voir tanstack query */

  const mutedColor = useThemeColor("muted");
  const foregroundColor = useThemeColor("foreground");

  return (
    <Container>
      <ScrollView>
        {/* Add view for new insects */}
        <Surface variant="secondary" className="mb-4 p-3 rounded-lg">
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={newInsect.name}
                  onChangeText={(text) =>
                    setNewInsect({ ...newInsect, name: text })
                  }
                  placeholder="Insect name..."
                  editable={!createMutation.isPending}
                />
              </TextField>
            </View>
            <View className="flex-1">
              <TextField>
                <Input
                  value={newInsect.Sci_Name}
                  onChangeText={(text) =>
                    setNewInsect({ ...newInsect, Sci_Name: text })
                  }
                  placeholder="Scientific name..."
                  editable={!createMutation.isPending}
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              variant={
                createMutation.isPending ||
                !newInsect.name.trim() ||
                !newInsect.Sci_Name.trim()
                  ? "secondary"
                  : "primary"
              }
              isDisabled={
                createMutation.isPending ||
                !newInsect.name.trim() ||
                !newInsect.Sci_Name.trim()
              }
              onPress={handleAddInsect}
              size="sm"
            >
              {createMutation.isPending ? (
                <Spinner size="sm" color="default" />
              ) : (
                <Ionicons
                  name="add"
                  size={20}
                  color={
                    createMutation.isPending ||
                    !newInsect.name.trim() ||
                    !newInsect.Sci_Name.trim()
                      ? mutedColor
                      : foregroundColor
                  }
                />
              )}
            </Button>
          </View>
        </Surface>
        {/* List of insects */}
        {insects?.data?.map((insect) => (
          <Surface
            key={insect.id}
            variant="secondary"
            className="mb-3 p-4 rounded-lg"
          >
            <Text className="text-foreground font-medium text-lg">
              {insect.name}
            </Text>
            <Text className="text-muted text-sm">{insect.Sci_Name}</Text>
          </Surface>
        ))}
        {isLoading && (
          <Surface className="mb-4 p-4">
            <Spinner size="lg" />
            <Text className="text-muted text-sm mt-3">Loading insects...</Text>
          </Surface>
        )}
      </ScrollView>
    </Container>
  );
}
