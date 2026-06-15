import { useForm } from "@tanstack/react-form";
import {
  Button,
  FieldError,
  Input,
  Label,
  Spinner,
  Surface,
  TextField,
  useToast,
} from "heroui-native";
import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import z from "zod";

import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/orpc";

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Use at least 8 characters"),
});

function getErrorMessage(error: unknown): string | null {
  if (!error) return null;

  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    for (const issue of error) {
      const message = getErrorMessage(issue);
      if (message) {
        return message;
      }
    }
    return null;
  }

  if (typeof error === "object" && error !== null) {
    const maybeError = error as { message?: unknown };
    if (typeof maybeError.message === "string") {
      return maybeError.message;
    }
  }

  return null;
}

function SignIn() {
  const passwordInputRef = useRef<TextInput>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await authClient.signIn.email(
        {
          email: value.email.trim(),
          password: value.password,
        },
        {
          onError(error) {
            toast.show({
              variant: "danger",
              label: error.error?.message || "Échec de la connexion",
            });
          },
          onSuccess() {
            formApi.reset();
            queryClient.refetchQueries();
            toast.show({
              variant: "success",
              label: "Bienvenue ! Vous êtes connecté.",
            });
            router.replace("/Bughunt");
          },
        },
      );
    },
  });

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        validationError: getErrorMessage(state.errorMap.onSubmit),
      })}
    >
      {({ isSubmitting, validationError }) => {
        const formError = validationError;

        return (
          <>
            <FieldError isInvalid={!!formError} className="mb-3">
              {formError}
            </FieldError>

            <View className="gap-3">
              <form.Field name="email">
                {(field) => (
                  <TextField>
                    <Label>Email</Label>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChangeText={field.handleChange}
                      placeholder="email@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      textContentType="emailAddress"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        passwordInputRef.current?.focus();
                      }}
                    />
                  </TextField>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <TextField>
                    <Label>Password</Label>
                    <Input
                      ref={passwordInputRef}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChangeText={field.handleChange}
                      placeholder="••••••••"
                      secureTextEntry
                      autoComplete="password"
                      textContentType="password"
                      returnKeyType="go"
                      onSubmitEditing={form.handleSubmit}
                    />
                  </TextField>
                )}
              </form.Field>

              <Button
                onPress={form.handleSubmit}
                isDisabled={isSubmitting}
                className="mt-1"
              >
                {isSubmitting ? (
                  <View className="flex-row items-center justify-center gap-2">
                    <Spinner size="sm" color="default" />
                    <Button.Label>Connexion...</Button.Label>
                  </View>
                ) : (
                  <Button.Label>Se connecter</Button.Label>
                )}
              </Button>

              <text className="text-center text-sm text-muted">
                Pas de compte ?{" "}
                <Text
                  className="text-primary"
                  onPress={() => router.push("/sign-up")}
                >
                  Inscrivez-vous
                </Text>
              </text>
            </View>
          </>
        );
      }}
    </form.Subscribe>
  );
}

export { SignIn };
