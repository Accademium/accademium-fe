import React, { useState } from "react";
import { QuestionsScreenProps } from "@/data/utils/interfaces/screens/QuestionsScreen.ts";
import { questionsData } from "@/data/LandingPageData.ts";


const Questions = () => {
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index);
    };

    const Card: React.FC<QuestionsScreenProps> = ({ title, description, isOpen, onClick }) => {
        return (
            <div
                className={`border border-[#ccc] rounded-2xl p-5 md:w-2/3 max-md:w-11/12 mb-3 flex flex-col ${isOpen ? 'open' : ''}`}
                onClick={onClick}>
                <div
                    className="flex items-center md:text-xl max-md:text-lg max-md:leading-tight cursor-pointer justify-between font-bold"
                    onClick={onClick}>
                    <span>{title}</span>
                    <span>{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                    <div className="pt-2 md:text-lg max-md:text-sm font-normal">
                        {description}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div id="questions" className="flex flex-col items-center p-5 mt-12 mb-8 font-coolvetica">
            <h1 className="text-center font-extrabold md:text-4xl max-md:text-3xl pb-8 px-8">
                Frequently asked questions
            </h1>
            {questionsData.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    isOpen={openCardIndex === index}
                    onClick={() => toggleCard(index)}
                />
            ))}
        </div>
    );
};

export default Questions;
