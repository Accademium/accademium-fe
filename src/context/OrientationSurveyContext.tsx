import React, { createContext, useState } from 'react';

import {
  IOrientationSurveyContext,
  UserData,
  SurveyAnswers,
  StudyFieldRecommendation,
  StudyProgramRecommendation,
  CityRecommendation,
  UniversityRecommendation,
} from '@/types';

import { getQuestions, getStudyFields, getJsonRegex } from '@/utils';

export const OrientationSurveyContext =
  createContext<IOrientationSurveyContext>({
    orientationSurveyIndex: 0,
    progress: 0,
    loading: false,
    userData: {
      surveyResponses: {},
      studyFieldChoice: '',
      studyProgramChoice: '',
      countryChoice: '',
      cityChoice: '',
      universityChoice: '',
    },
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
    cityRecommendations: [],
    universityRecommendations: [],
    setOrientationSurveyIndex: () => {},
    setProgress: () => {},
    setLoading: () => {},
    setUserData: () => {},
    setSurveyAnswers: () => {},
    setStudyFieldRecommendations: () => {},
    setStudyProgramRecommendations: () => {},
    setCityRecommendations: () => {},
    setUniversityRecommendations: () => {},
    getStudyFieldRecommendations: () => {},
    getStudyProgramRecommendations: () => {},
    getCityRecommendations: () => {},
    getUniversityRecommendations: () => {},
  });

export const OrientationSurveyProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [orientationSurveyIndex, setOrientationSurveyIndex] =
    useState<number>(6);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    surveyResponses: {
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
    studyFieldChoice: '',
    studyProgramChoice: 'Communication Studies',
    countryChoice: '',
    cityChoice: '',
    universityChoice: 'Hanze University of Applied Sciences',
  });

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

  const [cityRecommendations, setCityRecommendations] = useState<
    CityRecommendation[]
  >([
    {
      city_name: 'Amsterdam',
      description:
        'Amsterdam is a vibrant city known for its historic canals, diverse culture, and renowned museums, making it a hub of art and commerce.',
      ratings: {
        housing_availability: 3.0,
        nightlife: 5.0,
        societal_inclusion: 4.5,
        work_opportunities: 4.5,
        safety: 3.5,
      },
    },
    {
      city_name: 'Utrecht',
      description:
        'Utrecht is a charming city with a medieval old town, lively student population, and a strong focus on sustainability and innovation.',
      ratings: {
        housing_availability: 3.5,
        nightlife: 4.0,
        societal_inclusion: 4.0,
        work_opportunities: 4.0,
        safety: 4.0,
      },
    },
    {
      city_name: 'Rotterdam',
      description:
        'Rotterdam is a modern city known for its impressive architecture, bustling port, and a dynamic cultural scene.',
      ratings: {
        housing_availability: 4.0,
        nightlife: 4.5,
        societal_inclusion: 4.0,
        work_opportunities: 4.5,
        safety: 3.5,
      },
    },
    {
      city_name: 'Leiden',
      description:
        'Leiden is a picturesque city with a rich history, home to one of the oldest universities in the Netherlands, and a vibrant student life.',
      ratings: {
        housing_availability: 3.5,
        nightlife: 3.5,
        societal_inclusion: 4.5,
        work_opportunities: 3.5,
        safety: 4.5,
      },
    },
    {
      city_name: 'Groningen',
      description:
        'Groningen is a youthful city with a large student population, known for its lively cultural scene and innovative spirit.',
      ratings: {
        housing_availability: 4.0,
        nightlife: 4.5,
        societal_inclusion: 4.5,
        work_opportunities: 3.5,
        safety: 4.0,
      },
    },
  ]);

  const [universityRecommendations, setUniversityRecommendations] = useState<
    UniversityRecommendation[]
  >([
    {
      university_name: 'University of Amsterdam',
      short_description:
        'The University of Amsterdam is a public university located in Amsterdam, Netherlands, known for its rich history and diverse student body.',
      long_description:
        "The University of Amsterdam, established in 1632, is the third-oldest university in the Netherlands. It is one of the largest research universities in Europe with 30,000 students, 5,000 staff and 285 study programs. The university's Communication and Media Studies program is ranked among the top in the world.",
    },
    {
      university_name: 'VU University Amsterdam',
      short_description:
        'VU University Amsterdam is a state-funded university with a distinct social and scientific vision.',
      long_description:
        "VU University Amsterdam, founded in 1880, offers a variety of study programs in different fields. The university's Communication Science program provides students with a thorough understanding of the field of communication, preparing them for careers in a wide range of sectors. The university is committed to making a significant contribution to a sustainable society.",
    },
  ]);

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

  const getCityRecommendations = async (country: string) => {
    setLoading(true);

    const prompt = `Based on the selected country ${country}, provide details about five cities within this country suitable for students. Please include a brief description of each city similar to the following example:
    “Amsterdam is a vibrant city known for its historic canals, diverse culture, and renowned museums, making it a hub of art and commerce.”

    Additionally, rate each city for the following five categories on a scale of 1 to 5 stars (half-star ratings are allowed):

    •	housing_availability
    •	nightlife
    •	societal_inclusion
    •	work_opportunities
    •	safety

    Please format the response strictly in JSON without any additional text or assumptions.

    The JSON format should look like this:
        
    {
      "recommendations": [
        {
          "city_name": "City Name",
          "description": "Short description of the city.",
          "ratings": {
            "housing_availability": 4.5,
            "nightlife": 3.0,
            "societal_inclusion": 4.0,
            "work_opportunities": 5.0,
            "safety": 3.5
          }
        },
        {
          "city_name": "City Name",
          "description": "Short description of the city.",
          "ratings": {
            "housing_availability": 4.0,
            "nightlife": 2.5,
            "societal_inclusion": 4.5,
            "work_opportunities": 3.5,
            "safety": 4.0
          }
        },
        ...
      ]
    }`;

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

      setCityRecommendations(recommendations);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getUniversityRecommendations = async (
    city: string,
    studyProgram: string
  ) => {
    setLoading(true);

    const prompt = `Based on the selected city "${city}" and the study program "${studyProgram}", provide details about two universities within this city that offer relevant programs. Please include a brief description and a longer description for each university, formatted as follows:
  
    Short description example:
    "Hanze University of Applied Sciences is a leading institution known for its practical approach to education, strong industry connections, and emphasis on innovation and entrepreneurship."
  
    Long description example:
    "University of Groningen is a public research university in the northern Netherlands and one of the most traditional and prestigious universities in the Netherlands. University of Groningen was founded in 1614, making it the second oldest in the country, after Leiden University. Notable Alumni of the University of Groningen include four Nobel Prize winners, nine Spinoza Prize winners, one Stevin Prize winner, and various members of the Dutch royal family."
  
    Please format the response strictly in JSON without any additional text or assumptions. The JSON format should look like this:
  
    {
      "recommendations": [
        {
          "university_name": "University Name",
          "short_description": "Brief description of the university.",
          "long_description": "Detailed description of the university."
        },
        {
          "university_name": "University Name",
          "short_description": "Brief description of the university.",
          "long_description": "Detailed description of the university."
        },
        ...
      ]
    }`;

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
        model: 'gpt-4',
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

      setUniversityRecommendations(recommendations);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <OrientationSurveyContext.Provider
      value={{
        orientationSurveyIndex,
        progress,
        loading,
        userData,
        surveyAnswers,
        studyFieldRecommendations,
        studyProgramRecommendations,
        cityRecommendations,
        universityRecommendations,
        setOrientationSurveyIndex,
        setProgress,
        setLoading,
        setUserData,
        setSurveyAnswers,
        setStudyFieldRecommendations,
        setStudyProgramRecommendations,
        setCityRecommendations,
        setUniversityRecommendations,
        getStudyFieldRecommendations,
        getStudyProgramRecommendations,
        getCityRecommendations,
        getUniversityRecommendations,
      }}
    >
      {children}
    </OrientationSurveyContext.Provider>
  );
};
