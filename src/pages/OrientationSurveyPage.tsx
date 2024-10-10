import React, { useContext } from 'react';

import { getQuestionsAndAnswers } from '../utils';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
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
    progress,
    loading,
    studyFieldRecommendations,
    setSurveyAnswers,
    setStudyFieldRecommendations,
    setOrientationSurveyIndex,
  } = useContext(OrientationSurveyContext);

  const handleDashboard = () => {
    toast({
      title: 'Go to Dashboard',
      description:
        'The go to dashboard feature is currently under development. Please check back later.',
    });
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

  return (
    <>
      <div className='flex flex-col w-screen h-screen'>
        <header className='w-full h-[10rem] flex flex-col justify-between items-center py-12 flex-shrink-0'>
          <img
            className='lg:self-start lg:ml-12'
            src='../../images/Accademium_Logo.png'
            width={160}
            height={24}
          />
          <Separator className='w-[95%]' />
        </header>

        <main className='w-full h-full flex flex-col gap-y-2'>
          {/* Progress Bar + Dashboard Button  */}
          {orientationSurveyIndex != 0 && !loading && (
            <div className='flex lg:flex-row flex-col-reverse justify-center items-center w-full h-[2.5rem]'>
              <Progress
                value={progress}
                className='lg:w-[44rem] w-[22rem] h-[24px]'
              />

              {/* Dashboard Button */}
              <div className='flex gap-x-2 absolute lg:right-[4rem]'>
                <button onClick={() => handleDashboard()}>
                  <img
                    src='../../images/dashboard_icon.png'
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
          {orientationSurveyIndex !== 0 && !loading && (
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
        </main>

        <footer className='flex flex-col justify-center items-center w-full h-[5rem] flex-shrink-0'>
          <Separator className='w-[95%]' />
        </footer>
      </div>
      <Toaster />
    </>
  );
};

export default OrientationSurveyPage;
