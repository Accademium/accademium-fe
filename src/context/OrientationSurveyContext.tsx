import React, { createContext, useState } from 'react';

import {
  IOrientationSurveyContext,
  SurveyAnswers,
  StudyFieldRecommendation,
  StudyProgramRecommendation,
} from '@/types';

import { getQuestions, getStudyFields, getJsonRegex } from '@/utils';

export const OrientationSurveyContext =
  createContext<IOrientationSurveyContext>({
    orientationSurveyIndex: 0,
    progress: 0,
    loading: false,
    surveyAnswers: {
      careerInterests: '',
      workEnvironment: '',
      problemSolving: '',
      skillsDevelopment: '',
      taskPreference: '',
      learningPreference: '',
      careerGoals: '',
      careerMotivation: '',
      adversityHandling: '',
      workLifeBalance: '',
    },
    studyFieldRecommendations: [],
    studyProgramRecommendations: [],
    setOrientationSurveyIndex: () => {},
    setProgress: () => {},
    setLoading: () => {},
    setSurveyAnswers: () => {},
    setStudyFieldRecommendations: () => {},
    setStudyProgramRecommendations: () => {},
    getStudyFieldRecommendations: () => {},
    getStudyProgramRecommendations: () => {},
  });

export const OrientationSurveyProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [orientationSurveyIndex, setOrientationSurveyIndex] =
    useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({
    careerInterests: '',
    workEnvironment: '',
    problemSolving: '',
    skillsDevelopment: '',
    taskPreference: '',
    learningPreference: '',
    careerGoals: '',
    careerMotivation: '',
    adversityHandling: '',
    workLifeBalance: '',
  });
  const [studyFieldRecommendations, setStudyFieldRecommendations] = useState<
    StudyFieldRecommendation[]
  >([]);

  const [studyProgramRecommendations, setStudyProgramRecommendations] =
    useState<StudyProgramRecommendation[]>([]);

  const getStudyFieldRecommendations = async (surveyAnswers: SurveyAnswers) => {
    setLoading(true);

    const prompt = `Based on the answers provided in the orientation survey below, recommend three study fields from the predefined study fields that would be the most suitable for the individual.

      Orientation Survey Questions and Answers:
      1. ${getQuestions()[0]} ${surveyAnswers.careerInterests}
      2. ${getQuestions()[1]} ${surveyAnswers.workEnvironment}
      3. ${getQuestions()[2]} ${surveyAnswers.problemSolving}
      4. ${getQuestions()[3]} ${surveyAnswers.skillsDevelopment}
      5. ${getQuestions()[4]} ${surveyAnswers.taskPreference}
      6. ${getQuestions()[5]} ${surveyAnswers.learningPreference}
      7. ${getQuestions()[6]} ${surveyAnswers.careerGoals}
      8. ${getQuestions()[7]} ${surveyAnswers.careerMotivation}
      9. ${getQuestions()[8]} ${surveyAnswers.adversityHandling}
      10. ${getQuestions()[9]} ${surveyAnswers.workLifeBalance}

      Predefined Study Fields: ${getStudyFields().join(', ')}

      Please provide the recommendations in the following JSON format:

      {
          "recommendations": [
              {
                  "study_field": "Field 1",
                  "reason": "Reason for recommending Field 1 based on the orientation survey answers."
              },
              {
                  "study_field": "Field 2",
                  "reason": "Reason for recommending Field 2 based on the orientation survey answers."
              },
              {
                  "study_field": "Field 3",
                  "reason": "Reason for recommending Field 3 based on the orientation survey answers."
              }
          ]
      }
    `;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are an expert in education and career counseling.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-4o',
        temperature: 0.2,
        max_tokens: 1000,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );

      const json = await response.json();

      const data = json.choices[0].message.content;
      console.log('Data: ', data);
      const dataFormatted = data.replace(getJsonRegex(), '');
      console.log('Data Formatted:', dataFormatted);
      const dataParsed = JSON.parse(dataFormatted);
      console.log('Data Parsed:', dataParsed);

      const { recommendations } = dataParsed;

      setStudyFieldRecommendations(recommendations);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudyProgramRecommendations = async (
    studyField: string,
    surveyAnswers: SurveyAnswers
  ) => {
    setLoading(true);

    const prompt = `Based on the user's choice of study field and their orientation survey answers, recommend nine relevant study programs in this field. Please format the response strictly in JSON without any additional text or assumptions. Do not include degree levels like "Master" or "Bachelor" in the study program names.

      User's Chosen Study Field: ${studyField}

      Orientation Survey Questions and Answers:
      1. ${getQuestions()[0]} ${surveyAnswers.careerInterests}
      2. ${getQuestions()[1]} ${surveyAnswers.workEnvironment}
      3. ${getQuestions()[2]} ${surveyAnswers.problemSolving}
      4. ${getQuestions()[3]} ${surveyAnswers.skillsDevelopment}
      5. ${getQuestions()[4]} ${surveyAnswers.taskPreference}
      6. ${getQuestions()[5]} ${surveyAnswers.learningPreference}
      7. ${getQuestions()[6]} ${surveyAnswers.careerGoals}
      8. ${getQuestions()[7]} ${surveyAnswers.careerMotivation}
      9. ${getQuestions()[8]} ${surveyAnswers.adversityHandling}
      10. ${getQuestions()[9]} ${surveyAnswers.workLifeBalance}

      Please provide the recommendations in the following JSON format:

      {
          "recommendations": [
              {
                  "study_program": "Program 1",
                  "reason": "Reason for recommending Program 1 based on the orientation survey answers and its alignment with the chosen field.",
                  "career_prospects": "Potential career opportunities after completing Program 1."
              },
              {
                  "study_program": "Program 2",
                  "reason": "Reason for recommending Program 2 based on the orientation survey answers and its alignment with the chosen field.",
                  "career_prospects": "Potential career opportunities after completing Program 2."
              },
              ...
          ]
      }
    `;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are an expert in education and career counseling.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-4o',
        temperature: 0.2,
        max_tokens: 1000,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );

      const json = await response.json();

      const data = json.choices[0].message.content;
      console.log('Data: ', data);
      const dataFormatted = data.replace(getJsonRegex(), '');
      console.log('Data Formatted:', dataFormatted);
      const dataParsed = JSON.parse(dataFormatted);
      console.log('Data Parsed:', dataParsed);

      const { recommendations } = dataParsed;

      setStudyProgramRecommendations(recommendations);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrientationSurveyContext.Provider
      value={{
        orientationSurveyIndex,
        progress,
        loading,
        surveyAnswers,
        studyFieldRecommendations,
        studyProgramRecommendations,
        setOrientationSurveyIndex,
        setProgress,
        setLoading,
        setSurveyAnswers,
        setStudyFieldRecommendations,
        setStudyProgramRecommendations,
        getStudyFieldRecommendations,
        getStudyProgramRecommendations,
      }}
    >
      {children}
    </OrientationSurveyContext.Provider>
  );
};
