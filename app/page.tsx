//hello
import Link from 'next/link';
import Main from "@/components/ui/landingPageBody";
import { CircleCheckBig ,Calendar, TrendingUp,Bell, Target,ChartBar,Plus, Trophy} from 'lucide-react';
import Card from '@/components/ui/Card';
import StepCard from '@/components/ui/StepCard';
import Footer from '@/components/ui/Footer';
import Hamburger from '@/components/ui/Hamburger';

export default function Home() {
  
  return (
    <>
      <nav className="sticky top-0 z-50 px-5 py-5 flex justify-between lg:justify-between backdrop-blur-md bg-[#fefffe]/60 border-b border-gray-200">
        <div className="lg:ml-14">
          <Link href="/">
            <span className="flex items-center">
              <Calendar color="#3671ec" className="w-8 h-8 mx-0.5"/>
              <CircleCheckBig color="#22c45f" className=" mr-1 ml-0.5"/>
              <h1 className="mx-1 text-2xl font-bold text-[#111827]">Consistify</h1>
            </span>
          </Link>
        </div>
        <div className='hidden lg:flex'>
          <Link href="#my-section" className="px-5 text-[#4B5563]">Features</Link>
          <Link href="#my-section2" className="px-5 text-[#4B5563]">How it Works</Link>
          <Link href="/signup" className="px-5 text-[#4B5563]">Let&apos;s Get Moving</Link>
        </div>
        {/* here add the hamburger client component*/}
        <Hamburger/>
        {/* here ends the client component of hamburger menu*/}
        <div className='hidden lg:flex'>
            <Link href="/signin">
              <h1  className="border cursor-pointer border-gray-200 py-2 px-4 rounded-sm text-medium mx-3 text-[#080f1c] bg-[#fefffe] hover:bg-[#f3f3f3]">
                Sign In
              </h1>
            </Link>
            <Link href="/signup">
              <h1 className="py-2 px-4 cursor-pointer rounded-sm text-medium mx-3 text-white bg-[#2563eb] hover:bg-[#253cebf8]">
                Get Started
              </h1>
            </Link>
          
        </div>
      </nav>
      <Main/>
     
      <div id="my-section" className=" bg-white shadow py-20">
        <h1 className='text-center text-4xl font-bold leading-normal'>Everything you need to build lasting habits</h1>
        <h2 className='text-center text-xl leading-normal text-[#4B5563] mb-20'>Powerful features designed to help you stay consistent and motivated on<br/> your journey to better habits.</h2>
        <div className='flex justify-center'>
          <div className='grid grid-cols-3 gap-10'>
          <Card IconComponent={Calendar} color="#3671ec" heading="Visual Calendar Streaks">
            See your progress at a glance with <br />
            beautiful calendar visualizations that <br />
            show your consistency streaks.
          </Card>
          <Card IconComponent={CircleCheckBig} color="#22c45f" heading="Daily Task Tracking">
            Easily check off your daily recurring<br />
            tasks and build momentum with every<br />
            completed habit.
          </Card>
          <Card IconComponent={TrendingUp} color="#9333ea" heading="Streak Analytics">
            Track your longest streaks, average<br />
            completion rates, and identify patterns<br />
            in your habits.
          </Card>
          <Card IconComponent={Bell} color="#eb590c" heading="Smart Reminders">
            Never miss a habit with intelligent<br />
            notifications that adapt to your<br />
            schedule and preferences.
          </Card>
          <Card IconComponent={Target} color="#de3839" heading="Goal Setting">
            Set specific goals for each habit and<br />
            track your progress towards achieving<br />
            them.
          </Card>
          <Card IconComponent={ChartBar} color="#4e46e4" heading="Progress Insights">
            Get detailed insights about your habits<br />
            with charts and statistics to optimize<br />
            your routine.
          </Card>
          </div>
        </div>
      </div>
      <div id="my-section2" className="py-20 bg-gradient-to-br from-slate-50 via-slate-50 to-sky-100">
        <h1 className='text-center text-4xl font-bold leading-normal'>How Consistify Works</h1>
        <h2 className='text-center text-xl leading-normal text-[#4B5563] mb-20'>Building habits has never been easier. Follow these simple steps to<br/> transform your daily routine.</h2>
        <div className='grid grid-cols-4'>
          <StepCard IconComponent={Plus} color="#3a83f6" heading="Add Your Habits">
            Create daily recurring tasks for the<br />
            habits you want to build. Whether<br />
            it&apos;s exercise, reading, or<br/> meditation.
          </StepCard>
          <StepCard IconComponent={Calendar} color="#22c45f" heading="Track Daily">
            Check off your habits each day and<br />
            watch your calendar fill up with<br />
            successful completions.
          </StepCard>
          <StepCard IconComponent={TrendingUp} color="#a855f7" heading="Build Streaks">
            Maintain consistency to build<br />
            impressive streaks. The longer your<br />
            streak, the stronger your habit<br/> becomes.
          </StepCard>
          <StepCard IconComponent={Trophy} color="#f87317" heading="Achieve Goals">
            Celebrate your progress and<br />
            achieve your long-term goals<br />
            through the power of daily<br/> consistency.
          </StepCard>
        </div>
        <div className='pt-10 flex justify-center'>
            <Link href="/signup" className="flex items-center text-[#4B5563]">
              <h1 className="py-2 px-4 cursor-pointer rounded-sm text-medium mx-3 text-white bg-[#2563eb] hover:bg-[#253cebf8]">
                Start Your Journey
              </h1>
            </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
}
