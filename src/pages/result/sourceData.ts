import ENTJ from "src/assets/data/mbti-result/ENTJ.json";
import INTJ from "src/assets/data/mbti-result/INTJ.json";
import ENTP from "src/assets/data/mbti-result/ENTP.json";
import INTP from "src/assets/data/mbti-result/INTP.json";
import ENFJ from "src/assets/data/mbti-result/ENFJ.json";
import INFJ from "src/assets/data/mbti-result/INFJ.json";
import ENFP from "src/assets/data/mbti-result/ENFP.json";
import INFP from "src/assets/data/mbti-result/INFP.json";
import ESTJ from "src/assets/data/mbti-result/ESTJ.json";
import ISTJ from "src/assets/data/mbti-result/ISTJ.json";
import ESFJ from "src/assets/data/mbti-result/ESFJ.json";
import ISFJ from "src/assets/data/mbti-result/ISFJ.json";
import ESTP from "src/assets/data/mbti-result/ESTP.json";
import ISTP from "src/assets/data/mbti-result/ISTP.json";
import ESFP from "src/assets/data/mbti-result/ESFP.json";
import ISFP from "src/assets/data/mbti-result/ISFP.json";

export type MBTIResultData = {
  name: string;
  overview: string;
  characteristics: string[];
  personality_traits: string[];
  strengths: string[];
  weaknesses: string[];
  suitable_careers: string[];
  relationship: {
    love_style: string;
    best_matches: string[];
    relationship_traits: string[];
  };
};

export const mbtiResultMap: Record<string, MBTIResultData> = {
  ENTJ,
  INTJ,
  ENTP,
  INTP,
  ENFJ,
  INFJ,
  ENFP,
  INFP,
  ESTJ,
  ISTJ,
  ESFJ,
  ISFJ,
  ESTP,
  ISTP,
  ESFP,
  ISFP,
};