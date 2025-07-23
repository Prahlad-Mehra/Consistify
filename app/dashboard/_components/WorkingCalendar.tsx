import { Check, Flame, Trophy, Target } from 'lucide-react';
import useTodoStore from '@/store/useTodoStore';

interface dates{
    date: String
}

interface WorkingCalendarProps {
    id: number;
}

const WorkingCalendar = ({id}:WorkingCalendarProps)=> {
    // const id:(string | undefined)= useTodoStore(state => state.Calendar.find(item => item.id==="Inbox"))?.id;
    const completedDays:(dates[] | undefined)= useTodoStore(state => state.notes.find(item => item.id===id))?.calendarDates;
    const NowDate:Date=new Date()
    const currentDate:string=NowDate.toISOString().split('T')[0];

    const completedDaysSet= new Set(completedDays!.map(day => day.date))
    const calendarDays= []

    for(let day=1;day<=30;day++){
        calendarDays.push(day)
    }
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const MonthNames=["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]

    function streak():number{
      if (!completedDays || completedDays.length === 0) {
        return 0;
      }

      const date=new Date()
      let today=`${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`

      let a=0;
      let i=completedDays!.length -1;
      while(i>=0 && completedDays![i].date===today){
        a++;
        today=`${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${(date.getDate() -a).toString().padStart(2, '0')}`
        i--;
      }
      console.log(a)
      return a;
    }
    let Streak:number=streak()

    return (
        <div className="w-90 lg:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 mx-5">
          {/* Header with Title */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Daily Streak</h2>
            <div className="flex items-center space-x-1 text-emerald-600">
              <Flame className="lg:w-4 lg:h-4" />
              <span className="text-sm font-medium">{Streak}</span>
            </div>
          </div>
    
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Flame className="lg:w-3 lg:h-3 text-emerald-600" />
              </div>
              <p className="text-xs text-emerald-600 font-medium">Current</p>
              <p className="text-sm font-bold text-emerald-700">{Streak}</p>
            </div>
            
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="lg:w-3 lg:h-3 text-blue-600" />
              </div>
              <p className="text-xs text-blue-600 font-medium">Best</p>
              <p className="text-sm font-bold text-blue-700">{Streak}</p>
            </div>
            
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target className="lg:w-3 lg:h-3 text-purple-600" />
              </div>
              <p className="text-xs text-purple-600 font-medium">Total</p>
              <p className="text-sm font-bold text-purple-700">{Streak}</p>
            </div>
          </div>
    
          {/* Calendar Navigation */}
          <div className="flex items-center justify-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              {MonthNames[NowDate.getMonth()]} {NowDate.getFullYear()}
            </h3>
          </div>
    
          {/* Calendar Grid */}
          <div className="bg-gray-50 rounded-lg p-3">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center py-1">
                  <span className="text-xs font-medium text-gray-500">{day}</span>
                </div>
              ))}
            </div>
    
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="w-8 h-8" />;
                }
    
                const dateString = `${2025}-${String(NowDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isCompleted = completedDaysSet.has(dateString);
                const isToday = dateString === currentDate;
    
                return (
                  <button
                    key={day}
                    className={`
                      w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium
                      transition-all duration-150 hover:scale-105 relative
                      ${isToday 
                        ? 'ring-1 ring-blue-400' 
                        : ''
                      }
                      ${isCompleted 
                        ? 'bg-emerald-500 text-white shadow-sm' 
                        : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span>{day}</span>
                    )}
                    
                    {isToday && !isCompleted && (
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )
}

export default WorkingCalendar;