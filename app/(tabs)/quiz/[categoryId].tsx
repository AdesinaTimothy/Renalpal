import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { quizCategories } from "@/mocks/quiz-data";
import { LinearGradient } from "expo-linear-gradient";

const category = () => {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const selectedQuizCategory = quizCategories.find((t) => t.id == categoryId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  if (!category) {
    return (
      <View>
        <Text>Category not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-50">
      <LinearGradient colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]} />
      <ScrollView className="flex-1">
        <View className="flex"></View>
      </ScrollView>
    </View>
  );
};

export default category;

const styles = StyleSheet.create({});
