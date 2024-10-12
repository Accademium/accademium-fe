import React, { useState, useContext } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../components/Tooltip';

export const StudyProgramScreen: React.FC<{}> = () => {
  const { toast } = useToast();
  const {
    orientationSurveyIndex,
    userData,
    progress,
    studyProgramRecommendations,
    setOrientationSurveyIndex,
    setUserData,
    setProgress,
  } = useContext(OrientationSurveyContext);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [studyProgram, setStudyProgram] = useState<string>('');

  const handleSelect = (index: number, studyProgram: string) => {
    setSelectedIndex(index);
    setStudyProgram(studyProgram);
  };

  const handlePrevious = () => {
    setProgress(progress - 16.667);
    setOrientationSurveyIndex(orientationSurveyIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === -1) {
      toast({
        description: 'You need to select an answer in order to proceed.',
      });
      return;
    }

    if (userData.studyProgramChoice === studyProgram) {
      setProgress(progress + 16.667);
      setOrientationSurveyIndex(orientationSurveyIndex + 1);
    } else {
      setUserData((prev) => ({
        ...prev,
        studyProgramChoice: studyProgram,
      }));
      setProgress(progress + 16.667);
      setOrientationSurveyIndex(orientationSurveyIndex + 1);
    }
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center gap-y-10 h-full'>
        {/* Study Programs Container  */}
        <div className='grid grid-cols-3  gap-x-10 gap-y-12'>
          {studyProgramRecommendations.map((studyProgram, index) => {
            const { study_program, reason, career_prospects } = studyProgram;

            return (
              <button
                key={index}
                className={`border-2 rounded-2xl border-gray w-[18rem] h-[75px] flex flex-row justify-between items-center px-4 hover:border-black relative 
                  ${selectedIndex === index ? 'border-black' : ''} `}
                onClick={() => handleSelect(index, study_program)}
              >
                <h3 className='font-coolvetica font-bold'>{study_program}</h3>
                <Tooltip
                  reasonText={reason}
                  careerProspectsText={career_prospects}
                  tooltipStyle='absolute -top-[5.5rem] -right-[4.5rem]'
                ></Tooltip>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Button */}
      <div className='flex flex-row justify-center gap-x-4 w-full'>
        <button
          className='bg-black rounded-2xl w-[10rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
          onClick={() => handlePrevious()}
        >
          <FontAwesomeIcon icon={faArrowLeft} className='text-white text-sm' />
          <h3 className='font-coolvetica font-normal text-md text-white'>
            Back
          </h3>
        </button>
        <button
          className='bg-black rounded-2xl w-[10rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
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
