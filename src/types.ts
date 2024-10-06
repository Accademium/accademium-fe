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

export interface StudyFieldRecommendation {
  study_field: string;
  reason: string;
}

export interface StudyProgramRecommendation {
  study_program: string;
  reason: string;
  career_prospects: string;
}

export interface IOrientationSurveyContext {
  orientationSurveyIndex: number;
  progress: number;
  loading: boolean;
  surveyAnswers: SurveyAnswers;
  studyFieldRecommendations: StudyFieldRecommendation[];
  studyProgramRecommendations: StudyProgramRecommendation[];
  setOrientationSurveyIndex: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSurveyAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
  setStudyFieldRecommendations: React.Dispatch<
    React.SetStateAction<StudyFieldRecommendation[]>
  >;
  setStudyProgramRecommendations: React.Dispatch<
    React.SetStateAction<StudyProgramRecommendation[]>
  >;
  getStudyFieldRecommendations: (surveyAnswers: SurveyAnswers) => void;
  getStudyProgramRecommendations: (
    studyField: string,
    surveyAnswers: SurveyAnswers
  ) => void;
}

export interface SurveyScreenProps {
  questionsAndAnswers: string[][];
}
