import { View, Text } from "@tarojs/components";
import { ConfigProvider } from "@nutui/nutui-react-taro";
import zhCN from "@nutui/nutui-react-taro/dist/locales/zh-CN";
import { useEffect, useState } from "react";
import { getStorageSync, setStorageSync, navigateTo } from "@tarojs/taro";
import dayjs from "dayjs";
import "./index.less";
import { TestRecord } from "src/utils/genRecordItem";

function Record() {
  const [records, setRecords] = useState<TestRecord[]>([]);

  useEffect(() => {
    // 从本地存储获取测试记录
    const testRecords = getStorageSync("testRecords") || [];
    setRecords(testRecords);
  }, []);

  const handleRecordClick = (record: TestRecord) => {
    // 设置选中的MBTI结果
    setStorageSync("currentShowTestRecord", record);
    // 跳转到结果页面
    navigateTo({
      url: "/pages/result/index",
    });
  };

  if (records.length === 0) {
    return (
      <View className="empty-state">
        <Text className="empty-text">暂无测试记录</Text>
      </View>
    );
  }

  return (
    <ConfigProvider locale={zhCN}>
      <View className="record-page">
        <View className="record-list">
          {records.map((record, index) => (
            <View
              key={index}
              className="record-item"
              onClick={() => handleRecordClick(record)}
            >
              <View className="record-main">
                <Text className="record-title">{record.title}</Text>
                <Text className="record-type">{record.mbtiType}</Text>
              </View>
              <Text className="record-time">
                {dayjs(record.time).format("YYYY-MM-DD HH:mm")}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ConfigProvider>
  );
}

export default Record;
