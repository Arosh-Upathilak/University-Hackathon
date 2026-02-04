import { ChallengeDifficultyLevel } from "@/constant/Type";

export const difficultyToNumber = (
  level: ChallengeDifficultyLevel
): number => {
  switch (level) {
    case ChallengeDifficultyLevel.Easy:
      return 0;
    case ChallengeDifficultyLevel.Medium:
      return 1;
    case ChallengeDifficultyLevel.Hard:
      return 2;
    default:
      return 0;
  }
};


export const numberToDifficulty = (
  value: number
): ChallengeDifficultyLevel => {
  switch (value) {
    case 0:
      return ChallengeDifficultyLevel.Easy;
    case 1:
      return ChallengeDifficultyLevel.Medium;
    case 2:
      return ChallengeDifficultyLevel.Hard;
    default:
      return ChallengeDifficultyLevel.Easy;
  }
};
