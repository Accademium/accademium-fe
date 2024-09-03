// @TODO Convert this to a mapping!
export interface SurveyAnswers {
  careerInterests: string;
  workEnvironment: string;
  problemSolving: string;
  skillsDevelopment: string;
  taskPreference: string;
  learningPreference: string;
  careerGoals: string;
  careerMotivation: string;
  adversityHandling: string;
  workLifeBalance: string;
}

export interface Recommendation {
  study_field: string;
  reason: string;
}

export interface IOrientationSurveyContext {
  orientationSurveyIndex: number;
  loading: boolean;
  disabled: boolean;
  surveyAnswers: SurveyAnswers;
  recommendations: Recommendation[];
  setOrientationSurveyIndex: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setSurveyAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
  generateRecommendations: (surveyAnswers: SurveyAnswers) => void;
}

export interface SurveyScreenProps {
  questionsAndAnswers: string[][];
}
