import { View } from "@tarojs/components";
import { Table, TableProps } from "@nutui/nutui-react-taro";
import styles from "./index.module.less";
import { Merge } from "t2t-tools";
import clsx from "clsx"

type TableProProps = Merge<
  TableProps,
  {
    bordered?: boolean;
    hiddenHead?: boolean;
  }
>;

// table基础组件，无边框，表格头部黑色
function TablePro(props: TableProProps) {
  return (
    <View className={clsx(styles.tableBox, props.hiddenHead && styles.hiddenHead)}>
      <Table bordered={false} {...props} />
    </View>
  );
}

export default TablePro;
