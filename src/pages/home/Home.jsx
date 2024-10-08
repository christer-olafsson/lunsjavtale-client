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

const Home = () => {
  return (
    <div
      style={{ overflowX: 'hidden' }}
    >
      <Hero />
      <SoEasy />
      <LogoList />
      <WhoAreYou />
      <LogoSlide />
      <WeeklyTab />
      <CategoryTab />
      <CreateProfile />
      <FAskedQ />
      <Contact />
      <InstagramSec />
      <Footer />
    </div>
  )
}

export default Home