import React, { useState, useContext } from 'react';
import { getSurveyAnswersKeys } from '../utils';
import { SurveyScreenProps } from '../types';
import { Progress } from '@/components/ui/progress';
import { useToast } from '../components/ui/use-toast';

import Cookies from 'js-cookie'; 

import { Toaster } from '@/components/ui/toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { OrientationSurveyContext } from '@/context/OrientationSurveyContext';
import { AuthModal } from '@/components/auth/AuthModal';

export const SurveyScreen: React.FC<SurveyScreenProps> = ({
  questionsAndAnswers,
}) => {
  const {
    orientationSurveyIndex,
    surveyAnswers,
    setSurveyAnswers,
    getStudyFieldRecommendations,
    setOrientationSurveyIndex,
  } = useContext(OrientationSurveyContext);

  const { toast } = useToast();

  const [selected, setSelected] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const handleNext = () => {
    if (selected === 0) {
      toast({
        description: 'You need to select an answer in order to proceed.',
      });
      return;
    }
    if (questionIndex < questionsAndAnswers.length - 1) {
      console.log(`Setting answer for question index: ${[questionIndex + 1]} and its answer ${selected}`)
      console.log(surveyAnswers)
      setSurveyAnswers((prev) => ({
        ...prev,
        [questionIndex + 1]: selected,
      }));
      setProgress(progress + 10);
      setSelected(0);
      setQuestionIndex(questionIndex + 1);
    } else {
      // If user is not authenticated he cannot submit the survey
      if (!Cookies.get('token')) {
        setShowAuthModal(true);
        return;
      }
      handleFinish();
    }
  };

  // Called when authentication succeeds in the modal
  const handleAuthSuccess = () => {
    console.log("Successfull login!")
    setShowAuthModal(false);
    handleFinish();
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setProgress(progress - 10);
      setQuestionIndex(questionIndex - 1);
    }
  };

  // Final submission logic
  const handleFinish = () => {
    // Save the final answer
    setSurveyAnswers((prev) => ({
      ...prev,
      [questionIndex + 1]: selected,
    }));
    console.log("surveyAnswers")
    console.log(surveyAnswers)
    // Now that we are authenticated, submit the answers
    getStudyFieldRecommendations(surveyAnswers);
    setOrientationSurveyIndex(orientationSurveyIndex + 1);
  };

  return (
    <>
      {/* Main Container */}
      <div className='flex flex-col h-full justify-between items-center'>
        <Progress
          value={progress}
          className='lg:w-[44rem] w-[22rem] h-[24px]'
        />
        {/* Question */}
        <h1 className='font-coolvetica lg:text-4xl text-xl px-4 font-bold text-center '>
          {questionsAndAnswers[questionIndex][0]}
        </h1>
        {/* Answers */}
        <div className='flex flex-col lg:gap-y-6 gap-y-8'>
          <button
            className={`border-2 rounded-xl lg:w-[42rem] w-[22rem] h-[4rem] p-2.5 pl-4 hover:border-black ${
              selected === 1 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(1)}
          >
            <h3 className='text-left font-coolvetica font-bold lg:text-2xl text-lg'>
              {questionsAndAnswers[questionIndex][1]}
            </h3>
          </button>
          <button
            className={`border-2 rounded-xl lg:w-[42rem] w-[22rem] h-[4rem] p-2.5 pl-4 hover:border-black ${
              selected === 2 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(2)}
          >
            <h3 className='text-left font-coolvetica font-bold lg:text-2xl text-lg'>
              {questionsAndAnswers[questionIndex][2]}
            </h3>
          </button>
          <button
            className={`border-2 rounded-xl lg:w-[42rem] w-[22rem] h-[4rem] p-2.5 pl-4 hover:border-black ${
              selected === 3 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(3)}
          >
            <h3 className='text-left font-coolvetica font-bold lg:text-2xl text-lg'>
              {questionsAndAnswers[questionIndex][3]}
            </h3>
          </button>
          <button
            className={`border-2 rounded-xl lg:w-[42rem] w-[22rem] h-[4rem] py-2.5 pl-4 hover:border-black ${
              selected === 4 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(4)}
          >
            <h3 className='text-left font-coolvetica font-bold lg:text-2xl text-lg'>
              {questionsAndAnswers[questionIndex][4]}
            </h3>
          </button>
        </div>

        {/* Next Question/Finish Survey Button */}
        {questionIndex === 0 && (
          <button
            className='bg-black rounded-2xl w-[22rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
            onClick={handleNext}
          >
            <h3 className='font-coolvetica font-bold text-md text-white'>
              Next
            </h3>
            <FontAwesomeIcon
              icon={faArrowRight}
              className='text-white text-sm'
            />
          </button>
        )}

        {/* Back/Next Buttons */}
        {questionIndex !== 0 && (
          <div className='flex flex-row justify-center gap-x-4 w-full'>
            <button
              className='bg-black rounded-2xl w-[10rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
              onClick={() => handlePrevious()}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='text-white text-sm ml-1'
              />
              <h3 className='font-coolvetica font-bold text-md text-white'>
                Back
              </h3>
            </button>
            <button
              className='bg-black rounded-2xl w-[10rem] h-[2.5rem] flex flex-row justify-center items-center gap-x-2'
              onClick={() => handleNext()}
            >
              <h3 className='font-coolvetica font-bold text-md text-white'>
                {questionIndex === questionsAndAnswers.length - 1
                  ? 'Finish'
                  : 'Next'}
              </h3>
              <FontAwesomeIcon
                icon={faArrowRight}
                className='text-white text-sm'
              />
            </button>
          </div>
        )}
      </div>
      <Toaster />

      {/* Render the authentication modal if needed */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
};
