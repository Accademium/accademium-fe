import React from "react";
import Navbar from "@/screens/landingPageScreens/Navbar.tsx";
import HeroScreen from "@/screens/landingPageScreens/HeroScreen.tsx";
import ServicesScreen from "@/screens/landingPageScreens/ServicesScreen.tsx";
import UniversityListScreen from "@/screens/landingPageScreens/UniversityListScreen.tsx";
import ApplicationInfoScreen from "@/screens/landingPageScreens/ApplicationInfoScreen.tsx";
import StoriesScreen from "@/screens/landingPageScreens/StoriesScreen.tsx";
import ResourcesScreen from "@/screens/landingPageScreens/ResourcesScreen.tsx";
import Questions from "@/screens/landingPageScreens/QuestionsScreen.tsx";
import SignUp from "@/screens/landingPageScreens/SingupBannerScreen.tsx";
import Footer from "@/screens/landingPageScreens/Footer.tsx";

// TODO: Move Landing Page files to appropriate directories

const LandingPage: React.FC = () => {
    return (
        <>
            <Navbar/>
            <div>
                <HeroScreen />
                <ServicesScreen />
                <UniversityListScreen />
                <ApplicationInfoScreen />
                <StoriesScreen />
                <ResourcesScreen />
                <Questions />
                <SignUp />
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
