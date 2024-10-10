import React, { useState, useContext } from 'react';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../components/Tooltip';
import { Separator } from '@/components/ui/separator';

export const UniversityDetailsScreen: React.FC = () => {
  const {
    orientationSurveyIndex,
    progress,
    userData,
    setOrientationSurveyIndex,
    setProgress,
  } = useContext(OrientationSurveyContext);

  const [studyInfoIndex, setStudyInfoIndex] = useState<number>(0);
  const [enrollmentInfoIndex, setEnrollmentInfoIndex] = useState<number>(0);

  const handlePrevious = () => {
    setProgress(progress - 16);
    setOrientationSurveyIndex(orientationSurveyIndex - 1);
  };

  const handleNext = () => {
    setProgress(progress + 16);
    setOrientationSurveyIndex(orientationSurveyIndex + 1);
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center h-full mx-auto'>
        {/* University Details Container */}
        <div className='border-2 rounded-3xl flex flex-row items-center border-gray h-[28rem] w-[80rem]'>
          {/* University Info Container */}
          <div className='flex flex-col justify-between w-[30rem] h-full px-5 py-4'>
            {/* University Title + University Logo */}
            <div className='flex flex-col gap-y-4 h-[11rem] mt-4'>
              <div className='flex flex-row justify-between w-full relative'>
                <h3 className='font-coolvetica font-bold text-lg text-left leading-none'>
                  {userData.universityChoice}
                </h3>
                <Tooltip
                  reasonText='test'
                  tooltipStyle='absolute -top-[3.5rem] -right-[0.75rem]'
                />
              </div>

              <Separator />
              <button>
                <img
                  className='border border-gray rounded-3xl hover:border-black'
                  src='https://placehold.co/550x180?&font=Montserrat&text=University+Logo'
                />
              </button>
              <Separator />
            </div>

            {/* University Description */}
            <div className='flex flex-col h-[12.5rem] gap-y-4 w-full'>
              <h4 className='font-coolvetica font-bold text-sm text-left '>
                #145 in Europe University Rankings - TopUniversities (2024)
              </h4>

              {/* University Contact + University Address  */}
              <div className='flex flex-row w-full justify-between'>
                {/* Contact Info Container */}
                <div className='flex flex-col gap-y-0.5'>
                  <h4 className='font-coolvetica font-bold text-sm'>
                    Contact:
                  </h4>
                  {/* Phone */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faPhone} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      +31 50 595 55 55
                    </p>
                  </div>

                  {/* Email */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faEnvelope} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      info@org.hanze.nl
                    </p>
                  </div>
                </div>

                {/* Address Info Container */}
                <div className='flex flex-col gap-y-0.5'>
                  <h4 className='font-coolvetica font-bold text-sm text-left'>
                    Address:
                  </h4>
                  {/* Campus Location */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faLocationDot} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      Zernikeplein 7, 9747 AS
                    </p>
                  </div>

                  {/* Globe Location */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faEarthEurope} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      Groningen, Netherlands
                    </p>
                  </div>
                </div>
              </div>

              {/* University Tuition Fees */}
              <div className='flex flex-col w-full'>
                <h4 className='font-coolvetica font-bold text-sm text-left'>
                  Tuition Fee:
                </h4>
                <p className='font-coolvetica font-normal text-sm'>
                  €2,314.00 per year for EU/EEA Students
                </p>
                <p className='font-coolvetica font-normal text-sm'>
                  €8,276.00 per year for Non-EU/EEA Students
                </p>
              </div>
            </div>
          </div>
          <Separator orientation='vertical' className='h-[90%]' />

          {/* Study Program Info Wrapper */}
          <div className='flex flex-col items-center w-full h-full'>
            {/* Study Program + Admission & Enrollment Wrapper */}
            <div className='flex flex-row items-center w-full'>
              {/* Study Program Info Container */}
              <div className='flex flex-col justify-between h-[14rem] w-full py-4 px-6 mt-2'>
                {/* Study Program Title + Study Program Details Short + Study Field */}
                <div className='flex flex-col gap-y-1'>
                  <div className='flex flex-row justify-between'>
                    <h4 className='font-coolvetica font-bold text-md text-left leading-none'>
                      Sensor Technology
                    </h4>
                    <h4 className='font-coolvetica font-bold text-md text-left leading-none'>
                      1/6
                    </h4>
                  </div>
                  <h5 className='font-coolvetica font-bold text-xs'>
                    bachelor • full-time • 4 years • 240 ECTS • Start: September
                  </h5>
                  <div className='rounded-3xl bg-black h-[1.4rem] w-[10.75rem] flex justify-center items-center'>
                    <h4 className='font-coolvetica font-normal text-white text-xs'>
                      Language & Communication
                    </h4>
                  </div>
                </div>

                {/* Study Program Details Long */}
                <div className='flex flex-col w-full gap-y-1'>
                  <h4 className='font-coolvetica font-bold text-sm leading-none'>
                    About this programme
                  </h4>
                  <p className='font-coolvetica font-normal text-xs leading-none'>
                    During your studies you will leam all about the use of
                    existing (smart) sensors and their various applications. You
                    will discover how to make the world better, smarter and
                    safer with sensors. Just think of the important role they
                    play in healthcare, high-tech systems or energy. You will
                    develop into a well-educated, highly sought-after
                    professional with a large amount of technical expertise and
                    a thorough knowledge of ICT and electronics.
                  </p>
                </div>

                {/* Study Program Details Navigation */}
                <div className='flex flex-row justify-between items-center'>
                  {/* Go Back Button */}
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className='text-md text-gray-200'
                    />
                  </button>
                  {/* Go Next Button */}
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className='text-md'
                    />
                  </button>
                </div>
              </div>
              <Separator orientation='vertical' className='h-[90%]' />

              {/* Admission & Enrollment Container */}
              <div className='flex flex-col justify-between h-[14rem] w-full py-4 px-6 mt-2 gap-y-1'>
                {/* Admission & Enrollment Title + Page Number */}
                <div className='flex flex-row justify-between'>
                  <h4 className='font-coolvetica font-bold text-md text-left leading-none'>
                    Admission & Enrollment
                  </h4>
                  <h4 className='font-coolvetica font-bold text-md text-left leading-none'>
                    1/2
                  </h4>
                </div>

                {/* Admission & Enrollment Details */}
                <div className='flex flex-col justify-between h-full w-full gap-y-2'>
                  {/* Deadlines Container */}
                  <div className='flex flex-col gap-y-1 h-full'>
                    <h4 className='font-coolvetica font-bold text-sm leading-none'>
                      Application and enrollment
                    </h4>

                    {/* Deadlines */}
                    <div className='flex flex-col gap-y-2'>
                      <p className='font-coolvetica font-normal text-xs leading-none'>
                        The general application deadline:
                      </p>
                      <div>
                        <p className='font-coolvetica font-normal text-xs leading-none'>
                          • for EU students is 15 August
                        </p>
                        <p className='font-coolvetica font-normal text-xs leading-none'>
                          • for non-EU students is 1 June
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Entry Requirements Container */}
                  <div className='flex flex-col gap-y-1 h-full'>
                    <h4 className='font-coolvetica font-bold text-sm leading-none'>
                      Entry requirements
                    </h4>
                    <p className='font-coolvetica font-normal text-xs leading-none '>
                      You are eligible for the programme if you have a diploma
                      comparable to the Dutch HAVO level (for UK: 4 GCSEs, A*- C
                      grade, plus 2 AS levels), or higher. Your qualifications
                      at this level must include mathematics and physics and
                      preferably chemisbry and/or biology.
                    </p>
                  </div>
                </div>

                {/* Admission & Enrollment Details Navigation */}
                <div className='flex flex-row justify-between items-center'>
                  {/* Go Back Button */}
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className='text-md text-gray-200'
                    />
                  </button>
                  {/* Go Next Button */}
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className='text-md'
                    />
                  </button>
                </div>
              </div>
            </div>
            <Separator className='w-[95%]' />
            {/* University Images Container */}
            <div className='h-[14rem] w-full flex flex-row items-center p-6'>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} className='text-lg' />
              </button>
              {/* Images Container */}
              <div className='flex flex-row justify-center gap-x-4 w-full h-full'>
                {Array.from({ length: 3 }).map((img, index) => {
                  return (
                    <button className='w-[16rem] h-full rounded-3xl'>
                      <img
                        className='border border-gray rounded-3xl'
                        src='https://placehold.co/550x350?&font=Montserrat&text=University+Image'
                      />
                    </button>
                  );
                })}
              </div>
              <button>
                <FontAwesomeIcon icon={faChevronRight} className='text-lg' />
              </button>
            </div>
          </div>
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
            Apply
          </h3>
          <FontAwesomeIcon icon={faArrowRight} className='text-white text-sm' />
        </button>
      </div>
    </>
  );
};
