import { Check, Flame, Trophy, Target } from 'lucide-react';

interface CompletedDay {
  date: string;
}

const WorkingCalendar:React.FC= ()=> {
    const currentDate:string='2025-06-30'
    const completedDays:CompletedDay[] =[
      { date: '2025-06-04' },
      { date: '2025-06-05' },
      { date: '2025-06-06' },
      { date: '2025-06-07' },
      { date: '2025-06-08' },
      { date: '2025-06-10' },
      { date: '2025-06-11' },
      { date: '2025-06-12' },
      { date: '2025-06-13' },
      { date: '2025-06-14' },
      { date: '2025-06-15' },
    ]

    const completedDaysSet= new Set(completedDays.map(day => day.date))
    const calendarDays= []

    for(let day=1;day<=30;day++){
        calendarDays.push(day)
    }
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return (
        <div className="w-90 lg:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 mx-5">
          {/* Header with Title */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Daily Streak</h2>
            <div className="flex items-center space-x-1 text-emerald-600">
              <Flame className="lg:w-4 lg:h-4" />
              <span className="text-sm font-medium">0</span>
            </div>
          </div>
    
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Flame className="lg:w-3 lg:h-3 text-emerald-600" />
              </div>
              <p className="text-xs text-emerald-600 font-medium">Current</p>
              <p className="text-sm font-bold text-emerald-700">0</p>
            </div>
            
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="lg:w-3 lg:h-3 text-blue-600" />
              </div>
              <p className="text-xs text-blue-600 font-medium">Best</p>
              <p className="text-sm font-bold text-blue-700">26</p>
            </div>
            
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target className="lg:w-3 lg:h-3 text-purple-600" />
              </div>
              <p className="text-xs text-purple-600 font-medium">Total</p>
              <p className="text-sm font-bold text-purple-700">65</p>
            </div>
          </div>
    
          {/* Calendar Navigation */}
          <div className="flex items-center justify-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              June 2025
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
    
                const dateString = `${2025}-${String(5 + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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