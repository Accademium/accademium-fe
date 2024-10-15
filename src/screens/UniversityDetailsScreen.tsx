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

const programDetailsLabels = [
  'About the programme',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Career Prospects',
];

const enrollmentDetailsLabels = [
  'Application and enrollment',
  'Eligibility criteria',
  'Language requirements',
];

export const UniversityDetailsScreen: React.FC = () => {
  const {
    orientationSurveyIndex,
    progress,
    userData,
    universityDetails,
    setOrientationSurveyIndex,
    setPreviousOrientationSurveyIndex,
    setProgress,
    setUserData,
  } = useContext(OrientationSurveyContext);

  const [studyInfoIndex, setStudyInfoIndex] = useState<number>(0);
  const [enrollmentInfoIndex, setEnrollmentInfoIndex] = useState<number>(0);

  const handlePrevious = () => {
    setProgress(progress - 16.667);
    setOrientationSurveyIndex(orientationSurveyIndex - 1);
  };

  const handleNext = () => {
    setUserData((prev) => ({
      ...prev,
      applications: [
        {
          studyProgramChoice: userData.studyProgramChoice,
          universityChoice: userData.universityChoice,
          cityChoice: userData.cityChoice,
          countryChoice: userData.countryChoice,
          startDate: universityDetails.programInfo.split('•').pop()?.trim(),
        },
        ...prev.applications,
      ],
    }));
    setProgress(progress + (100 - progress));
    setPreviousOrientationSurveyIndex(orientationSurveyIndex);
    setOrientationSurveyIndex(orientationSurveyIndex + 1);
  };

  const handlePreviousStudyInfo = () => {
    if (studyInfoIndex > 0) {
      setStudyInfoIndex(studyInfoIndex - 1);
    }
  };

  const handleNextStudyInfo = (studyInfoLength: number) => {
    if (studyInfoIndex < studyInfoLength) {
      setStudyInfoIndex(studyInfoIndex + 1);
    }
  };

  const handlePreviousEnrollmentInfo = () => {
    if (enrollmentInfoIndex > 0) {
      setEnrollmentInfoIndex(enrollmentInfoIndex - 1);
    }
  };

  const handleNextEnrollmentInfo = () => {
    if (enrollmentInfoIndex < 1) {
      setEnrollmentInfoIndex(enrollmentInfoIndex + 1);
    }
  };

  const {
    name,
    short_description,
    ranking,
    contactInfo,
    addressInfo,
    tuitionFee,
    programInfo,
    programDetails,
    enrollmentDetails,
  } = universityDetails;
  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col justify-center items-center h-full mx-auto'>
        {/* Dashboard Container */}
        <div className='border-2 rounded-3xl flex flex-row items-center border-gray h-[28rem] w-[80rem]'>
          {/* University Info Container */}
          <div className='flex flex-col justify-between w-[36rem] h-full px-5 py-4'>
            {/* University Title + University Logo */}
            <div className='flex flex-col gap-y-5 h-[11rem] mt-4'>
              <div className='flex flex-row justify-between w-full relative'>
                <h3 className='font-coolvetica font-bold text-lg text-left leading-none'>
                  {name}
                </h3>
                <Tooltip
                  reasonText={short_description}
                  tooltipStyle='absolute -top-[7.5rem] -right-[0.75rem]'
                />
              </div>

              <Separator />
              <button>
                <img
                  className='border border-gray rounded-3xl hover:border-black'
                  src='https://placehold.co/550x175?&font=Montserrat&text=University+Logo'
                />
              </button>
              <Separator />
            </div>

            {/* University Description */}
            <div className='flex flex-col gap-y-2 w-full p-2'>
              <h4 className='font-coolvetica font-bold text-sm text-left '>
                {ranking}
              </h4>

              {/* University Contact + University Address  */}
              <div className='flex flex-row w-full justify-between'>
                {/* Contact Info Container */}
                <div className='flex flex-col gap-y-0.5 w-full'>
                  <h4 className='font-coolvetica font-bold text-sm'>
                    Contact:
                  </h4>
                  {/* Phone */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faPhone} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      {contactInfo.phone}
                    </p>
                  </div>

                  {/* Email */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faEnvelope} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                {/* Address Info Container */}
                <div className='flex flex-col gap-y-0.5 w-full'>
                  <h4 className='font-coolvetica font-bold text-sm text-left'>
                    Address:
                  </h4>
                  {/* Campus Location */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faLocationDot} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      {addressInfo.campusLocation}
                    </p>
                  </div>

                  {/* Globe Location */}
                  <div className='flex flex-row items-center gap-x-2'>
                    <FontAwesomeIcon icon={faEarthEurope} className='text-sm' />
                    <p className='font-coolvetica font-normal text-sm'>
                      {addressInfo.globeLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* University Tuition Fees */}
              <div className='flex flex-col w-full h-full'>
                <h4 className='font-coolvetica font-bold text-sm text-left leading-none'>
                  Tuition Fee:
                </h4>
                <p className='font-coolvetica font-normal text-sm'>
                  {tuitionFee.eu_students} per year for EU/EEA Students
                </p>
                <p className='font-coolvetica font-normal text-sm'>
                  {tuitionFee.non_eu_students} per year for Non-EU/EEA Students
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
                      {userData.studyProgramChoice}
                    </h4>
                    <h4 className='font-coolvetica font-bold text-md text-left leading-none'>
                      {studyInfoIndex + 1}/{programDetails.length}
                    </h4>
                  </div>
                  <h5 className='font-coolvetica font-bold text-xs'>
                    {programInfo}
                  </h5>
                  <div className='rounded-3xl bg-black h-[1.4rem] w-[10.75rem] flex justify-center items-center'>
                    <h4 className='font-coolvetica font-normal text-white text-xs'>
                      {userData.studyFieldChoice}
                    </h4>
                  </div>
                </div>

                {/* Study Program Details Long */}
                <div className='flex flex-col w-full gap-y-1'>
                  <h4 className='font-coolvetica font-bold text-sm leading-none'>
                    {
                      programDetailsLabels
                        .slice(0, programDetails.length - 1)
                        .concat(programDetailsLabels.slice(-1))[studyInfoIndex]
                    }
                  </h4>
                  <p className='font-coolvetica font-normal text-xs leading-none'>
                    {programDetails[studyInfoIndex]}
                  </p>
                </div>

                {/* Study Program Details Navigation */}
                <div className='flex flex-row justify-between items-center'>
                  {/* Go Back Button */}
                  <button
                    onClick={() => handlePreviousStudyInfo()}
                    disabled={studyInfoIndex == 0 ? true : false}
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className={`text-md ${
                        studyInfoIndex == 0 ? 'text-gray-200' : ''
                      }`}
                    />
                  </button>
                  {/* Go Next Button */}
                  <button
                    onClick={() =>
                      handleNextStudyInfo(programDetails.length - 1)
                    }
                    disabled={
                      studyInfoIndex == programDetails.length - 1 ? true : false
                    }
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`text-md ${
                        studyInfoIndex == programDetails.length - 1
                          ? 'text-gray-200'
                          : ''
                      }`}
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
                    {enrollmentInfoIndex + 1}/2
                  </h4>
                </div>

                {/* Admission & Enrollment Details */}
                <div className='flex flex-col justify-between h-full w-full gap-y-2'>
                  {enrollmentInfoIndex == 0 && (
                    <>
                      {/* Deadlines Container */}
                      <div className='flex flex-col gap-y-1 h-full'>
                        <h4 className='font-coolvetica font-bold text-sm leading-none'>
                          {enrollmentDetailsLabels[0]}
                        </h4>

                        {/* Deadlines */}
                        <div className='flex flex-col gap-y-2'>
                          <p className='font-coolvetica font-normal text-xs leading-none'>
                            The general application deadline:
                          </p>
                          <div>
                            <p className='font-coolvetica font-normal text-xs leading-none'>
                              • for EU students is{' '}
                              {enrollmentDetails.eu_students}
                            </p>
                            <p className='font-coolvetica font-normal text-xs leading-none'>
                              • for non-EU students is{' '}
                              {enrollmentDetails.non_eu_students}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Eligibility Criteria Container */}
                      <div className='flex flex-col gap-y-1 h-full'>
                        <h4 className='font-coolvetica font-bold text-sm leading-none'>
                          {enrollmentDetailsLabels[1]}
                        </h4>
                        <p className='font-coolvetica font-normal text-xs leading-none '>
                          {enrollmentDetails.eligibility_criteria}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Language Requirements Container */}
                  {enrollmentInfoIndex == 1 && (
                    <div className='flex flex-col justify-center gap-y-1 h-full'>
                      <h4 className='font-coolvetica font-bold text-sm leading-none'>
                        {enrollmentDetailsLabels[2]}
                      </h4>
                      <p className='font-coolvetica font-normal text-xs leading-none '>
                        {enrollmentDetails.language_requirements}
                      </p>
                    </div>
                  )}
                </div>

                {/* Admission & Enrollment Details Navigation */}
                <div className='flex flex-row justify-between items-center'>
                  {/* Go Back Button */}
                  <button onClick={() => handlePreviousEnrollmentInfo()}>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className={`text-md ${
                        enrollmentInfoIndex == 0 ? 'text-gray-200' : ''
                      }`}
                    />
                  </button>
                  {/* Go Next Button */}
                  <button onClick={() => handleNextEnrollmentInfo()}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`text-md ${
                        enrollmentInfoIndex == 1 ? 'text-gray-200' : ''
                      }`}
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
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <button
                      key={index}
                      className='w-[15.5rem] h-full rounded-3xl'
                    >
                      <img
                        className='border border-gray rounded-3xl'
                        src={`https://placehold.co/550x350?&font=Montserrat&text=University+Image+${
                          index + 1
                        }`}
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
