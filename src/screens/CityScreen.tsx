import React, { useState, useContext } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../components/Tooltip';
import { Separator } from '@/components/ui/separator';

const cityCriteria = [
  'Housing availability',
  'Nightlife',
  'Societal inclusion',
  'Work opportunities',
  'Safety',
];

export const CityScreen: React.FC<{}> = () => {
  const { toast } = useToast();
  const {
    orientationSurveyIndex,
    progress,
    cityRecommendations,
    setOrientationSurveyIndex,
    setUserData,
    setProgress,
  } = useContext(OrientationSurveyContext);

  const [selected, setSelected] = useState<number>(-1);
  const [city, setCity] = useState<string>('');

  const handleSelect = (index: number, city: string) => {
    setSelected(index);
    setCity(city);
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
      cityChoice: city,
    }));
    setProgress(progress + 16);
    setOrientationSurveyIndex(orientationSurveyIndex + 1);
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center h-full mx-64'>
        {/* City Container */}
        <div className='flex flex-row justify-center items-center flex-wrap w-full h-full gap-x-12'>
          {cityRecommendations?.map((city, index) => {
            const { city_name, description, ratings } = city;
            return (
              <button
                onClick={() => handleSelect(index, city_name)}
                key={index}
                className={`border-2 rounded-3xl w-[20rem] h-[13.5rem] hover:border-black py-5 px-6 ${
                  selected === index ? 'border-black' : ''
                } `}
              >
                <div className='flex flex-row justify-between relative'>
                  <h3 className='font-coolvetica font-bold text-lg'>
                    {city_name}
                  </h3>
                  <Tooltip
                    reasonText={description}
                    tooltipStyle='absolute -top-[3.5rem] -right-[4.5rem]'
                  />
                </div>

                <Separator className='my-2' />

                {/* City Data Container */}
                <div className='flex flex-row justify-between items-center w-full h-[8rem]'>
                  {/* City Criteria Container */}
                  <div className='flex flex-col justify-between items-start h-full'>
                    {cityCriteria.map((criteria, index) => {
                      return (
                        <p
                          key={index}
                          className='font-coolvetica font-normal leading-none'
                        >
                          {criteria}
                        </p>
                      );
                    })}
                  </div>

                  {/* City Rating Container */}
                  <div className='flex flex-col justify-between h-full'>
                    {/* City Rating Row */}
                    {Array.from({ length: cityCriteria.length }).map(
                      (row, rowIndex) => {
                        const cityRatings = Object.values(ratings);
                        const hasHalfStar = cityRatings[rowIndex] % 1 !== 0;

                        return (
                          <div key={rowIndex} className='flex flex-row gap-x-1'>
                            {/* Render full stars */}
                            {Array.from({
                              length: Math.floor(cityRatings[rowIndex]),
                            }).map((column, columnIndex) => (
                              <img
                                key={columnIndex}
                                src='../../images/star_icon.png'
                                width={16}
                                height={16}
                              />
                            ))}

                            {/* Render half star if applicable */}
                            {hasHalfStar && (
                              <img
                                src='../../images/half_star_icon.png'
                                width={8}
                                height={16}
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
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
