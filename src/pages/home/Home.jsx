import React from 'react'
import Hero from '../../components/home/Hero'
import SoEasy from '../../components/home/SoEasy'
import LogoList from '../../components/home/LogoList'
import WhoAreYou from '../../components/home/WhoAreYou'
import LogoSlide from '../../components/home/LogoSlide'
import CategoryTab from '../../components/home/CategoryTab'
import CreateProfile from '../../components/home/CreateProfile'
import FAskedQ from '../../components/home/FAskedQ'
import InstagramSec from '../../components/home/InstagramSec'
import Footer from '../../components/home/Footer'
import Contact from '../../components/home/Contact'
import WeeklyTab from '../../components/home/WeeklyTab'
import Features from '../../components/home/Features'
import FeaturesTwo from '../../components/home/FeaturesTwo'
import HowItWorks from '../../components/home/HowItWorks'

const Home = () => {
  return (
    <div
      style={{ overflowX: 'hidden' }}
    >
      <Hero />
      <Features />
      <SoEasy />
      <FeaturesTwo />
      <LogoList />
      <WhoAreYou />
      <LogoSlide />
      <WeeklyTab />
      <CategoryTab />
      {/* <CreateProfile /> */}
      <HowItWorks />
      <FAskedQ />
      <Contact />
      <InstagramSec />
      <Footer />
    </div>
  )
}

export default Home