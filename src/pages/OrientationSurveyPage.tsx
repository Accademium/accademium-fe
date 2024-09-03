import React, { useContext } from 'react';

import { getQuestionsAndAnswers } from '../utils';

import { SurveyScreen } from '../screens/SurveyScreen';
import { StudyFieldScreen } from '../screens/StudyFieldScreen';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';

import { Toaster } from '../components/ui/toaster';
import { Separator } from '../components/ui/separator';
import { Loader2 } from 'lucide-react';

const OrientationSurveyPage: React.FC = () => {
  const {
    orientationSurveyIndex,
    loading,
    disabled,
    surveyAnswers,
    recommendations,
    setSurveyAnswers,
    setRecommendations,
    setLoading,
    setDisabled,
  } = useContext(OrientationSurveyContext);

  return (
    <>
      <header>
        <img
          className='absolute -top-5'
          src='../../images/Accademium_Logo.svg'
          width={240}
        ></img>
      </header>
      <main>
        <Separator className='absolute top-24 left-32 w-[85%]' />

        {/* Loading Spinner */}
        {loading && (
          <div className='flex justify-center items-center h-screen w-screen'>
            <Loader2 className='w-24 h-24 animate-spin' />
          </div>
        )}

        {/* Survey Screen */}
        {orientationSurveyIndex == 0 && !loading && (
          <SurveyScreen questionsAndAnswers={getQuestionsAndAnswers()} />
        )}

        {/* Study Field Screen */}
        {orientationSurveyIndex == 1 && !loading && recommendations && (
          <>
            <StudyFieldScreen
              surveyAnswers={surveyAnswers}
              recommendations={recommendations}
              disabled={disabled}
              setSurveyAnswers={setSurveyAnswers}
              setRecommendations={setRecommendations}
              setLoading={setLoading}
              setDisabled={setDisabled}
            />
          </>
        )}

        <Separator className='absolute bottom-10 left-32 w-[85%]' />
      </main>
      <Toaster />
    </>
  );
};

export default OrientationSurveyPage;
