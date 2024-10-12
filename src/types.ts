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

export interface UniversityDetails {
  name: string;
  short_description: string;
  ranking: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  addressInfo: {
    campusLocation: string;
    globeLocation: string;
  };
  tuitionFee: {
    eu_students: string;
    non_eu_students: string;
  };
  programInfo: string;
  programDetails: string[];
  enrollmentDetails: {
    eu_students: string;
    non_eu_students: string;
    eligibility_criteria: string;
    language_requirements: string;
  };
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
  previousOrientationSurveyIndex: number;
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
  countryRecommendations: string[][];
  cityRecommendations: CityRecommendation[];
  universityRecommendations: UniversityRecommendation[];
  universityDetails: UniversityDetails;
  setOrientationSurveyIndex: React.Dispatch<React.SetStateAction<number>>;
  setPreviousOrientationSurveyIndex: React.Dispatch<
    React.SetStateAction<number>
  >;
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
  setCountryRecommendations: React.Dispatch<React.SetStateAction<string[][]>>;
  setCityRecommendations: React.Dispatch<
    React.SetStateAction<CityRecommendation[]>
  >;
  setUniversityRecommendations: React.Dispatch<
    React.SetStateAction<UniversityRecommendation[]>
  >;
  setUniversityDetails: React.Dispatch<React.SetStateAction<UniversityDetails>>;
  getStudyFieldRecommendations: (surveyAnswers: SurveyAnswers) => void;
  getStudyProgramRecommendations: (
    studyField: string,
    surveyAnswers: SurveyAnswers
  ) => void;
  getCityRecommendations: (country: string) => void;
  getUniversityRecommendations: (city: string, studyProgram: string) => void;
  getUniversityDetails: (university: string, studyProgram: string) => void;
}

export interface SurveyScreenProps {
  questionsAndAnswers: string[][];
}
