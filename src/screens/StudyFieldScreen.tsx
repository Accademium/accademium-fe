import React, { useState, useEffect, useContext } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import Tooltip from '../components/Tooltip';

const studyFieldToImage = new Map<string, string>([
  ['Language and Communication', '../../images/language-and-communication.png'],
  ['Behaviour and Society', '../../images/behaviour-and-society.png'],
  ['Business and Economics', '../../images/business-and-economics.png'],
  [
    'Exact and Information Sciences',
    '../../images/exact-and-information-sciences.png',
  ],
  ['Sports and Health', '../../images/sports-and-health.png'],
  ['Science and Engineering', '../../images/science-and-engineering.png'],
  ['Arts and Culture', '../../images/arts-and-culture.png'],
]);

export const StudyFieldScreen: React.FC = () => {
  const { toast } = useToast();
  const {
    orientationSurveyIndex,
    userData,
    surveyAnswers,
    studyFieldRecommendations,
    setOrientationSurveyIndex,
    setUserData,
    setProgress,
    getStudyProgramRecommendations,
  } = useContext(OrientationSurveyContext);

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      surveyResponses: surveyAnswers,
    }));
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [studyField, setStudyField] = useState<string>('');

  const handleSelect = (index: number, studyField: string) => {
    setSelectedIndex(index);
    setStudyField(studyField);
  };

  const handleNext = () => {
    if (selectedIndex === -1) {
      toast({
        description: 'You need to select an answer in order to proceed.',
      });
      return;
    }

    if (userData.studyFieldChoice === studyField) {
      setProgress(16.667);
      setOrientationSurveyIndex(orientationSurveyIndex + 1);
    } else {
      setUserData((prev) => ({
        ...prev,
        studyFieldChoice: studyField,
      }));
      setProgress(16.667);
      setOrientationSurveyIndex(orientationSurveyIndex + 1);
      getStudyProgramRecommendations(studyField, surveyAnswers);
    }
  };

  const getImage = (study_field: string) => {
    return studyFieldToImage.get(study_field);
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center w-full h-full items-center gap-y-10'>
        {/* Recommendations Container */}
        <div className='flex lg:flex-row flex-col gap-x-8'>
          {studyFieldRecommendations.map((studyField, index) => {
            const { study_field, reason } = studyField;

            return (
              <div
                key={index}
                className='flex flex-col justify-center items-center'
              >
                <button
                  className={`border-2 rounded-xl w-[13.5rem] lg:h-[16rem] h-[8rem] hover:border-black ${
                    selectedIndex === index ? 'border-black' : ''
                  } flex flex-col justify-center items-center relative`}
                  onClick={() => handleSelect(index, study_field)}
                >
                  <Tooltip
                    reasonText={reason}
                    containerStyle='absolute top-3 right-3'
                    tooltipStyle='absolute -top-[7.5rem] -right-[6rem]'
                  />
                  <img
                    src={getImage(study_field)}
                    width={150}
                    height={150}
                  ></img>
                </button>
                <h3 className='font-coolvetica font-bold lg:text-lg text-md'>
                  {study_field}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Button */}
      <div className='flex flex-row justify-center w-full'>
        <button
          className='bg-black rounded-2xl w-[22rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
          onClick={() => handleNext()}
        >
          <h3 className='font-coolvetica font-normal text-md text-white'>
            Next
          </h3>
          <FontAwesomeIcon icon={faArrowRight} className='text-white text-sm' />
        </button>
      </div>
      <Toaster />
    </>
  );
};
