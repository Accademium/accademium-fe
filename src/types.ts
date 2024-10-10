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

export interface CityRecommendation {
  city_name: string;
  description: string;
  ratings: {
    housing_availability: number;
    nightlife: number;
    societal_inclusion: number;
    work_opportunities: number;
    safety: number;
  };
}

export interface UniversityRecommendation {
  university_name: string;
  short_description: string;
  long_description: string;
}

export interface UserData {
  surveyResponses: SurveyAnswers;
  studyFieldChoice: string;
  studyProgramChoice: string;
  countryChoice: string;
  cityChoice: string;
  universityChoice: string;
}

export interface IOrientationSurveyContext {
  orientationSurveyIndex: number;
  progress: number;
  loading: boolean;
  userData: {
    surveyResponses: {};
    studyFieldChoice: string;
    studyProgramChoice: string;
    countryChoice: string;
    cityChoice: string;
    universityChoice: string;
  };
  surveyAnswers: SurveyAnswers;
  studyFieldRecommendations: StudyFieldRecommendation[];
  studyProgramRecommendations: StudyProgramRecommendation[];
  cityRecommendations: CityRecommendation[];
  universityRecommendations: UniversityRecommendation[];
  setOrientationSurveyIndex: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setSurveyAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
  setStudyFieldRecommendations: React.Dispatch<
    React.SetStateAction<StudyFieldRecommendation[]>
  >;
  setStudyProgramRecommendations: React.Dispatch<
    React.SetStateAction<StudyProgramRecommendation[]>
  >;
  setCityRecommendations: React.Dispatch<
    React.SetStateAction<CityRecommendation[]>
  >;
  setUniversityRecommendations: React.Dispatch<
    React.SetStateAction<UniversityRecommendation[]>
  >;
  getStudyFieldRecommendations: (surveyAnswers: SurveyAnswers) => void;
  getStudyProgramRecommendations: (
    studyField: string,
    surveyAnswers: SurveyAnswers
  ) => void;
  getCityRecommendations: (country: string) => void;
  getUniversityRecommendations: (city: string, studyProgram: string) => void;
}

export interface SurveyScreenProps {
  questionsAndAnswers: string[][];
}
