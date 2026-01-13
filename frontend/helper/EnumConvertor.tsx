import { ChallengeDifficultyLevel } from "@/constant/Type";

export const difficultyToNumber = (
  level: ChallengeDifficultyLevel
): number => {
  switch (level) {
    case ChallengeDifficultyLevel.Easy:
      return 1;
    case ChallengeDifficultyLevel.Medium:
      return 2;
    case ChallengeDifficultyLevel.Hard:
      return 3;
    default:
      return 0;
  }
};


export const numberToDifficulty = (
  value: number
): ChallengeDifficultyLevel => {
  switch (value) {
    case 1:
      return ChallengeDifficultyLevel.Easy;
    case 2:
      return ChallengeDifficultyLevel.Medium;
    case 3:
      return ChallengeDifficultyLevel.Hard;
    default:
      return ChallengeDifficultyLevel.Easy;
  }
};
