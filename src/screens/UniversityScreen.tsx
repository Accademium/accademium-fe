import React, { useState, useContext } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../components/Tooltip';
import { Separator } from '@/components/ui/separator';

export const UniversityScreen: React.FC<{}> = () => {
  const { toast } = useToast();
  const {
    orientationSurveyIndex,
    userData,
    progress,
    universityRecommendations,
    setOrientationSurveyIndex,
    setUserData,
    setProgress,
    getUniversityDetails,
  } = useContext(OrientationSurveyContext);

  const [selected, setSelected] = useState<number>(-1);
  const [university, setUniversity] = useState<string>('');

  const handleSelect = (index: number, university: string) => {
    setSelected(index);
    setUniversity(university);
  };

  const handlePrevious = () => {
    setProgress(progress - 16);
    setOrientationSurveyIndex(orientationSurveyIndex - 1);
  };

  const handleNext = () => {
    if (selected === -1) {
      toast({
        description: 'You need to select an answer in order to proceed.',
      });
      return;
    }

    setUserData((prev) => ({
      ...prev,
      universityChoice: university,
    }));
    setProgress(progress + 16);
    setOrientationSurveyIndex(orientationSurveyIndex + 1);
    getUniversityDetails(university, userData.studyProgramChoice);
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center h-full mx-auto'>
        {/* University Container */}
        <div className='flex flex-row justify-center items-center flex-wrap w-full h-full gap-x-10'>
          {universityRecommendations?.map((university, index) => {
            const { university_name, short_description, long_description } =
              university;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index, university_name)}
                className={`flex flex-col justify-between border-2 rounded-2xl border-gray w-[30rem] h-[28rem]
              hover:border-black py-5 px-6 ${
                selected === index ? 'border-black' : ''
              } `}
              >
                {/* University Title + University Logo */}
                <div className='flex flex-col justify-center gap-y-4 h-[14rem]'>
                  <div className='flex flex-row justify-between w-full relative'>
                    <h3 className='font-coolvetica font-bold text-lg text-left leading-none'>
                      {university_name}
                    </h3>
                    <Tooltip
                      reasonText={short_description}
                      tooltipStyle='absolute -top-[3.5rem] -right-[4.5rem]'
                    />
                  </div>

                  <Separator />
                  <img
                    className='border border-gray rounded-3xl'
                    src='https://placehold.co/550x150?&font=Montserrat&text=University+Logo'
                  />
                  <Separator />
                </div>

                {/* University Description */}
                <div className='h-[12rem] p-1'>
                  <p className='font-coolvetica font-normal text-sm'>
                    {long_description}
                  </p>
                </div>
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
