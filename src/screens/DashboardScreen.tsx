import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,
  faThumbsUp,
  faBrain,
  faChalkboardTeacher,
  faGlobeEurope,
  faBuildingColumns,
  faGraduationCap,
  faSliders,
  faRightFromBracket,
  faPlus,
  faList,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

const MenuButton = ({
  icon,
  label,
  isSelected,
  onClick,
}: {
  icon: any;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-row items-center rounded-2xl gap-x-3 w-full h-[3rem] pl-4 ${
      isSelected ? 'bg-black' : ''
    }`}
  >
    <FontAwesomeIcon
      icon={icon}
      className={`text-lg ${isSelected ? 'text-white' : ''}`}
    />
    <h3 className={`${isSelected ? 'text-white' : ''}`}>{label}</h3>
  </button>
);

export const DashboardScreen: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [selectedFilterIndex, setSelectedFitlerIndex] = useState<number>(0);

  // @ts-ignore
  const {
    userData,
    studyFieldRecommendations,
    studyProgramRecommendations,
    countryRecommendations,
    cityRecommendations,
    universityRecommendations,
  } = useContext(OrientationSurveyContext);

  const menuItemsSection1 = [
    { icon: faFile, label: 'Applications' },
    { icon: faThumbsUp, label: 'Recommendations' },
  ];

  const menuItemsSection2 = [
    { icon: faBrain, label: 'Study Fields' },
    { icon: faChalkboardTeacher, label: 'Study Programmes' },
    { icon: faGlobeEurope, label: 'Countries' },
    { icon: faBuildingColumns, label: 'Cities' },
    { icon: faGraduationCap, label: 'Universities' },
    { icon: faSliders, label: 'Settings' },
  ];

  const menuItemsLabelsAndDescriptions = [
    {
      label: 'Applications',
      description:
        'View and manage all the applications you have started or submitted.',
    },
    {
      label: 'Recommendations',
      description:
        'Get personalized study and program suggestions based on your preferences.',
    },
    {
      label: 'Study Fields',
      description:
        'Explore different fields of study that align with your academic interests.',
    },
    {
      label: 'Study Programmes',
      description: 'Browse available study programmes in your chosen fields.',
    },
    {
      label: 'Countries',
      description:
        'Discover countries offering educational opportunities in your areas of interest.',
    },
    {
      label: 'Cities',
      description:
        'Find cities where recommended universities and programmes are located.',
    },
    {
      label: 'Universities',
      description:
        'Learn more about universities that offer your selected programmes.',
    },
    {
      label: 'Settings',
      description: 'Update your profile, preferences, and account settings.',
    },
    {
      label: 'Logout',
      description: 'Sign out of your account safely.',
    },
  ];

  const filterLabels = [
    { label: 'All', count: 1 },
    { label: 'Interested', count: 1 },
    { label: 'Started', count: 0 },
    { label: 'Approved', count: 0 },
    { label: 'Completed', count: 0 },
  ];

  return (
    <div className='flex flex-col justify-center items-center h-full mx-auto'>
      {/* Dashboard Container */}
      <div className='rounded-3xl flex flex-row items-center bg-secondary h-[36rem] w-[80rem]'>
        {/* Selection Container */}
        <div className='border rounded-3xl w-[18rem] h-full bg-white flex flex-col justify-between p-6'>
          {/* Selection Section 1 */}
          <div className='font-coolvetica font-normal text-lg flex flex-col gap-y-2'>
            {menuItemsSection1.map((item, index) => (
              <MenuButton
                key={index}
                icon={item.icon}
                label={item.label}
                isSelected={selectedCategoryIndex === index}
                onClick={() => setSelectedCategoryIndex(index)}
              />
            ))}
          </div>

          {/* Selection Section 2 */}
          <div className='font-coolvetica font-normal text-lg flex flex-col gap-y-2'>
            {menuItemsSection2.map((item, index) => (
              <MenuButton
                key={index + menuItemsSection1.length}
                icon={item.icon}
                label={item.label}
                isSelected={
                  selectedCategoryIndex === index + menuItemsSection1.length
                }
                onClick={() =>
                  setSelectedCategoryIndex(index + menuItemsSection1.length)
                }
              />
            ))}
          </div>

          {/* Selection Section 3 */}
          <div className='font-coolvetica font-normal text-lg flex flex-col gap-y-2'>
            <MenuButton
              icon={faRightFromBracket}
              label='Logout'
              isSelected={selectedCategoryIndex === 8}
              onClick={() => setSelectedCategoryIndex(8)}
            />
          </div>
        </div>

        {/* Display Section */}
        <div className='h-full py-8 px-10 w-[62rem]'>
          {/* Header  */}
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col gap-y-2'>
              {/* Heading */}
              <h2 className='font-coolvetica font-bold text-2xl'>
                {menuItemsLabelsAndDescriptions[selectedCategoryIndex].label}
              </h2>
              {/* Subheading */}
              <h4 className='font-coolvetica font-normal text-sm'>
                {
                  menuItemsLabelsAndDescriptions[selectedCategoryIndex]
                    .description
                }
              </h4>
            </div>

            {/* Add Button */}
            <button className='border rounded-xl w-[45px] h-[45px] bg-[#488a77] flex justify-center items-center'>
              <FontAwesomeIcon icon={faPlus} className='text-xl text-white' />
            </button>
          </div>

          {/* Filters  */}
          <div className='flex flex-row justify-between items-center gap-x-4 mt-4'>
            {/* Filter Container */}
            <div className='flex flex-row items-center gap-x-4'>
              {filterLabels.map((filter, index) => {
                return (
                  <button
                    onClick={() => setSelectedFitlerIndex(index)}
                    key={index}
                    className='flex flex-row items-center gap-x-2'
                  >
                    <h4 className='font-coolvetica font-normal'>
                      {filter.label}
                    </h4>
                    <div
                      className={`flex justify-center items-center rounded-md ${
                        selectedFilterIndex == index
                          ? 'border border-[#488a77] bg-[#d0deda]'
                          : ''
                      } w-[20px] h-[20px]`}
                    >
                      <p
                        className={`font-coolvetica font-normal ${
                          selectedFilterIndex == index ? 'text-[#488a77]' : ''
                        } text-xs`}
                      >
                        {filter.count}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* View Buttons */}
            <div className='flex flex-row items-center gap-x-4 px-2'>
              <button>
                <FontAwesomeIcon icon={faList} />
              </button>
              <button className='border rounded-md border-[#488a77] bg-[#d0deda] px-1'>
                <FontAwesomeIcon icon={faTableCellsLarge} className='text-md' />
              </button>
            </div>
          </div>

          {/* Display Section */}
          <div className='flex flex-row gap-x-6 mt-6 gap-y-6 w-full flex-wrap'>
            {/* APPLICATIONS */}
            {selectedCategoryIndex == 0 && (
              <>
                {/* Display Card */}
                <div className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4'>
                  {/* Study Program */}
                  <h3 className='font-coolvetica font-bold text-sm'>
                    {userData.studyProgramChoice}
                  </h3>

                  {/* University */}
                  <div className='flex flex-col gap-y-0.5 mt-2'>
                    <h4 className='font-coolvetica font-normal text-xs'>
                      {userData.universityChoice}
                    </h4>
                    {/* City + Country */}
                    <h4 className='font-coolvetica font-normal text-xs'>
                      {userData.cityChoice}, {userData.countryChoice}
                    </h4>
                    {/* Program Duration */}
                    <h4 className='font-coolvetica font-normal text-xs'>
                      September 2024 - July 2025
                    </h4>
                  </div>

                  <div className='flex flex-col mt-2 gap-y-1'>
                    <h4 className='font-coolvetica font-bold text-xs '>
                      Status: Interested / Not Applied
                    </h4>

                    <div className='flex flex-row items-center gap-x-2'>
                      <button className='rounded-lg bg-[#b7b7b7] py-1.5 px-4'>
                        <h4 className='font-coolvetica font-normal text-xs text-white'>
                          Show Details
                        </h4>
                      </button>

                      <button className='rounded-lg bg-[#488a77] py-1.5 px-4'>
                        <h4 className='font-coolvetica font-normal text-xs text-white'>
                          Start Application
                        </h4>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STUDY FIELDS */}
            {selectedCategoryIndex == 2 && (
              <>
                {studyFieldRecommendations.map((study_field, index) => {
                  return (
                    <div
                      key={index}
                      className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4'
                    >
                      {/* Study Program */}
                      <h3 className='font-coolvetica font-bold text-sm'>
                        {study_field.study_field}
                      </h3>
                    </div>
                  );
                })}
              </>
            )}

            {/* STUDY PROGRAMMES */}
            {selectedCategoryIndex == 3 && (
              <>
                {studyProgramRecommendations
                  .slice(0, 6)
                  .map((study_program, index) => {
                    return (
                      <div
                        key={index}
                        className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4'
                      >
                        {/* Study Program */}
                        <h3 className='font-coolvetica font-bold text-sm'>
                          {study_program.study_program}
                        </h3>
                      </div>
                    );
                  })}
              </>
            )}

            {/* CITIES */}
            {selectedCategoryIndex == 4 && (
              <>
                {countryRecommendations.map((country, index) => {
                  return (
                    <div
                      key={index}
                      className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4'
                    >
                      {/* Study Program */}
                      <h3 className='font-coolvetica font-bold text-sm'>
                        {country[1]}
                      </h3>
                    </div>
                  );
                })}
              </>
            )}

            {/* CITIES */}
            {selectedCategoryIndex == 5 && (
              <>
                {cityRecommendations.map((city, index) => {
                  return (
                    <div
                      key={index}
                      className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4'
                    >
                      {/* Study Program */}
                      <h3 className='font-coolvetica font-bold text-sm'>
                        {city.city_name}
                      </h3>
                    </div>
                  );
                })}
              </>
            )}

            {/* UNIVERSITIES */}
            {selectedCategoryIndex == 6 && (
              <>
                {universityRecommendations
                  .slice(0, 6)
                  .map((university, index) => {
                    return (
                      <div
                        key={index}
                        className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4'
                      >
                        {/* Study Program */}
                        <h3 className='font-coolvetica font-bold text-sm'>
                          {university.university_name}
                        </h3>
                      </div>
                    );
                  })}
              </>
            )}

            {/* Nudging Card */}
            {selectedCategoryIndex == 0 && (
              <>
                <div className='bg-white rounded-2xl w-[16rem] h-[10.5rem] p-4 flex flex-col justify-between items-center'>
                  {/* Nudging Header  */}
                  <h3 className='font-coolvetica font-bold text-sm text-center leading-none'>
                    Most students tend to apply to multiple programms
                  </h3>

                  {/* Nudging Body */}
                  <p className='font-coolvetica font-normal text-[#b7b7b7] text-xs text-center px-4'>
                    Don't limit yourself - diversify your applications to find
                    the best fit for you and share your talent with the world!
                  </p>

                  <button className='rounded-lg bg-[#b7b7b7] py-1.5 px-4'>
                    <h4 className='font-coolvetica font-normal text-xs text-white'>
                      Add another study programme
                    </h4>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
