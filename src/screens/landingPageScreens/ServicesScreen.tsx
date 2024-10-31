import ServicesInteractive from "/images/Landing Page Images/ServicesInteractive.png";
import ServicesIndividual from "/images/Landing Page Images/ServicesIndividual.png";
import ServicesMentorship from "/images/Landing Page Images/ServicesMentor.png";

const Services = () => {
    return(
        <section id="services" className="md:w-11/12 mx-auto grid lg:grid-cols-3 items-center justify-center max-lg:gap-4 font-coolvetica mt-12 mb-20">
            <div className="flex flex-col">
                <div className="flex items-center gap-4 h-1/2">
                    <img src={ServicesInteractive} className="w-[90px]"/>
                    <h3 className="font-extrabold text-xl">Interactive experience</h3>
                </div>
                <p className="font-bold mt-2 px-2">
                    Accademium's interactive interface <br></br>
                    revolutionizes the application process,<br></br>
                    providing a streamlined and engaging<br></br>
                    experience that goes beyond what<br></br>
                    traditional manual methods can ofer.
                </p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-4 h-1/2">
                    <img src={ServicesIndividual} className="w-[90px]"/>
                    <h3 className="font-extrabold text-xl">Individual treatment</h3>
                </div>
                <p className="font-bold mt-2 px-2">
                    Accademium's AI-driven platform provides <br></br>
                    unmatched personalized assistance, using<br></br>
                    advanced algorithms to understand each<br></br>
                    user's unique needs, ensuring a tailored<br></br>
                    application experience for maximum success.
                </p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-4 h-1/2">
                    <img src={ServicesMentorship} className="w-[90px]"/>
                    <h3 className="font-extrabold text-xl">Expert mentorship</h3>
                </div>
                <p className="font-bold mt-2 px-2">
                    Accademium's expert mentorship program <br></br>
                    provides tailored support for users who<br></br>
                    prioritize expert guidance, connecting them<br></br>
                    with industry professionals to navigate the<br></br>
                    application journey with confidence.
                </p>
            </div>
        </section>
    );
}
export default Services;