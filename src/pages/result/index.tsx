import { View, Text } from "@tarojs/components";
import { Button, ConfigProvider } from "@nutui/nutui-react-taro";
import zhCN from "@nutui/nutui-react-taro/dist/locales/zh-CN";
import { useEffect, useState } from "react";
import { navigateTo, setStorageSync, getStorageSync } from "@tarojs/taro";
import { MBTIResultData, mbtiResultMap } from "./sourceData";
import "./index.less";
import dayjs from "dayjs";

function Result() {
  const [mbtiType, setMbtiType] = useState<string>("");
  const [resultData, setResultData] = useState<MBTIResultData | null>(null);
  const [loading, setLoading] = useState(true); // 添加 loading 状态

  // Get MBTI result from storage
  useEffect(() => {
    setLoading(true); // 开始加载
    const result = getStorageSync("mbtiResult");
    if (result) {
      setMbtiType(result);
      const data = mbtiResultMap[result];
      if (data) {
        setResultData(data);
        // 在本地存储报告记录
        const testRecords = getStorageSync("testRecords") || [];
        const newRecord = {
          title: data.name,
          mbtiResult: result,
          time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };
        setStorageSync("testRecords", [newRecord, ...testRecords]);
      }
    }
    setTimeout(() => {
      setLoading(false); // 结束加载
    }, 1000); // 添加一个小延迟，让加载动画更明显
  }, []);

  if (loading || !resultData) {
    return (
      <View className="loading">
        <View className="loading-spinner" />
        <Text className="text">加载中...</Text>
      </View>
    );
  }
  const handleBack = () => {
    navigateTo({
      url: "/pages/test/index",
    });
  };

  return (
    <ConfigProvider locale={zhCN}>
      <View className="result-page">
        <View className="result-content">
          {/* 标题部分 */}
          <View className="result-header">
            <Text className="result-type">{mbtiType}</Text>
            <Text className="result-name">{resultData.name}</Text>
            <Text className="result-overview">{resultData.overview}</Text>
          </View>

          {/* 主要特征卡片 */}
          <View className="feature-card">
            <Text className="card-title">性格特征</Text>
            <View className="feature-list">
              {resultData.characteristics.map((trait, index) => (
                <Text key={index} className="feature-item">
                  {trait}
                </Text>
              ))}
            </View>
          </View>

          {/* 优势和劣势并排显示 */}
          <View className="two-column-container">
            <View className="feature-card flex-1">
              <Text className="card-title success-title">个人优势</Text>
              <View className="feature-list">
                {resultData.strengths.map((strength, index) => (
                  <Text key={index} className="feature-item success-item">
                    {strength}
                  </Text>
                ))}
              </View>
            </View>

            <View className="feature-card flex-1">
              <Text className="card-title warning-title">需要注意</Text>
              <View className="feature-list">
                {resultData.weaknesses.map((weakness, index) => (
                  <Text key={index} className="feature-item warning-item">
                    {weakness}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* 职业建议 */}
          <View className="feature-card career-card">
            <Text className="card-title">适合的职业</Text>
            <View className="career-list">
              {resultData.suitable_careers.map((career, index) => (
                <Text key={index} className="career-item">
                  {career}
                </Text>
              ))}
            </View>
          </View>

          {/* 关系特征 */}
          <View className="feature-card relationship-card">
            <Text className="card-title">关系特征</Text>
            <Text className="love-style">
              {resultData.relationship.love_style}
            </Text>

            <View className="match-section">
              <Text className="match-title">最佳匹配类型</Text>
              <View className="match-list">
                {resultData.relationship.best_matches.map((match, index) => (
                  <Text key={index} className="match-item">
                    {match}
                  </Text>
                ))}
              </View>
            </View>

            <View className="trait-section">
              <Text className="trait-title">关系特点</Text>
              <View className="trait-list">
                {resultData.relationship.relationship_traits.map(
                  (trait, index) => (
                    <Text key={index} className="trait-item">
                      {trait}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>

          {/* 返回按钮 */}
          {/* 底部按钮组 */}
          <View className="button-group">
            <Button onClick={handleBack} className="share-btn">
              再次测试
            </Button>
            <Button
              className="record-btn"
              onClick={() => navigateTo({ url: "/pages/record/index" })}
            >
              测试记录
            </Button>
          </View>
        </View>
      </View>
    </ConfigProvider>
  );
}

export default Result;
