import StaticCalender from "@/components/ui/StaticCalender";
import Link from "next/link";

export default function Main() {

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sky-50 via-neutral-50 to-emerald-50 lg:flex lg:justify-center">
      <div className="mx-10 py-20">
        <h2 className="lg:w-120 text-6xl font-bold">Build <span className="text-[#2563eb]">Consistent</span> Habits with 
        <span className="text-[#17a24a]"> Daily Streaks</span>
        </h2>
        <p className="mt-5 text-xl text-[#4B5563] leading-normal">Track your daily tasks, build powerful habits, and visualize<br/> your progress with beautiful calendar streaks. Turn your<br/> goals into unstoppable momentum.</p>
        <div className="mt-15 flex">
          <div>
            
              <Link href="/signup" className="flex items-center text-[#4B5563]">
              <h1 className="py-2 px-4 cursor-pointer rounded-sm text-medium mx-3 text-white bg-[#2563eb] hover:bg-[#253cebf8]">
                Start Building Habits
              </h1>
            </Link>
            
          </div>
          <div>
            <ul className="hidden lg:flex xl:pl-5 text-[#4B5563] gap-8">
              <li>😊User Friendly</li>
              <li>🚀Free to Start</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-17 py-10">
        <StaticCalender />
      </div>
    </main>
  );
}
