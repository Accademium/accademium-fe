import React, { useContext } from 'react';

import { getQuestionsAndAnswers } from '../utils';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ProgressSteps } from "@/components/ui/progressSteps.tsx";

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

import { Loader2 } from 'lucide-react';
import { SurveyScreen } from '@/screens/SurveyScreen';
import { StudyFieldScreen } from '@/screens/StudyFieldScreen';
import { StudyProgramScreen } from '@/screens/StudyProgramScreen';
import { CountryScreen } from '@/screens/CountryScreen';
import { CityScreen } from '@/screens/CityScreen';
import { UniversityScreen } from '@/screens/UniversityScreen';
import { UniversityDetailsScreen } from '@/screens/UniversityDetailsScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';

const screenTitles = new Map<number, string>([
  [1, 'The study fields that align the best with your interest and strengths'],
  [
    2,
    'The study programmes that are the best fit for you within the chosen field',
  ],
  [3, 'The countires that offer the selected study programme'],
  [4, 'The cities within the selected country that offer the study programme'],
  [
    5,
    'The universities within the selected city that offer the study programme',
  ],
  [6, 'The selected university that offers the study programme'],
]);

const OrientationSurveyPage: React.FC = () => {
  const { toast } = useToast();

  const {
    orientationSurveyIndex,
    previousOrientationSurveyIndex,
    progress,
    loading,
    level,
    currentXp,
    studyFieldRecommendations,
    setSurveyAnswers,
    setStudyFieldRecommendations,
    setOrientationSurveyIndex,
    setPreviousOrientationSurveyIndex,
    calculateMaxXpForLevel,
  } = useContext(OrientationSurveyContext);

  const handleDashboard = () => {
    if (orientationSurveyIndex === 7) {
      setOrientationSurveyIndex(previousOrientationSurveyIndex);
    } else {
      setPreviousOrientationSurveyIndex(orientationSurveyIndex);
      setOrientationSurveyIndex(7);
    }
  };

  const handleRetry = () => {
    setSurveyAnswers({
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
    });
    setStudyFieldRecommendations([]);
    setOrientationSurveyIndex(0);
  };

  const handleChatbot = () => {
    toast({
      title: 'AI Chatbot Button',
      description:
        'The AI chatbot is currently under development. Please check back later.',
    });
  };

  const steps = [
    { stepNumber: 1, label: 'Study Field', xp: 100 },
    { stepNumber: 2, label: 'Study Program', xp: 200 },
    { stepNumber: 3, label: 'Country', xp: 300 },
    { stepNumber: 4, label: 'City', xp: 400 },
    { stepNumber: 5, label: 'University', xp: 500 },
    { stepNumber: 6, label: 'University Details', xp: 1000 },
  ]

  const getStatusForStep = (stepNumber: number, level: number) => {
    if (stepNumber < level) {
      return 'Completed';
    } else if (stepNumber == level) {
      return 'In progress';
    } else {
      return 'Pending';
    }
  }

  return (
    <>
      <div className='flex flex-col w-screen h-screen'>
        <header className='w-full h-[10rem] flex flex-col justify-between items-center py-12 flex-shrink-0'>
          <div className='flex flex-row items-center justify-between px-14 w-full'>
            <img
              className='lg:self-start'
              src='../../images/Accademium_Logo.png'
              width={160}
              height={24}
            />
            {/* Gamification Bar */}
            {orientationSurveyIndex !== 0 && orientationSurveyIndex !== 7 && (
              <div className='flex flex-row justify-center items-center gap-x-6 w-[48rem] h-full'>
                <h3 className='font-coolvetica uppercase font-normal text-nowrap'>
                  Level {level}
                </h3>
                <Progress
                  className='w-[28rem]'
                  color='bg-[#488a77]'
                  value={currentXp}
                  max={calculateMaxXpForLevel(level)}
                />
                <h3 className='font-coolvetica font-light'>
                  {currentXp}
                  <span className='text-gray-400'>
                    {' '}
                    / {calculateMaxXpForLevel(level)} XP
                  </span>
                </h3>
              </div>
            )}
          </div>
          <Separator className='w-[95%]' />
        </header>

        <main className='w-full h-full flex flex-col gap-y-2'>
          {/* Side Progress Bar */}
          {orientationSurveyIndex !== 0 && !loading && (
            <div className={`${orientationSurveyIndex === 7 ? 'w-full flex justify-center' : 'absolute left-4 max-lg:hidden'}`}>
              <div className={`space-y-4 ${orientationSurveyIndex === 7 ? 'flex items-baseline' : ''}`}>
                {steps.map((step) => (
                    <ProgressSteps
                      key={step.stepNumber}
                      stepNumber={step.stepNumber}
                      label={step.label}
                      xp={step.xp}
                      status={getStatusForStep(step.stepNumber, level)}
                      direction={orientationSurveyIndex === 7 ? 'horizontal' : 'vertical'}
                    />
                ))}
              </div>
            </div>
          )}
          {/* Progress Bar + Dashboard Button  */}
          {orientationSurveyIndex != 0 && !loading && (
            <div className='flex lg:flex-row flex-col-reverse justify-center items-center w-full h-[2.5rem]'>
              {orientationSurveyIndex == 0 && (
                <Progress
                  value={progress}
                  className='lg:w-[44rem] w-[22rem] h-[24px]'
                />
              )}

              {/* Dashboard Button */}
              <div className='flex gap-x-2 absolute lg:right-[4rem]'>
                <button onClick={() => handleDashboard()}>
                  <img
                    src={`${
                      orientationSurveyIndex !== 7
                        ? '../../images/dashboard_icon.png'
                        : '../../images/return_icon.png'
                    }`}
                    width={35}
                    height={35}
                  ></img>
                </button>

                {/* Retry Button */}
                {orientationSurveyIndex == 1 && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <img
                          src='../../images/retry-icon.png'
                          width={35}
                          height={35}
                        ></img>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to proceed?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will restart the
                            survey and delete all your current answers along
                            with the current recommendations.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRetry()}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Screen Title */}
          {orientationSurveyIndex !== 0 &&
            orientationSurveyIndex !== 7 &&
            !loading && (
              <div className='w-[48rem] h-[7rem] mx-auto flex flex-row justify-center items-center mt-4'>
                <h1 className='font-coolvetica font-bold text-4xl text-center'>
                  {screenTitles.get(orientationSurveyIndex)}
                </h1>
              </div>
            )}

          {/* Loading Spinner */}
          {loading && (
            <div className='flex justify-center items-center h-full w-full'>
              <Loader2 className='w-24 h-24 animate-spin' />
            </div>
          )}

          {/* Survey Screen */}
          {orientationSurveyIndex == 0 && !loading && (
            <SurveyScreen questionsAndAnswers={getQuestionsAndAnswers()} />
          )}

          {/* Study Field Screen */}
          {orientationSurveyIndex == 1 &&
            !loading &&
            studyFieldRecommendations && (
              <>
                <StudyFieldScreen />
              </>
            )}

          {/* Study Programmes Screen */}
          {orientationSurveyIndex == 2 && !loading && (
            <>
              <StudyProgramScreen />
            </>
          )}

          {/* Country Screen */}
          {orientationSurveyIndex == 3 && !loading && (
            <>
              <CountryScreen />
            </>
          )}

          {/* City Screen */}
          {orientationSurveyIndex == 4 && !loading && (
            <>
              <CityScreen />
            </>
          )}

          {/* University Screen */}
          {orientationSurveyIndex == 5 && !loading && (
            <>
              <UniversityScreen />
            </>
          )}

          {/* University Details Screen */}
          {orientationSurveyIndex == 6 && !loading && (
            <>
              <UniversityDetailsScreen />
            </>
          )}

          {/* Dashboard Screen */}
          {orientationSurveyIndex == 7 && !loading && (
            <>
              <DashboardScreen />
            </>
          )}
        </main>

        <footer className='flex flex-col justify-center items-center w-full h-[5rem] flex-shrink-0'>
          <Separator className='w-[95%]' />
          {orientationSurveyIndex !== 0 && (
            <div className='absolute lg:right-[4rem] bottom-[5.25rem]'>
              <button onClick={() => handleChatbot()}>
                <img
                  src={'../../images/ai_chatbot_icon.png'}
                  width={35}
                  height={35}
                ></img>
              </button>
            </div>
          )}
        </footer>
      </div>
      <Toaster />
    </>
  );
};

export default OrientationSurveyPage;
