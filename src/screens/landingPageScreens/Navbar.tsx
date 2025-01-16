import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Logo from "/images/Accademium_Logo.png";

const Navbar = () => {
    const [ activeDropdown, setActiveDropdown ] = useState<string | null>(null);
    const [ isBurgerMenu, setIsBurgerMenu ] = useState<boolean>(false);
    const [ isMenuToggled, setIsMenuToggled ] = useState<boolean>(false);

    const toggleDropdown = (menu: string) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const toggleMenu = () => {
        setIsMenuToggled(!isMenuToggled);
    };

    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setIsBurgerMenu(false);
        } else {
            setIsBurgerMenu(true);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav id="navbar" className="w-11/12 mx-auto flex items-center justify-between bg-white text-black py-5 font-bold font-coolvetica">
            <img src={Logo} alt="accademium-logo" className="h-6" />

            {!isBurgerMenu ? (
                <>
                    {/* TODO: Fix dropdown menu symbol display */}
                    <div className="flex items-center px-4">
                        <div className="relative">
                            <button onClick={() => toggleDropdown('dropM1')}
                                    className="font-coolvetica bg-white text-black py-1 pl-7 pr-5 cursor-pointer text-lg items-center">
                                Universities &#11167;
                            </button>
                            {activeDropdown === 'dropM1' && (
                                <div
                                    className="absolute top-full left-0 w-48 md:w-full flex flex-col items-start bg-white border border-gray-300 shadow-md z-10">
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 1</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 2</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 3</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleDropdown('dropM2')}
                                    className="font-coolvetica bg-white text-black py-1 pl-7 pr-5 cursor-pointer text-lg items-center">
                                Studying abroad &#11167;
                            </button>
                            {activeDropdown === 'dropM2' && (
                                <div
                                    className="absolute top-full left-0 w-48 md:w-full flex flex-col items-start bg-white border border-gray-300 shadow-md z-10">
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 1</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 2</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 3</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleDropdown('dropM3')}
                                    className="font-coolvetica bg-white text-black py-1 pl-7 pr-5 cursor-pointer text-lg items-center">
                                Career Orientation &#11167;
                            </button>
                            {activeDropdown === 'dropM3' && (
                                <div
                                    className="absolute top-full left-0 w-48 md:w-full flex flex-col items-start bg-white border border-gray-300 shadow-md z-10">
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 1</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 2</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 3</a>
                                </div>
                            )}
                        </div>
                        <a href="#" className="py-1.5 px-7 text-lg relative inline-block items-center">
                            About us
                        </a>
                        <a href="#" className="py-1.5 px-7 text-lg relative inline-block items-center">
                            Contact
                        </a>
                        <div className="flex gap-4 items-center">
                            <a href="#" className="py-2 px-8 rounded-2xl border-2 border-black items-center">
                                Sign In
                            </a>
                            <a href="#"
                               className="py-2 px-14 text-white border-2 border-[#0ea2e7] rounded-2xl bg-[#0ea2e7] items-center">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </>
            ) : (
                <button onClick={toggleMenu}>
                    <Menu />
                </button>
            )}

            {/* Mobile menu */}
            {isBurgerMenu && isMenuToggled && (
                <div className="fixed right-0 top-16 z-30 w-full bg-white">
                    <div className="flex flex-col items-center p-8">
                        <div className="relative">
                            <button onClick={() => toggleDropdown('dropM1')}
                                    className="font-coolvetica bg-white text-black py-1 pl-7 pr-5 cursor-pointer text-lg items-center">
                                Universities &#11167;
                            </button>
                            {activeDropdown === 'dropM1' && (
                                <div
                                    className="absolute top-full left-0 w-48 flex flex-col items-start bg-white border border-gray-300 shadow-md z-10">
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 1</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 2</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 3</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleDropdown('dropM2')}
                                    className="font-coolvetica bg-white text-black py-1 pl-7 pr-5 cursor-pointer text-lg items-center">
                                Studying abroad &#11167;
                            </button>
                            {activeDropdown === 'dropM2' && (
                                <div
                                    className="absolute top-full left-0 w-48 flex flex-col items-start bg-white border border-gray-300 shadow-md z-10">
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 1</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 2</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 3</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleDropdown('dropM3')}
                                    className="font-coolvetica bg-white text-black py-1 pl-7 pr-5 cursor-pointer text-lg items-center">
                                Career Orientation &#11167;
                            </button>
                            {activeDropdown === 'dropM3' && (
                                <div
                                    className="absolute top-full left-0 w-48 flex flex-col items-start bg-white border border-gray-300 shadow-md z-10">
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 1</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 2</a>
                                    <a href="#" className="p-2 hover:bg-gray-100">Link 3</a>
                                </div>
                            )}
                        </div>
                        <a href="#" className="py-1.5 px-7 text-lg relative inline-block items-center">
                            About us
                        </a>
                        <a href="#" className="py-1.5 px-7 text-lg relative inline-block items-center">
                            Contact
                        </a>
                        <div className="flex gap-4 items-center mt-8">
                            <a href="#" className="py-2 px-8 rounded-2xl border-2 border-black items-center">
                                Sign In
                            </a>
                            <a href="#"
                               className="py-2 px-14 text-white border-2 border-[#0ea2e7] rounded-2xl bg-[#0ea2e7] items-center">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
