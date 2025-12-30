import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import FeatureCard from "@/components/FeatureCard";

const result = () => {
  const { score, total, categoryTitle } = useLocalSearchParams<{
    score: string;
    total: string;
    categoryTitle: string;
  }>();

  const router = useRouter();

  const scoreNum = parseInt(score || "0", 10);
  const totalNum = parseInt(total || "0", 10);
  const percentage = Math.round((scoreNum / totalNum) * 100);

  const getMessage = () => {
    if (percentage === 100) {
      return {
        emoji: "🎉",
        title: "Perfect Score!",
        message: "Outstanding! You have excellent knowledge about dialysis.",
      };
    } else if (percentage >= 80) {
      return {
        emoji: "🌟",
        title: "Great Job!",
        message: "You have a strong understanding of the material. Keep it up!",
      };
    } else if (percentage >= 60) {
      return {
        emoji: "👍",
        title: "Good Effort!",
        message:
          "You are learning well. Review the topics you missed to improve.",
      };
    } else {
      return {
        emoji: "💪",
        title: "Keep Learning!",
        message:
          "Learning takes time. Try again and review the explanations carefully.",
      };
    }
  };

  const result = getMessage();

  const getGradientColors = (): [string, string] => {
    if (percentage >= 80) {
      return ["#10b981", "#059669"];
    } else if (percentage >= 60) {
      return ["#f59e0b", "#d97706"];
    } else {
      return ["#6366f1", "#4f46e5"];
    }
  };

  return (
    <View className="flex-1 ">
      {/* Gradient background */}
      <LinearGradient
        colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView className="p-4"></ScrollView>
      </LinearGradient>
    </View>
  );
};

export default result;

const styles = StyleSheet.create({});

{
  /* <View className="flex gap-3">
  <TouchableOpacity
    onPress={() => router.back()}
    className="flex-row items-center justify-center py-4 rounded-2xl bg-white gap-2 border-2 border-slate-200"
    activeOpacity={0.8}
  >
    <Ionicons name="arrow-undo-outline" size={20} color={"#355564"} />
    <Text className=" text-[17px] font-bold text-[#1e293b]">Try Again</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/quiz")}
    className="flex-row items-center justify-center py-4 rounded-2xl bg-white gap-2 border-2 border-slate-200"
    style={{ backgroundColor: "##3b82f6", borderColor: "#3b82f6" }}
    activeOpacity={0.8}
  >
    <Ionicons name="arrow-undo-outline" size={20} color={"#355564"} />
    <Text className="text-[17px] font-bold text-[#1e293b]">
      Back to Quizzes
    </Text>
  </TouchableOpacity>
</View>; */
}
