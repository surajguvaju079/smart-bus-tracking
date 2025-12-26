// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import React from "react";
// import { Link, router } from "expo-router";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signInSchema, SignInType } from "../../schema/auth/SignInSchema";


// const SignIn = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInType>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const onSubmit = (data: SignInType) => {
//     console.log("SignIn Success:", data);
//     router.replace("/home"); // Navigate to Home page
//   };

//   return (
//     <View className="flex-1 bg-white px-6 justify-center">
//       <Text className="text-3xl font-bold text-black mb-8">Welcome Back 👋</Text>

//       {/* EMAIL */}
//       <Controller
//         control={control}
//         name="email"
//         render={({ field: { value, onChange } }) => (
//           <>
//             <TextInput
//               placeholder="Email"
//               value={value}
//               autoCapitalize="none"
//               keyboardType="email-address"
//               className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
//               onChangeText={onChange}
//             />
//             {errors.email && (
//               <Text className="text-red-500 mb-3">{errors.email.message}</Text>
//             )}
//           </>
//         )}
//       />

//       {/* PASSWORD */}
//       <Controller
//         control={control}
//         name="password"
//         render={({ field: { value, onChange } }) => (
//           <>
//             <TextInput
//               placeholder="Password"
//               secureTextEntry
//               value={value}
//               className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
//               onChangeText={onChange}
//             />
//             {errors.password && (
//               <Text className="text-red-500 mb-3">{errors.password.message}</Text>
//             )}
//           </>
//         )}
//       />

//       <TouchableOpacity
//         className="bg-blue-600 py-4 rounded-xl mb-4"
//         onPress={handleSubmit(onSubmit)}
//       >
//         <Text className="text-center text-white font-semibold">Sign In</Text>
//       </TouchableOpacity>

//       <View className="flex-row justify-center">
//         <Text className="text-gray-500">Don't have an account? </Text>
//         <Link href="/signUp">
//           <Text className="text-blue-600 font-semibold">Sign Up</Text>
//         </Link>
//       </View>
//     </View>
//   );
// };

// export default SignIn;
