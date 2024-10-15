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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const MenuButton = ({
  icon,
  label,
  isSelected,
  onClick,
}: {
  icon: any;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
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
  const { toast } = useToast();

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [selectedFilterIndex, setSelectedFitlerIndex] = useState<number>(0);

  const {
    userData,
    studyFieldRecommendations,
    studyProgramRecommendations,
    countryRecommendations,
    cityRecommendations,
    universityRecommendations,
    setOrientationSurveyIndex,
    setPreviousOrientationSurveyIndex,
    setProgress,
    setUserData,
    setStudyFieldRecommendations,
    setStudyProgramRecommendations,
    setCityRecommendations,
    setUniversityRecommendations,
    setUniversityDetails,
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

  const getFilterCounts = () => {
    const counts = {
      All: 0,
      Interested: 0,
      Started: 0,
      Approved: 0,
      Completed: 0,
    };

    switch (selectedCategoryIndex) {
      case 0: // Applications Section
        counts.All = userData.applications.length;
        counts.Interested = userData.applications.length;
        break;
      case 2: // Study Fields Section
        counts.All = studyFieldRecommendations.length;
        counts.Interested = userData.applications.length;
        break;
      case 3: // Study Programmes Section
        counts.All = studyProgramRecommendations.length;
        counts.Interested = userData.applications.length;
        break;
      case 4: // Countries Section
        counts.All = countryRecommendations.length;
        counts.Interested = userData.applications.length;
        break;
      case 5: // Cities Section
        counts.All = cityRecommendations.length;
        counts.Interested = userData.applications.length;
        break;
      case 6: // Universities Section
        counts.All = universityRecommendations.length;
        counts.Interested = userData.applications.length;
        break;
      default:
        counts.All = 0;
    }

    return [
      { label: 'All', count: counts.All },
      { label: 'Interested', count: counts.Interested },
      { label: 'Started', count: counts.Started },
      { label: 'Approved', count: counts.Approved },
      { label: 'Completed', count: counts.Completed },
    ];
  };

  const handleSelection = (index: number) => {
    if (index == 1) {
      toast({
        title: 'Recommendations Section',
        description:
          'The recommendations section is currently under development. Please check back later.',
      });
    } else if (index == 7) {
      toast({
        title: 'Settings Section',
        description:
          'The settings section is currently under development. Please check back later.',
      });
    } else {
      setSelectedCategoryIndex(index);
    }
  };

  const handleLearnMore = () => {
    toast({
      title: 'Learn More Button',
      description:
        'The learn more section is currently under development. Please check back later.',
    });
  };

  const handleAdd = () => {
    setProgress(0);
    setOrientationSurveyIndex(1);
    setUserData({
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
      applications: [...userData.applications],
    });
  };

  const handeLogout = () => {
    setOrientationSurveyIndex(0);
    setPreviousOrientationSurveyIndex(0);
    setProgress(0),
      setUserData({
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
        applications: [],
      });
    setOrientationSurveyIndex(0);
    setPreviousOrientationSurveyIndex(0);
    setStudyFieldRecommendations([]);
    setStudyProgramRecommendations([]);
    setCityRecommendations([]);
    setUniversityRecommendations([]);
    setUniversityDetails({
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
    });
    location.href = '/';
  };

  return (
    <>
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
                  onClick={() => handleSelection(index)}
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
                    handleSelection(index + menuItemsSection1.length)
                  }
                />
              ))}
            </div>

            {/* Selection Section 3 */}
            <div className='font-coolvetica font-normal text-lg flex flex-col gap-y-2'>
              <AlertDialog>
                <AlertDialogTrigger>
                  <MenuButton icon={faRightFromBracket} label='Logout' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to proceed?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <AlertDialogDescription>
                        This action cannot be undone. You will be logged out,
                        and any unsaved data or progress will be lost.
                      </AlertDialogDescription>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handeLogout()}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className='border rounded-xl w-[45px] h-[45px] bg-[#488a77] flex justify-center items-center'>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className='text-xl text-white'
                    />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to proceed?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <AlertDialogDescription>
                        You are about to exit the dashboard. This action will
                        start a new application, and any unsaved changes will be
                        lost.
                      </AlertDialogDescription>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleAdd()}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Filters  */}
            <div className='flex flex-row justify-between items-center gap-x-4 mt-4'>
              {/* Filter Container */}
              <div className='flex flex-row items-center gap-x-4'>
                {getFilterCounts().map((filter, index) => {
                  return (
                    <div
                      key={index}
                      className='flex flex-row items-center gap-x-2'
                    >
                      <h4 className='font-coolvetica font-normal'>
                        {filter.label}
                      </h4>
                      <div
                        className={`flex justify-center items-center rounded-md hover:border ${
                          selectedFilterIndex == index
                            ? 'border border-[#488a77] bg-[#d0deda]'
                            : ''
                        } w-[20px] h-[20px]`}
                      >
                        <button
                          onClick={() => setSelectedFitlerIndex(index)}
                          className={`font-coolvetica font-normal w-full ${
                            selectedFilterIndex == index ? 'text-[#488a77]' : ''
                          } text-xs`}
                        >
                          {filter.count}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* View Buttons */}
              <div className='flex flex-row items-center gap-x-2 px-2'>
                <button>
                  <FontAwesomeIcon icon={faList} />
                </button>
                <button className='border rounded-md border-[#488a77] bg-[#d0deda] px-1'>
                  <FontAwesomeIcon
                    icon={faTableCellsLarge}
                    className='text-md'
                  />
                </button>
              </div>
            </div>

            {/* Display Section */}
            <div className='flex flex-row gap-x-6 mt-6 gap-y-6 w-full flex-wrap'>
              {/* APPLICATIONS */}
              {selectedCategoryIndex == 0 && (
                <>
                  {/* Display Card */}
                  {userData.applications.map((application, index) => (
                    <div
                      key={index}
                      className='bg-white rounded-2xl w-[18rem] h-[11.5rem] p-4 flex flex-col justify-between'
                    >
                      {/* Study Program */}
                      <h3 className='font-coolvetica font-bold text-sm'>
                        {application.studyProgramChoice}
                      </h3>

                      {/* University */}
                      <div className='flex flex-col gap-y-0.5 mt-2'>
                        <h4 className='font-coolvetica font-normal text-xs'>
                          {application.universityChoice}
                        </h4>
                        {/* City + Country */}
                        <h4 className='font-coolvetica font-normal text-xs'>
                          {application.cityChoice}, {application.countryChoice}
                        </h4>
                        {/* Program Duration */}
                        <h4 className='font-coolvetica font-normal text-xs'>
                          {application.startDate}
                        </h4>
                      </div>

                      <div className='flex flex-col mt-2 gap-y-2'>
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
                  ))}
                </>
              )}

              {/* STUDY FIELDS */}
              {selectedCategoryIndex == 2 && (
                <>
                  {studyFieldRecommendations.map((study_field, index) => {
                    return (
                      <div
                        key={index}
                        className='bg-white rounded-2xl w-[18rem] h-[11.5rem] px-4 py-3 flex flex-col justify-between'
                      >
                        {/* Study Field */}
                        <h3 className='font-coolvetica font-bold text-sm'>
                          {study_field.study_field}
                        </h3>
                        <p className='font-coolvetica font-normal text-xs'>
                          {study_field.reason}
                        </p>
                        <button
                          onClick={() => handleLearnMore()}
                          className='rounded-lg bg-[#488a77] py-1.5 px-4'
                        >
                          <h4 className='font-coolvetica font-normal text-xs text-white'>
                            Learn More
                          </h4>
                        </button>
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
                          className='bg-white rounded-2xl w-[18rem] h-[11.5rem] px-4 py-3 flex flex-col justify-between'
                        >
                          {/* Study Program */}
                          <h3 className='font-coolvetica font-bold text-sm'>
                            {study_program.study_program}
                          </h3>
                          <p className='font-coolvetica font-normal text-xs'>
                            {study_program.reason}
                          </p>
                          <button
                            onClick={() => handleLearnMore()}
                            className='rounded-lg bg-[#488a77] py-1.5 px-4'
                          >
                            <h4 className='font-coolvetica font-normal text-xs text-white'>
                              Learn More
                            </h4>
                          </button>
                        </div>
                      );
                    })}
                </>
              )}

              {/* COUNTRIES */}
              {selectedCategoryIndex == 4 && (
                <>
                  {countryRecommendations.map((country, index) => {
                    return (
                      <div
                        key={index}
                        className='bg-white rounded-2xl w-[18rem] h-[11.5rem] px-4 py-3 flex flex-col justify-between'
                      >
                        {/* Country */}
                        <div className='flex flex-row items-center gap-x-2'>
                          <img
                            src={country[0]}
                            alt={`${country[1]} Flag`}
                            width={20}
                            height={20}
                          />
                          <h3 className='font-coolvetica font-bold text-sm'>
                            {country[1]}
                          </h3>
                        </div>
                        <p className='font-coolvetica font-normal text-xs'>
                          {country[2]}
                        </p>
                        <button
                          onClick={() => handleLearnMore()}
                          className='rounded-lg bg-[#488a77] py-1.5 px-4'
                        >
                          <h4 className='font-coolvetica font-normal text-xs text-white'>
                            Learn More
                          </h4>
                        </button>
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
                        className='bg-white rounded-2xl w-[18rem] h-[11.5rem] px-4 py-3 flex flex-col justify-between'
                      >
                        {/* City */}
                        <h3 className='font-coolvetica font-bold text-sm'>
                          {city.city_name}
                        </h3>
                        <p className='font-coolvetica font-normal text-xs'>
                          {city.description}
                        </p>
                        <button
                          onClick={() => handleLearnMore()}
                          className='rounded-lg bg-[#488a77] py-1.5 px-4'
                        >
                          <h4 className='font-coolvetica font-normal text-xs text-white'>
                            Learn More
                          </h4>
                        </button>
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
                          className='bg-white rounded-2xl w-[18rem] h-[11.5rem] px-4 py-3 flex flex-col justify-between'
                        >
                          {/* Study Program */}
                          <h3 className='font-coolvetica font-bold text-sm'>
                            {university.university_name}
                          </h3>
                          <p className='font-coolvetica font-normal text-xs'>
                            {university.short_description}
                          </p>
                          <button
                            onClick={() => handleLearnMore()}
                            className='rounded-lg bg-[#488a77] py-1.5 px-4'
                          >
                            <h4 className='font-coolvetica font-normal text-xs text-white'>
                              Learn More
                            </h4>
                          </button>
                        </div>
                      );
                    })}
                </>
              )}

              {/* Nudging Card */}
              {selectedCategoryIndex == 0 && (
                <>
                  <div className='bg-white rounded-2xl w-[18rem] h-[11.5rem] p-4 flex flex-col justify-between items-center'>
                    {/* Nudging Header  */}
                    <h3 className='font-coolvetica font-bold text-sm text-center leading-none'>
                      Most students tend to apply to multiple programms
                    </h3>

                    {/* Nudging Body */}
                    <p className='font-coolvetica font-normal text-[#b7b7b7] text-xs text-center px-4'>
                      Don't limit yourself - diversify your applications to find
                      the best fit for you and share your talent with the world!
                    </p>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button className='rounded-lg bg-[#b7b7b7] py-1.5 px-4'>
                          <h4 className='font-coolvetica font-normal text-xs text-white'>
                            Add another application
                          </h4>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to proceed?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <AlertDialogDescription>
                              You are about to exit the dashboard. This action
                              will start a new application, and any unsaved
                              changes will be lost.
                            </AlertDialogDescription>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleAdd()}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
