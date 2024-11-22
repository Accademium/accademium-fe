import React, { useState } from "react";
import { ApplicationInfoScreenProps } from "@/data/utils/interfaces/screens/ApplicationInfoScreen.ts";
import { ApplicationInfoScreenData } from "@/data/LandingPageData.ts";
import BlankImg from "/images/Landing-Page-Images/BlankImage.png";

const CardList = () => {
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

const toggleCard = (index: number) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
};

const Card: React.FC<ApplicationInfoScreenProps> = ({ title, description, isOpen, onClick }) => {
    return (
        <div
            className={`p-5 mb-2 max-md:w-11/12 max-md:mx-auto ${isOpen ? 'border border-[#ccc] rounded-lg' : ''}`}
            onClick={onClick}>
            <div
                className="flex items-center text-xl font-bold cursor-pointer gap-3"
                onClick={onClick}>
                <span className="">{isOpen ? '▼' : '►'}</span>
                <span className="text-2xl font-bold">{title}</span>
            </div>
            {isOpen && (
                <div className="text-sm pt-3">
                    {description}
                </div>
            )}
        </div>
    );
};

    return (
        <div id="appInfo" className="md:w-11/12 mx-auto flex flex-col items-center font-coolvetica mt-20">
            <h1 className="w-10/12 text-center md:text-4xl max-md:text-3xl font-extrabold pb-20">
                Everything you need for a successful application <br></br>
                in one place
            </h1>
            <div className="md:flex md:flex-row-reverse gap-44">
                <div>
                    <img src={BlankImg} alt="" className="mb-12 w-full md:rounded-2xl"/>
                </div>
                <div className="flex flex-col md:w-[600px]">
                    {ApplicationInfoScreenData.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            description={card.description}
                            isOpen={openCardIndex === index}
                            onClick={() => toggleCard(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};



export default CardList;
