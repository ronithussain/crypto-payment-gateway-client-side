import { useState } from 'react';
import { User, CheckCircle, Clock, Gift } from 'lucide-react';
import { FaTelegram } from 'react-icons/fa';
import { BsCalendarRangeFill } from 'react-icons/bs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useDbUser from '../../../Hooks/useDbUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast'; // Optional: better notifications

const TaskCenter = () => {
    const { dbUser } = useDbUser();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [completingTask, setCompletingTask] = useState(null);

    // User tasks data fetch করো
    const { data: userTasksData = {}, isLoading } = useQuery({
        queryKey: ['userTasks', dbUser?._id],
        enabled: !!dbUser?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/userTasks/${dbUser._id}`);
            return res.data;
        },
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
    });

    // Static tasks configuration
    const staticTasks = [
        {
            id: 'profile_complete',
            title: 'Complete Your Profile',
            description: 'Fill out your profile to get started',
            reward: 2.5,
            type: 'profile',
            icon: User,
            color: 'bg-emerald-500',
            oneTime: true,
        },
        {
            id: 'telegram_join',
            title: 'Join Our Telegram',
            description: 'Follow us on Telegram for latest updates',
            reward: 1.0,
            type: 'social',
            icon: FaTelegram,
            color: 'bg-[#2B7FFF]',
            oneTime: true,
            telegramLink: 'https://t.me/datapcl', // আপনার আসল Telegram link দিন
        },
        {
            id: 'daily_login',
            title: 'Login Daily',
            description: 'Log in every day to earn rewards',
            reward: 0.5,
            type: 'daily',
            icon: BsCalendarRangeFill,
            color: 'bg-blue-500',
            oneTime: false,
        },
    ];

    // Task complete করার mutation
    const completeTaskMutation = useMutation({
        mutationFn: async ({ taskId, reward }) => {
            const res = await axiosSecure.post('/completeTask', {
                userId: dbUser._id,
                taskId,
                reward,
                timestamp: new Date().toISOString(),
            });
            return res.data;
        },
        onSuccess: (data, variables) => {
            // Data refetch করো
            queryClient.invalidateQueries(['userTasks', dbUser?._id]);
            queryClient.invalidateQueries(['userBalance', dbUser?._id]);
            
            // Success message
            toast.success(`Task completed! You earned $${variables.reward.toFixed(2)}`);
            // alert(`Task completed! You earned $${variables.reward.toFixed(2)}`);
        },
        onError: (error) => {
            console.error('Error completing task:', error);
            const errorMsg = error.response?.data?.error || 'Failed to complete task';
            toast.error(errorMsg);
            // alert(errorMsg);
        }
    });

    // Task completed কিনা check করো
    const isTaskCompleted = (taskId) => {
        const completedTasks = userTasksData?.completedTasks || [];
        
        if (taskId === 'daily_login') {
            // Daily task এর জন্য 24 hours check করো
            const lastCompleted = completedTasks.find(task => task.taskId === taskId);
            if (!lastCompleted) return false;
            
            const lastCompletedTime = new Date(lastCompleted.timestamp).getTime();
            const now = new Date().getTime();
            const timeDiff = now - lastCompletedTime;
            
            return timeDiff < (24 * 60 * 60 * 1000); // 24 hours
        }
        
        // One-time tasks এর জন্য
        return completedTasks.some(task => task.taskId === taskId);
    };

    // Task complete handle করো
    const handleCompleteTask = async (task) => {
        if (isTaskCompleted(task.id) || completingTask) return;

        setCompletingTask(task.id);

        try {
            // Telegram task এর জন্য special handling
            if (task.id === 'telegram_join') {
                // Telegram link খোলো
                window.open(task.telegramLink, '_blank');
                
                // 2 second delay verification এর জন্য
                setTimeout(async () => {
                    await completeTaskMutation.mutateAsync({
                        taskId: task.id,
                        reward: task.reward,
                    });
                    setCompletingTask(null);
                }, 2000);
                
                return;
            }

            // বাকি tasks immediately complete করো
            await completeTaskMutation.mutateAsync({
                taskId: task.id,
                reward: task.reward,
            });

            setCompletingTask(null);

        } catch {
            // console.log(error);
            setCompletingTask(null);
        }
    };

    // Daily task reset time calculate করো
    const getTimeUntilReset = (taskId) => {
        if (taskId !== 'daily_login') return '';
        
        const completedTasks = userTasksData?.completedTasks || [];
        const lastCompleted = completedTasks.find(task => task.taskId === taskId);
        
        if (!lastCompleted) return '';
        
        const lastCompletedTime = new Date(lastCompleted.timestamp).getTime();
        const now = new Date().getTime();
        const timeDiff = now - lastCompletedTime;
        const timeLeft = (24 * 60 * 60 * 1000) - timeDiff;
        
        if (timeLeft <= 0) return '';
        
        const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        
        return `Resets in ${hoursLeft}h ${minutesLeft}m`;
    };

    // Loading state
    if (isLoading) {
        return (
            <div className='max-w-7xl mx-auto sm:px-0 px-2'>
                <div className="bg-white rounded-xl shadow-lg sm:p-6 p-4 border border-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading tasks...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="bg-white rounded-xl shadow-lg sm:p-6 p-4 border border-gray-100">
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
                        const completed = isTaskCompleted(task.id);
                        const isCompleting = completingTask === task.id;
                        const timeUntilReset = getTimeUntilReset(task.id);
                        
                        // Daily task এর জন্য available কিনা check করো
                        const canComplete = task.type === 'daily' ? !completed : !completed;

                        return (
                            <div
                                key={task.id}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                    completed
                                        ? 'bg-emerald-50 border-emerald-200'
                                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row lg:items-center justify-between sm:gap-0 gap-4">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-4 gap-2">
                                        <div className={`p-3 rounded-full ${task.color}`}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className="text-sm font-medium text-emerald-600">
                                                    Reward: ${task.reward.toFixed(2)}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                                                        task.type === 'daily'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : task.type === 'social'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-emerald-100 text-emerald-800'
                                                    }`}
                                                >
                                                    {task.type}
                                                </span>
                                                {timeUntilReset && (
                                                    <span className="text-xs text-orange-600 font-medium">
                                                        {timeUntilReset}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        {completed && task.type !== 'daily' ? (
                                            <div className="flex items-center space-x-2 text-emerald-600">
                                                <CheckCircle className="h-6 w-6" />
                                                <span className="font-medium">Completed</span>
                                            </div>
                                        ) : completed && task.type === 'daily' ? (
                                            <div className="flex items-center space-x-2 text-orange-600">
                                                <Clock className="h-6 w-6" />
                                                <span className="font-medium">Completed Today</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleCompleteTask(task)}
                                                disabled={isCompleting || !canComplete}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                    isCompleting || !canComplete
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                                                }`}
                                            >
                                                {isCompleting ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="h-4 w-4 animate-spin" />
                                                        <span>
                                                            {task.id === 'telegram_join' 
                                                                ? 'Verifying...' 
                                                                : 'Processing...'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>
                                                        {task.id === 'telegram_join' 
                                                            ? 'Join & Complete' 
                                                            : 'Complete Task'}
                                                    </span>
                                                )}
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
                        <li>• Daily tasks reset every 24 hours automatically</li>
                        <li>• Social tasks require verification (join our Telegram channel)</li>
                        <li>• Profile tasks are one-time completion only</li>
                        <li>• Rewards are added instantly to your main balance</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskCenter;