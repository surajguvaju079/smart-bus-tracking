import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "../../schema/SignUpSchema";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpType) => {
    console.log("SignUp Success:", data);
    router.replace("/home"); // Navigate to Home page
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold mb-6">Create Account ✨</Text>

      {/* NAME */}
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              placeholder="Full Name"
              value={value}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
              onChangeText={onChange}
            />
            {errors.name && (
              <Text className="text-red-500 mb-2">{errors.name.message}</Text>
            )}
          </>
        )}
      />

      {/* EMAIL */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              placeholder="Email"
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
              className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
              onChangeText={onChange}
            />
            {errors.email && (
              <Text className="text-red-500 mb-2">{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* PASSWORD */}
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
              onChangeText={onChange}
            />
            {errors.password && (
              <Text className="text-red-500 mb-2">{errors.password.message}</Text>
            )}
          </>
        )}
      />

      {/* CONFIRM PASSWORD */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              value={value}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
              onChangeText={onChange}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 mb-2">
                {errors.confirmPassword.message}
              </Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl mt-4 mb-3"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Sign Up
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500">Already have an account? </Text>
        <Link href="/signIn">
          <Text className="text-blue-600 font-semibold">Sign In</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
