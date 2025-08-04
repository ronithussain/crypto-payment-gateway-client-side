// import React, { useState } from 'react';
// import { Calendar, Share2, User, CheckCircle, Clock, Gift } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useData } from '../../contexts/DataContext';

// const TaskCenter = () => {
//   const { user, updateUser } = useAuth();
//   const { tasks, completeTask } = useData();
//   const [completingTask, setCompletingTask] = useState(null);

//   const getTaskIcon = (iconName) => {
//     const icons = {
//       Calendar,
//       Share2,
//       User
//     };
//     const IconComponent = icons[iconName] || Gift;
//     return IconComponent;
//   };

//   const isTaskCompleted = (taskId) => {
//     return user?.completedTasks?.includes(taskId) || false;
//   };

//   const handleCompleteTask = async (task) => {
//     if (isTaskCompleted(task.id) || completingTask) return;

//     setCompletingTask(task.id);

//     // Simulate task completion process
//     setTimeout(() => {
//       const success = completeTask(user.id, task.id);

//       if (success) {
//         // Update user's completed tasks
//         const updatedCompletedTasks = [...(user.completedTasks || []), task.id];
//         const updatedBalance = user.balance + task.reward;

//         updateUser({
//           completedTasks: updatedCompletedTasks,
//           balance: updatedBalance,
//           totalProfit: user.totalProfit + task.reward
//         });

//         // Show success message
//         alert(`Task completed! You earned $${task.reward.toFixed(2)}`);
//       }

//       setCompletingTask(null);
//     }, 2000);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//       <div className="text-center mb-6">
//         <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
//           <Gift className="h-8 w-8 text-white" />
//         </div>
//         <h3 className="text-xl font-bold text-gray-900">Task Center</h3>
//         <p className="text-gray-600 mt-2">Complete tasks to earn extra rewards</p>
//       </div>

//       <div className="space-y-4">
//         {tasks.map((task) => {
//           const IconComponent = getTaskIcon(task.icon);
//           const completed = isTaskCompleted(task.id);
//           const isCompleting = completingTask === task.id;

//           return (
//             <div
//               key={task.id}
//               className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                 completed
//                   ? 'bg-emerald-50 border-emerald-200'
//                   : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className={`p-3 rounded-full ${task.color}`}>
//                     <IconComponent className="h-6 w-6 text-white" />
//                   </div>

//                   <div>
//                     <h4 className="font-semibold text-gray-900">{task.title}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{task.description}</p>
//                     <div className="flex items-center space-x-2 mt-2">
//                       <span className="text-sm font-medium text-emerald-600">
//                         Reward: ${task.reward.toFixed(2)}
//                       </span>
//                       <span className={`px-2 py-1 text-xs rounded-full font-medium ${
//                         task.type === 'daily' 
//                           ? 'bg-blue-100 text-blue-800'
//                           : task.type === 'social'
//                           ? 'bg-purple-100 text-purple-800'
//                           : 'bg-emerald-100 text-emerald-800'
//                       }`}>
//                         {task.type}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   {completed ? (
//                     <div className="flex items-center space-x-2 text-emerald-600">
//                       <CheckCircle className="h-6 w-6" />
//                       <span className="font-medium">Completed</span>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleCompleteTask(task)}
//                       disabled={isCompleting}
//                       className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                         isCompleting
//                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                           : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
//                       }`}
//                     >
//                       {isCompleting ? (
//                         <div className="flex items-center space-x-2">
//                           <Clock className="h-4 w-4 animate-spin" />
//                           <span>Processing...</span>
//                         </div>
//                       ) : (
//                         'Complete Task'
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
//         <h4 className="font-medium text-gray-900 mb-2">Task Guidelines</h4>
//         <ul className="text-sm text-gray-700 space-y-1">
//           <li>• Daily tasks reset every 24 hours</li>
//           <li>• Social tasks require verification</li>
//           <li>• Profile tasks are one-time completion</li>
//           <li>• Rewards are added instantly to your balance</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TaskCenter;

import { Calendar, Share2, User, CheckCircle, Clock, Gift } from 'lucide-react';

const DailyProfitGenerator = () => {
    const staticTasks = [
        {
            id: 1,
            title: 'Complete Your Profile',
            description: 'Fill out your profile to get started',
            reward: 2.5,
            type: 'profile',
            icon: User,
            color: 'bg-emerald-500',
            completed: true,
        },
        {
            id: 2,
            title: 'Join Our Telegram',
            description: 'Follow us on Telegram for latest updates',
            reward: 1.0,
            type: 'social',
            icon: Share2,
            color: 'bg-purple-500',
            completed: false,
        },
        {
            id: 3,
            title: 'Login Daily',
            description: 'Log in every day to earn rewards',
            reward: 0.5,
            type: 'daily',
            icon: Calendar,
            color: 'bg-blue-500',
            completed: false,
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
                    <Gift className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Task Center</h3>
                <p className="text-gray-600 mt-2">Complete tasks to earn extra rewards</p>
            </div>

            <div className="space-y-4">
                {staticTasks.map((task) => {
                    const Icon = task.icon;
                    return (
                        <div
                            key={task.id}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${task.completed
                                    ? 'bg-emerald-50 border-emerald-200'
                                    : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            <div className="flex flex-col  md:flex-row lg:items-center justify-between sm:gap-0 gap-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-4 gap-2">
                                    <div className={`p-3 rounded-full ${task.color}`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">{task.title} sdf</h4>
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-sm font-medium text-emerald-600">
                                                Reward: ${task.reward.toFixed(2)}
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full font-medium ${task.type === 'daily'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : task.type === 'social'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-emerald-100 text-emerald-800'
                                                    }`}
                                            >
                                                {task.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    {task.completed ? (
                                        <div className="flex items-center space-x-2 text-emerald-600">
                                            <CheckCircle className="h-6 w-6" />
                                            <span className="font-medium">Completed</span>
                                        </div>
                                    ) : (
                                        <button className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                                            Complete Task
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Task Guidelines</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Daily tasks reset every 24 hours</li>
                    <li>• Social tasks require verification</li>
                    <li>• Profile tasks are one-time completion</li>
                    <li>• Rewards are added instantly to your balance</li>
                </ul>
            </div>
        </div>
    );
};

export default DailyProfitGenerator;
