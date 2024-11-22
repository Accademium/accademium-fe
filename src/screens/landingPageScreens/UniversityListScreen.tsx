import LogoHanze from "/images/Landing-Page-Images/hanze-uni-removebg-preview.png";
import LogoHochschule from "/images/Landing-Page-Images/hochschule-uni-removebg-preview.png";
import LogoCampus2 from "/images/Landing-Page-Images/campus2-uni-removebg-preview.png";
import LogoNHL from "/images/Landing-Page-Images/nhl-stenden-uni-removebg-preview.png";
import LogoRWTH from "/images/Landing-Page-Images/rwth-uni-removebg-preview.png";
import LogoUW from "/images/Landing-Page-Images/Screenshot_2024-07-12_134742-removebg-preview.png";
import LogoGroningen from "/images/Landing-Page-Images/groingan-uni-removebg-preview.png";

const UniversityList = () => {
    return(
        <section id="uniList" className="bg-[#C0D6FBFF] px-20 font-coolvetica">
            <h4 className="text-center font-bold text-4xl py-12">
                50+ leading universities, associations, and <br />
                consultancy companies trust Accademium
            </h4>
            <div className="grid md:grid-cols-3 max-md:grid-cols-2 justify-center items-center lg:px-20 gap-20 py-12">
                <img src={LogoHanze} />
                <img src={LogoHochschule} />
                <img src={LogoCampus2} />
                <img src={LogoNHL} />
                <img src={LogoRWTH} />
                <img src={LogoUW} />
                <img src={LogoGroningen} className="md:col-start-2"/>
            </div>
        </section>
    );
}
export default UniversityList;