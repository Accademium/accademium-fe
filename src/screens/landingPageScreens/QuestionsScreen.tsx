import React, { useState } from "react";

interface CardData {
    question: string;
    description: string;
}

interface QuestionsScreenProps {
    question: string;
    description: string;
    isOpen: boolean;
    onClick: () => void;
}

const Questions = () => {
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

    const cardsData: CardData[] = [
        {
            question: "What countries and universities does Accademium support?",
            description: "Explore universities and programs tailored to your preferences with our comprehensive search feature. Filter universities based on location, tuition fees, available scholarships, and explore detailed program information, admission requirements, and scholarship opportunities."
        },
        {
            question: "Is Accademium suitable for undergraduate and graduate students?",
            description: "Explore universities and programs tailored to your preferences with our comprehensive search feature. Filter universities based on location, tuition fees, available scholarships, and explore detailed program information, admission requirements, and scholarship opportunities."
        },
        {
            question: "Can Accademium provide guidance on financial aid and scholarships?",
            description: "Explore universities and programs tailored to your preferences with our comprehensive search feature. Filter universities based on location, tuition fees, available scholarships, and explore detailed program information, admission requirements, and scholarship opportunities."
        },
        {
            question: "Does Accademium offer support from finding accommodation abroad?",
            description: "Explore universities and programs tailored to your preferences with our comprehensive search feature. Filter universities based on location, tuition fees, available scholarships, and explore detailed program information, admission requirements, and scholarship opportunities."
        },
        {
            question: "How does Accademium store my personal information?",
            description: "Explore universities and programs tailored to your preferences with our comprehensive search feature. Filter universities based on location, tuition fees, available scholarships, and explore detailed program information, admission requirements, and scholarship opportunities."
        },
        {
            question: "How can I get in touch with Accademium's support team?",
            description: "Explore universities and programs tailored to your preferences with our comprehensive search feature. Filter universities based on location, tuition fees, available scholarships, and explore detailed program information, admission requirements, and scholarship opportunities."
        }

    ];

    const toggleCard = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index);
    };

    const Card: React.FC<QuestionsScreenProps> = ({ question, description, isOpen, onClick }) => {
        return (
            <div
                className={`border border-[#ccc] rounded-2xl p-5 md:w-2/3 max-md:w-11/12 mb-3 flex flex-col ${isOpen ? 'open' : ''}`}
                onClick={onClick}>
                <div
                    className="flex items-center md:text-xl max-md:text-lg max-md:leading-tight cursor-pointer justify-between font-bold"
                    onClick={onClick}>
                    <span>{question}</span>
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
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    question={card.question}
                    description={card.description}
                    isOpen={openCardIndex === index}
                    onClick={() => toggleCard(index)}
                />
            ))}
        </div>
    );
};

export default Questions;
