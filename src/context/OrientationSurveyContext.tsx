import React, { createContext, useState } from 'react';

import {
  IOrientationSurveyContext,
  UserData,
  SurveyAnswers,
  StudyFieldRecommendation,
  StudyProgramRecommendation,
  CityRecommendation,
  UniversityRecommendation,
  UniversityDetails,
} from '@/types';

import { getQuestions, getStudyFields, getJsonRegex } from '@/utils';

export const OrientationSurveyContext =
  createContext<IOrientationSurveyContext>({
    orientationSurveyIndex: 0,
    previousOrientationSurveyIndex: 0,
    progress: 0,
    loading: false,
    userData: {
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
    countryRecommendations: [],
    cityRecommendations: [],
    universityRecommendations: [],
    universityDetails: {
      name: '',
      short_description: '',
      ranking: '',
      contactInfo: {
        phone: '',
        email: '',
      },
      addressInfo: {
        campusLocation: '',
        globeLocation: '',
      },
      tuitionFee: {
        eu_students: '',
        non_eu_students: '',
      },
      programInfo: '',
      programDetails: [],
      enrollmentDetails: {
        eu_students: '',
        non_eu_students: '',
        eligibility_criteria: '',
        language_requirements: '',
      },
    },
    setOrientationSurveyIndex: () => {},
    setPreviousOrientationSurveyIndex: () => {},
    setProgress: () => {},
    setLoading: () => {},
    setUserData: () => {},
    setSurveyAnswers: () => {},
    setStudyFieldRecommendations: () => {},
    setStudyProgramRecommendations: () => {},
    setCountryRecommendations: () => {},
    setCityRecommendations: () => {},
    setUniversityRecommendations: () => {},
    setUniversityDetails: () => {},
    getStudyFieldRecommendations: () => {},
    getStudyProgramRecommendations: () => {},
    getCityRecommendations: () => {},
    getUniversityRecommendations: () => {},
    getUniversityDetails: () => {},
  });

export const OrientationSurveyProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [orientationSurveyIndex, setOrientationSurveyIndex] =
    useState<number>(0);
  const [previousOrientationSurveyIndex, setPreviousOrientationSurveyIndex] =
    useState<number>(0);
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
    studyProgramChoice: '',
    countryChoice: '',
    cityChoice: '',
    universityChoice: '',
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

  const [countryRecommendations, setCountryRecommendations] = useState<
    string[][]
  >([
    [
      '../../images/Flag_of_Germany.svg',
      'Germany',
      'Germany is known for its rich history, cultural heritage, and leading role in automotive engineering, technology, and innovation.',
    ],
    [
      '../../images/Flag_of_the_Netherlands.svg',
      'Netherlands',
      'Netherlands is celebrated for its progressive policies, picturesque landscapes, and strong emphasis on sustainable living and cycling culture.',
    ],
    [
      '../../images/Flag_of_Austria.svg',
      'Austria',
      'Austria is renowned for its stunning alpine scenery, classical music heritage, and contributions to art and culture.',
    ],

    [
      '../../images/Flag_of_the_Switzerland.svg',
      'Switzerland',
      'Switzerland is famous for its breathtaking landscapes, exceptional quality of life, and expertise in finance, precision engineering, and watchmaking.',
    ],
    [
      '../../images/Flag_of_England.svg',
      'England',
      'England is a country with a deep historical legacy, influential cultural exports, and a global impact through literature, science, and industry.',
    ],
  ]);

  const [cityRecommendations, setCityRecommendations] = useState<
    CityRecommendation[]
  >([]);

  const [universityRecommendations, setUniversityRecommendations] = useState<
    UniversityRecommendation[]
  >([]);

  const [universityDetails, setUniversityDetails] = useState<UniversityDetails>(
    {
      name: '',
      short_description: '',
      ranking: '',
      contactInfo: {
        phone: '',
        email: '',
      },
      addressInfo: {
        campusLocation: '',
        globeLocation: '',
      },
      tuitionFee: {
        eu_students: '',
        non_eu_students: '',
      },
      programInfo: '',
      programDetails: ['', '', '', '', '', ''],
      enrollmentDetails: {
        eu_students: '',
        non_eu_students: '',
        eligibility_criteria: '',
        language_requirements: '',
      },
    }
  );

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

      setUniversityRecommendations(recommendations);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getUniversityDetails = async (
    university: string,
    studyProgram: string
  ) => {
    setLoading(true);

    const prompt = `Provide detailed information about the university "${university}" and its "${studyProgram}" program. Please include the following data:
    - University name
    - Short description highlighting a notable achievement or ranking of the university (e.g., "Hanze University of Applied Sciences is ranked 25th worldwide in the subcategory 'graduate companies', i.e. companies founded by alumni, in the internationally-recognized U-Multirank (2021).")
    - Ranking (e.g., "#145 in Europe University Rankings - TopUniversities (2024)")
    - Contact information (phone and email)
    - Address, split into two separate fields: 
      - campusLocation (specific campus address) 
      - globeLocation (city, country)
    - Tuition fees for EU and non-EU students as numbers, with a euro (€) sign before the amount
    - Program information in a single string format, only stating "bachelor" or "master", followed by study format, duration, ECTS, and start date, with "ECTS" in uppercase
    - Detailed description of the program, broken down into exactly 6 array elements:
      - The first element should be general information about the program.
      - The next 4 elements should describe the content of the program for each academic year, but without explicitly mentioning 'Year 1', 'Year 2', etc. Provide an elaborative description of at least 50 words per slide.
      - The final element should describe career prospects for graduates, also with a minimum of 50 words.
    - Enrollment information, split into:
      - Application deadlines for the year 2024 as a **date** only, without the phrase "Application deadline:" before it (for EU and non-EU students)
      - Eligibility criteria (required diplomas, subject prerequisites)
      - Language requirements (CEFR B2 level or IELTS/TOEFL scores for non-EU students)
  
    Please format the response in JSON as follows:
  
    {
      "name": "University Name",
      "short_description": "Brief description of a notable achievement or ranking",
      "ranking": "University ranking",
      "contactInfo": {
        "phone": "University phone number",
        "email": "University email"
      },
      "addressInfo": {
        "campusLocation": "Street address, Postcode",
        "globeLocation": "City, Country"
      },
      "tuitionFee": {
        "eu_students": "€Tuition fee for EU students",
        "non_eu_students": "€Tuition fee for non-EU students"
      },
      "programInfo": "bachelor/masters • study format • duration • ECTS • Start: start date",
      "programDetails": [
        "General information about the program, elaborative and at least 50 words.",
        "Detailed description of the first year of the program, at least 50 words.",
        "Detailed description of the second year of the program, at least 50 words.",
        "Detailed description of the third year of the program, at least 50 words.",
        "Detailed description of the fourth year of the program, at least 50 words.",
        "Career prospects after graduation, including job positions and industry sectors, at least 50 words."
      ],
      "enrollmentDetails": {
        "eu_students": "Day Month Year",
        "non_eu_students": "Day Month Year",
        "eligibility_criteria": "Required diplomas, subject prerequisites, at least 50 words.",
        "language_requirements": "Language requirements (CEFR level, IELTS/TOEFL scores), at least 50 words."
      }
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
        max_tokens: 2000,
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

      setUniversityDetails(dataParsed);
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
        previousOrientationSurveyIndex,
        progress,
        loading,
        userData,
        surveyAnswers,
        studyFieldRecommendations,
        studyProgramRecommendations,
        countryRecommendations,
        cityRecommendations,
        universityRecommendations,
        universityDetails,
        setOrientationSurveyIndex,
        setPreviousOrientationSurveyIndex,
        setProgress,
        setLoading,
        setUserData,
        setSurveyAnswers,
        setStudyFieldRecommendations,
        setStudyProgramRecommendations,
        setCountryRecommendations,
        setCityRecommendations,
        setUniversityRecommendations,
        setUniversityDetails,
        getStudyFieldRecommendations,
        getStudyProgramRecommendations,
        getCityRecommendations,
        getUniversityRecommendations,
        getUniversityDetails,
      }}
    >
      {children}
    </OrientationSurveyContext.Provider>
  );
};
