import { IconType } from "react-icons";

export type InputProps = {
  labelText?: string;
  name?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRightIconClick?: () => void;
};

export type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
};

export type UseContextProps = {
  url: string | undefined;
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
  fetchUserData: () => Promise<void>;
  handleLogout: () => void;
  loading: boolean;
  error: string | null;
};

export interface UserProps {
  id: string;
  userName: string;
  email: string;
  role: string;
}

export type RoleRouteProps = {
  allowedRoles?: ("User" | "Admin")[];
  children: React.ReactNode;
};

export type AdminCartProps = {
  headerText: string;
  Icon: IconType;
  IconStyle: string;
  count: string;
};

export type CompetitionCartProps = {
  id: number;
  name: string;
  header: string;
  image: string;
  status: "Live" | "Upcoming" | "Completed";
  registered: number;
  numberOfQuestion: number;
  startDate: string;
  endDate: string;
  startDateTime: string;
  endDateTime: string;
  creators: string;
};

export type RichTextEditorProps = {
  placeholder: string;
  value?: string;
  onChange?: (content: string) => void;
};

export type BackButtonProps = {
  links?: string;
  text?: string;
};

export type TestCaseItemProps = {
  id: number;
  chalange_testcase_input: string;
  chalange_testcase_output: string;
  hidden: boolean;
};

export enum ChallengeDifficultyLevel {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}


export type TestCaseProps = {
  index: number;
  item: {
    id: number;
    Input: string;
    Output: string;
    IsHidden: boolean;
  };
  removeTestCase?: (id: number) => void;
  updateTestCase?: (
    id: number,
    field: "Input" | "Output" | "IsHidden",
    value: string | boolean
  ) => void;
};


export type LanguageSelectorProps = {
  language: string;
  onSelect: (lang: string) => void;
};


export type CodeEditorProps = {
  value: string;
  language?: string;
  onChange?: (value: string) => void;
  onLanguageChange?: (language: string) => void;
};

export interface PopUpMessageProps {
  onClose: () => void;
  deleteCompetitionId?: number;
  onConfirm?: () => void;
}


export interface CompetitionProps {
  competitionId: number;
  createdByUserId: string;
  competitionName: string;
  competitionTagLine: string;
  competitionDescription: string;
  competitionImageLink: string;
  startDateTime: string;
  endDateTime: string;
  registrationEndDateTime: string;

  isVisibleForStudents: boolean;
  numberOfQuestions: number;

  rules: string;
  createdAt: string;

  problems?: CompetitionProblem[];
  registrations? : CompetitionRegistration[];
}

export interface CompetitionRegistration {
  competitionRegistrationId: number;
  studentId: string;
  registeredAt: string;
}

export interface CompetitionProblem {
  competitionProblemId: number;
  title: string;
  difficultyLevel: string;
  totalPoints: number;
}

export interface CodingProblemProps {
  competitionProblemId: number;
  title: string;
  problemDescription: string;
  totalPoints: number;
  difficultyLevel: string;
  sampleInput: string;
  sampleOutput: string;
  testCases?: TestCase[];
}

export interface TestCase {
  testCaseId: number;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}


export interface CompetitionRegistration {
  competitionRegistrationId: number;
  studentId: string;
  studentName: string;
  competitionId: number;
  registeredAt: string;
}
