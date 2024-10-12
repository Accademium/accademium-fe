import React, { useState, useContext } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../components/Tooltip';

export const CountryScreen: React.FC<{}> = () => {
  const { toast } = useToast();
  const {
    orientationSurveyIndex,
    userData,
    progress,
    countryRecommendations,
    setOrientationSurveyIndex,
    setUserData,
    setProgress,
    getCityRecommendations,
  } = useContext(OrientationSurveyContext);

  const [selected, setSelected] = useState<number>(-1);
  const [country, setCountry] = useState<string>('');

  const handlePlayVideo = () => {
    toast({
      title: 'Play Country Video',
      description:
        'The play country video feature is currently under development. Please check back later.',
    });
  };

  const handleSelect = (index: number, country: string) => {
    setSelected(index);
    setCountry(country);
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

    if (userData.countryChoice === country) {
      setProgress(progress + 16);
      setOrientationSurveyIndex(orientationSurveyIndex + 1);
    } else {
      setUserData((prev) => ({
        ...prev,
        countryChoice: country,
      }));
      setProgress(progress + 16);
      setOrientationSurveyIndex(orientationSurveyIndex + 1);
      getCityRecommendations(country);
    }
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center gap-y-10 h-full'>
        {/* Countries Container */}
        <div className='flex flex-row justify-center items-center w-full gap-x-4'>
          {/* Country Selection Container  */}
          <div className='flex flex-col border-2 rounded-2xl '>
            {countryRecommendations.map((country, index) => {
              return (
                <button
                  key={index}
                  className={`border-2 rounded-xl border-gray w-[18rem] h-[60px] flex flex-row justify-between items-center px-4 hover:border-black relative 
                  ${selected === index ? 'border-black' : ''} `}
                  onClick={() => handleSelect(index, country[1])}
                >
                  <div className='flex flex-row items-center gap-x-4'>
                    <img src={country[0]} width={30} height={30} />
                    <h3 className='font-coolvetica font-bold'>{country[1]}</h3>
                  </div>
                  <Tooltip
                    reasonText={country[2]}
                    tooltipStyle='absolute -top-[3.5rem] -right-[3rem]'
                  ></Tooltip>
                </button>
              );
            })}
          </div>

          {/* Country Video Container */}
          <div className='h-full border-2 border-gray w-[28rem] rounded-3xl p-4'>
            <div className='h-full w-full bg-black rounded-3xl flex justify-center items-center'>
              <button onClick={() => handlePlayVideo()}>
                <img
                  src='../../images/circle-play-solid.svg'
                  width={80}
                  height={80}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        <div className='flex flex-row justify-center gap-x-4 w-full'>
          <button
            className='bg-black rounded-2xl w-[10rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
            onClick={() => handlePrevious()}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className='text-white text-sm'
            />
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
            <FontAwesomeIcon
              icon={faArrowRight}
              className='text-white text-sm'
            />
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};
