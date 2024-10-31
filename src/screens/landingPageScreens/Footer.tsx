import Logo from "/images/Accademium_Logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedinIn, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return(
        <footer id="footer" className="md:w-11/12 mx-auto relative py-2 md:px-10 max-md:px-4 font-coolvetica">
            <div className="flex max-md:flex-col max-md:items-center max-md:text-center justify-between pb-8 border-b border-black">
                <div className="flex flex-col md:items-start max-md:items-center gap-4 max-md:pb-12">
                    <img src={ Logo } alt="logo" className="h-6"/>
                    <p className="font-bold">
                        The leading platform for streamlining<br />
                        the study abroad journey and<br />
                        enabling academic success
                    </p>
                    <div className="flex gap-8">
                        <a href="#">
                            <FontAwesomeIcon icon={ faLinkedinIn } />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={ faXTwitter } />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={ faInstagram } />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={ faYoutube } />
                        </a>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 md:gap-4 max-md:gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Company
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <a href="#"><p>About Accademium</p></a>
                            <a href="#"><p>Careers</p></a>
                            <a href="#"><p>Customers</p></a>
                            <a href="#"><p>Partnerships</p></a>
                            <a href="#"><p>Contact</p></a>
                            <a href="#"><p>Data security & privacy</p></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Resources
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <a href="#"><p>Resources Hub</p></a>
                            <a href="#"><p>Newsroom</p></a>
                            <a href="#"><p>Blog</p></a>
                            <a href="#"><p>Guides and Checklists</p></a>
                            <a href="#"><p>Webinars</p></a>
                            <a href="#"><p>StudyFinder</p></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Product
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <a href="#"><p>Features</p></a>
                            <a href="#"><p>Product Updates</p></a>
                            <a href="#"><p>User Guides</p></a>
                            <a href="#"><p>Troubleshooting</p></a>
                            <a href="#"><p>Support Center</p></a>
                            <a href="#"><p>Product Roadmap</p></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Popular Links
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <a href="#"><p>Top Universities</p></a>
                            <a href="#"><p>Degree Programs</p></a>
                            <a href="#"><p>Internship Opportunities</p></a>
                            <a href="#"><p>Exchange Programs</p></a>
                            <a href="#"><p>Health Insurance Options</p></a>
                            <a href="#"><p>Student Organization</p></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex max-md:flex-col items-center justify-between py-4 max-md:gap-8 max-md:text-center">
                <div>
                <h4 className="text-lg font-bold">Accademium &#169; 2024</h4>
                    <p>g.k Vuzrazhdane, 1A 8000, Burgas,Bulgaria</p>
                </div>
                <div className="flex md:gap-8 max-md:flex-col max-md:gap-2 font-bold">
                    <a href="#" className="lower-part-p3">Privacy Policy</a>
                    <a href="#" className="lower-part-p3">Accessibility</a>
                    <a href="#" className="lower-part-p3">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;