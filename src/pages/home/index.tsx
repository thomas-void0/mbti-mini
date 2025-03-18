import { View, Text, Image } from "@tarojs/components";
import { Button } from "@nutui/nutui-react-taro";
import { navigateTo } from "@tarojs/taro";
import homeImage from "src/assets/images/home.jpg";
import "./index.less";

function Home() {
  const handleStartTest = () => {
    navigateTo({ url: "/pages/test/index" });
  };

  return (
    <View className="container-home">
      <View className="content">
        <View className="header">
          <Image src={homeImage} className="header-image" mode="aspectFill" />
          <Text className="title">MBTI 性格测试</Text>
        </View>

        <View className="introduction">
          <View className="section">
            <Text className="section-title">测试须知</Text>
            <Text className="section-text">
              请务必诚实、独立地回答问题，只有如此，才能得到有效的结果。
            </Text>
          </View>

          <View className="section">
            <Text className="section-title">关于性格分析</Text>
            <Text className="section-text">
              性格分析展示的是你的性格倾向，而不是你的知识、技能、经验。
            </Text>
          </View>

          <View className="section">
            <Text className="section-title">类型说明</Text>
            <Text className="section-text">
              MBTI提供的性格类型描述仅供测试者确定自己的性格类型之用，性格类型没有好坏，只有不同。每一种性格特征都有其价值和优点，也有缺点和需要注意的地方。
            </Text>
            <Text className="section-text">
              清楚地了解自己的性格优劣势，有利于更好地发挥自己的特长，而尽可能地在为人处事中避免自己性格中的劣势，更好地和他人相处，更好地作重要的决策。
            </Text>
          </View>

          <View className="section">
            <Text className="section-title">温馨提示</Text>
            <Text className="section-text">测试结果仅供参考</Text>
          </View>
        </View>

        <View className="btn-box">
          <Button className="start-button" onClick={handleStartTest}>
            开始测试
          </Button>
          <Button
            className="record-button"
            onClick={() => navigateTo({ url: "/pages/record/index" })}
          >
            测试记录
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Home;
