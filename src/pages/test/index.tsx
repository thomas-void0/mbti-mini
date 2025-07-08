import { View, Text } from "@tarojs/components";
import { Button, ConfigProvider } from "@nutui/nutui-react-taro";
import zhCN from "@nutui/nutui-react-taro/dist/locales/zh-CN";
import { getStorageSync, navigateTo, setStorageSync } from "@tarojs/taro";
import { useState } from "react";
import mbtiQuestions from "src/assets/data/mbti.json";
import "./index.less";
import clsx from "clsx";
import genRecordItem from "src/utils/genRecordItem";

type MBTIQuestion = {
  question: string;
  choice_a: {
    value: string;
    text: string;
  };
  choice_b: {
    value: string;
    text: string;
  };
};

type Answer = {
  questionIndex: number;
  value: string;
};

function Test() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 当前问题
  const currentQuestion: MBTIQuestion = mbtiQuestions[currentQuestionIndex];

  // 选择答案
  const handleChoose = (value: string) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (a) => a.questionIndex === currentQuestionIndex
    );

    if (existingAnswerIndex !== -1) {
      newAnswers[existingAnswerIndex].value = value;
    } else {
      newAnswers.push({
        questionIndex: currentQuestionIndex,
        value,
      });
    }

    setAnswers(newAnswers);

    // 延迟300毫秒后再进入下一题
    setTimeout(() => {
      if (currentQuestionIndex < mbtiQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateMBTIResult(newAnswers);
      }
    }, 300);
  };

  // 上一题
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 下一题
  const handleNext = () => {
    if (currentQuestionIndex < mbtiQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 计算MBTI结果
  const calculateMBTIResult = (answers: Answer[]) => {
    const counts = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    answers.forEach((answer) => {
      counts[answer.value as keyof typeof counts]++;
    });

    const result = [
      counts.E > counts.I ? "E" : "I",
      counts.S > counts.N ? "S" : "N",
      counts.T > counts.F ? "T" : "F",
      counts.J > counts.P ? "J" : "P",
    ].join("");

    // 将结果存储到本地
    const record = genRecordItem(result);
    setStorageSync("currentShowTestRecord", record);
    // 存储记录到本地
    const testRecords = getStorageSync("testRecords") || [];
    setStorageSync("testRecords", [record, ...testRecords]);

    // 计算完结果后跳转到结果页面
    navigateTo({
      url: "/pages/result/index",
    });
  };

  // 检查当前问题是否已回答
  const isAnswered = (questionIndex: number) => {
    return answers.some((a) => a.questionIndex === questionIndex);
  };

  // 获取当前问题的答案
  const getCurrentAnswer = () => {
    const answer = answers.find(
      (a) => a.questionIndex === currentQuestionIndex
    );
    return answer ? answer.value : null;
  };

  return (
    <ConfigProvider locale={zhCN}>
      {/* <Layout current={0}> */}
      <View className="container-index">
        <View className="content">
          <View className="card">
            <View className="question-container">
              {/* 进度条 */}
              <View className="progress">
                <Text className="progress-text">
                  问题 {currentQuestionIndex + 1} / {mbtiQuestions.length}
                </Text>
                <View className="progress-bar">
                  <View
                    className="progress-fill"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / mbtiQuestions.length) *
                        100
                      }%`,
                    }}
                  />
                </View>
              </View>
            </View>

            {/* 问题卡片 */}
            <View className="question-card">
              <Text className="question-text">{currentQuestion.question}</Text>

              <View className="choices">
                <Button
                  onClick={() => handleChoose(currentQuestion.choice_a.value)}
                  className={clsx("choice-button", {
                    selected:
                      getCurrentAnswer() === currentQuestion.choice_a.value,
                  })}
                >
                  <Text className="choice-text">
                    {currentQuestion.choice_a.text}
                  </Text>
                </Button>

                <Button
                  onClick={() => handleChoose(currentQuestion.choice_b.value)}
                  className={clsx("choice-button", {
                    selected:
                      getCurrentAnswer() === currentQuestion.choice_b.value,
                  })}
                >
                  <Text className="choice-text">
                    {currentQuestion.choice_b.text}
                  </Text>
                </Button>
              </View>
            </View>

            {/* 导航按钮 */}
            <View className="navigation">
              <Button
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevious}
                className={clsx("nav-button", "prev")}
              >
                上一题
              </Button>

              <Button
                disabled={
                  currentQuestionIndex === mbtiQuestions.length - 1 ||
                  !isAnswered(currentQuestionIndex)
                }
                onClick={handleNext}
                className={clsx("nav-button", "next", {
                  disabled:
                    currentQuestionIndex === mbtiQuestions.length - 1 ||
                    !isAnswered(currentQuestionIndex),
                })}
              >
                下一题
              </Button>
            </View>
          </View>
        </View>
      </View>
      {/* </Layout> */}
    </ConfigProvider>
  );
}

export default Test;
