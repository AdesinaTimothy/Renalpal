import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { quizCategories, QuizQuestion } from "@/mocks/quiz-data";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "@/components/ProgressBar";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

const category = () => {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const selectedQuizCategory = quizCategories.find((t) => t.id == categoryId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  if (!selectedQuizCategory) {
    return (
      <View>
        <Text>Category not found</Text>
      </View>
    );
  }

  const currentQuestion: QuizQuestion | undefined =
    selectedQuizCategory?.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === selectedQuizCategory?.questions.length - 1;

  //Function the handle answerSelected
  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion?.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    const newsAnswered = [...answeredQuestions];
    newsAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newsAnswered);
    console.log(index);
  };

  //Function to handleNext
  const handleNext = () => {
    if (isLastQuestion) {
      router.push({
        pathname: "/(tabs)/quiz/result",
        params: {
          score: score.toString(),
          total: selectedQuizCategory.questions.length.toString(),
          categoryTitle: selectedQuizCategory.title,
        },
      });
    } else {
    }
  };

  return (
    <View className="flex-1 bg-blue-50">
      <LinearGradient colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]} />
      <ScrollView className="flex-1 p-4">
        {/* Progress Bar Section */}
        <View className="flex-1">
          {selectedQuizCategory?.questions?.length ? (
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={selectedQuizCategory.questions.length}
            />
          ) : null}
        </View>

        {/* Progress Text */}
        <View className="mb-5">
          <Text className="text-sm text-[#64748b] font-semibold mt-2">
            Question {1} of {selectedQuizCategory?.questions.length}
          </Text>
        </View>

        {/*Category Badge  */}
        <View className="flex-row items-center mb-5">
          <View
            className="w-2 h-2 bg-red-800 rounded-full mr-2"
            style={{ backgroundColor: selectedQuizCategory?.color }}
          ></View>
          <Text className="text-base text-slate-500 font-semibold uppercase tracking-[0.5px]">
            {selectedQuizCategory?.title}
          </Text>
        </View>

        {/* Question */}
        <Text className="text-[26px] font-bold text-slate-800 leading-[36px] mb-8">
          {currentQuestion?.question}
        </Text>

        {/* Options */}
        <View className="flex gap-4">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswerSelect(index)}
                // disabled={}
                activeOpacity={0.7}
              >
                <View
                  className="bg-white flex-row items-center justify-between rounded-[16px] p-[18px]  border-2 border-slate-200  "
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  {/* Option Div */}
                  <View className="flex-1 flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-[#f1f5f9] items-center justify-center mr-4">
                      <Text className="text-sm font-bold text-[#475569]">
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text className="text-base text-slate-800 leading-6 flex-1">
                      {option}
                    </Text>
                  </View>

                  {/* Show Icon */}
                  <View></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View className="mt-6 bg-white rounded-[16px] p-5 border-l-4 border-blue-500 ">
            <View className="mb-2">
              <Text className="text-[18px] font-bold text-slate-800">
                {selectedAnswer === currentQuestion?.correctAnswer
                  ? "✅ Correct"
                  : "❌ Not quite"}
              </Text>
            </View>
            <Text className="text-[15px] text-[#475569] leading-6">
              {currentQuestion?.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {showExplanation && (
        <View className="absolute bottom-0 left-0 right-0 p-5 bg-transparent">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="flex-row items-center justify-center py-4 rounded-[16px] gap-2"
            style={{
              backgroundColor: selectedQuizCategory.color,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <Text className="text-[18px] font-bold text-white">
              {isLastQuestion ? "See Results" : "Next Question"}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default category;

const styles = StyleSheet.create({});
