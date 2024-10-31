import SurveyImg from "/images/Landing Page Images/survey-photo.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
    return(
        <section id="hero"
                 className="overflow-hidden md:w-11/12 mx-auto lg:flex flex-row-reverse justify-between
                 max-lg:flex-col lg:pt-32 max-lg:pt-16 relative font-coolvetica
                 border-b border-black pb-28 max-lg:justify-items-center max-lg:text-center
                 ">
            <div>
                <img src = {SurveyImg} className="md:w-[600px] md:h-[350px] md:rounded-3xl"/>
            </div>
            <div className="max-lg:mt-12 md:space-y-10 max-md:space-y-6 max-md:w-11/12 max-md:mx-auto max-md:text-center">
                <h2 className="md:text-7xl max-md:text-5xl font-extrabold">
                    Accelerate your<br />
                    academic journey!
                </h2>
                <p className="md:text-2xl font-bold max-md:py-6">
                    Welcome to Accademium - the innovative SaaS solution<br />
                    designed to accelerate and simplify the application process.
                </p>
                <Link to="/survey" className="max-lg:mx-auto w-10/12 py-2 flex items-center justify-center rounded-3xl bg-[#4c9cfc] text-white md:text-xl">
                    Take your free career orientation survey &#10230;
                </Link>
            </div>
        </section>
    );

};

export default Hero;
