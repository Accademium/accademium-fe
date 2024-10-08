import React, { useState, useContext } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../components/Tooltip';

const countryData = [
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
];

export const CountryScreen: React.FC<{}> = () => {
  const { toast } = useToast();
  const {
    orientationSurveyIndex,
    progress,
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

    setUserData((prev) => ({
      ...prev,
      countryChoice: country,
    }));
    setProgress(progress + 16);
    setOrientationSurveyIndex(orientationSurveyIndex + 1);
    getCityRecommendations(country);
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center gap-y-10 h-full'>
        {/* Countries Container */}
        <div className='flex flex-row justify-center items-center w-full gap-x-4'>
          {/* Country Selection Container  */}
          <div className='flex flex-col border-2 rounded-2xl '>
            {countryData.map((data, index) => {
              return (
                <button
                  key={index}
                  className={`border-2 rounded-xl border-gray w-[18rem] h-[60px] flex flex-row justify-between items-center px-4 hover:border-black relative 
                  ${selected === index ? 'border-black' : ''} `}
                  onClick={() => handleSelect(index, data[1])}
                >
                  <div className='flex flex-row items-center gap-x-4'>
                    <img src={data[0]} width={30} height={30} />
                    <h3 className='font-coolvetica font-bold'>{data[1]}</h3>
                  </div>
                  <Tooltip
                    reasonText={data[2]}
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
