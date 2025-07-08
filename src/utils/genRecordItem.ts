import dayjs from "dayjs";
import { MBTIResultData, mbtiResultMap, MBTIType } from "./sourceData";

export type TestRecord = {
  title: string;
  mbtiType: MBTIType;
  resultData: MBTIResultData;
  time: string;
  key: number;
};

export default function (mbtiType: string) {
  const data = mbtiResultMap[mbtiType];

  return {
    title: data.name,
    resultData: data,
    mbtiType: mbtiType,
    time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    key: Date.now(),
  };
}
