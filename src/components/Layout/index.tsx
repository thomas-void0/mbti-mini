import { View, Text } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
import { ReactNode } from "react";
import "./index.less";

interface LayoutProps {
  children: ReactNode;
  current: number;
}

function Layout({ children, current }: LayoutProps) {
  return (
    <View className="layout">
      <View className="layout-content">{children}</View>
      <View className="tab-bar">
        <View
          className={`tab-item ${current === 0 ? "active" : ""}`}
          onClick={() => navigateTo({ url: "/pages/index/index" })}
        >
          <View className="tab-icon home-icon" />
          <Text className="tab-text">首页</Text>
        </View>
        <View
          className={`tab-item ${current === 1 ? "active" : ""}`}
          onClick={() => navigateTo({ url: "/pages/my/index" })}
        >
          <View className="tab-icon my-icon" />
          <Text className="tab-text">我的</Text>
        </View>
      </View>
    </View>
  );
}

export default Layout;
