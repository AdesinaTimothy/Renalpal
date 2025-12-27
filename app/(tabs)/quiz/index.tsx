import { BookOpen, Heart, Apple, Sun } from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "@/components/Categories";
import DailyQuizCard from "@/components/DailyQuizCard";
// import Categories from "@/components/categories";

export default function QuizCategoriesScreen() {
  return (
    <View className="flex-1 bg-blue-50">
      <LinearGradient colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]} />
      <ScrollView className="flex-1">
        <View className="py-6 px-4">
          <Text className="text-xl text-gray-600 mb-8">
            Test your knowledge about dialysis treatment 🧠
          </Text>

          <View className=" flex gap-4">
            <CategoryCard
              title="Dialysis Basics"
              description="Learn the fundamentals of dialysis treatment"
              questionCount={5}
              iconName="book-outline"
              iconBgColor="bg-blue-500"
              onPress={() => console.log("Pressed")}
            />
            <CategoryCard
              title="Treatment and Care"
              description="Understanding your treatment process"
              questionCount={5}
              iconName="heart-outline"
              iconBgColor="bg-red-500"
              onPress={() => console.log("Pressed")}
            />
            <CategoryCard
              title="Diet and Lifestyle"
              description="Nutrition and healthy living tips"
              questionCount={5}
              iconName="fast-food-outline"
              iconBgColor="bg-green-500"
              onPress={() => console.log("Pressed")}
            />
            <CategoryCard
              title="Living with Dialysis"
              description="Nutrition and healthy living tips"
              questionCount={5}
              iconName="sparkles-outline"
              iconBgColor="bg-amber-500"
              onPress={() => console.log("Pressed")}
            />

            <View className="flex items-center justify-center mt-4">
              <Text className="text-lg text-gray-600 mb-8">
                🍎 Test your knowledge about dialysis treatment
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </ScrollView>
    </View>
  );
}
