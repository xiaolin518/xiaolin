import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Trophy, Award, BarChart3, CheckCircle, Star } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface Achievement {
  totalCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessons: number;
  totalExercises: number;
  completedExercises: number;
  totalAssessments: number;
  completedAssessments: number;
  totalScore: number;
  level: number;
  badges: Badge[];
}

const Achievements = () => {
  const { user } = useStore();
  const [achievement, setAchievement] = useState<Achievement>({
    totalCourses: 0,
    completedCourses: 0,
    totalLessons: 0,
    completedLessons: 0,
    totalExercises: 0,
    completedExercises: 0,
    totalAssessments: 0,
    completedAssessments: 0,
    totalScore: 0,
    level: 1,
    badges: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        // 模拟数据，实际应该从数据库获取
        const mockBadges: Badge[] = [
          { id: '1', name: '初学者', description: '完成第一门课程', icon: '🎯', earned: true },
          { id: '2', name: '进阶者', description: '完成5门课程', icon: '🌟', earned: false },
          { id: '3', name: '专家', description: '完成10门课程', icon: '🏆', earned: false },
          { id: '4', name: '代码大师', description: '完成20个编程练习', icon: '💻', earned: false },
          { id: '5', name: '测试达人', description: '通过10次测评', icon: '✅', earned: false },
          { id: '6', name: '学习先锋', description: '连续学习7天', icon: '🔥', earned: false },
        ];

        setAchievement({
          totalCourses: 10,
          completedCourses: 2,
          totalLessons: 60,
          completedLessons: 12,
          totalExercises: 40,
          completedExercises: 8,
          totalAssessments: 15,
          completedAssessments: 3,
          totalScore: 250,
          level: 2,
          badges: mockBadges
        });
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">加载中...</div>;
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-12 text-center">请登录查看成就</div>;
  }

  // 计算总体进度
  const overallProgress = ((achievement.completedCourses / achievement.totalCourses) * 100).toFixed(0);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">成就系统</h1>

        {/* 等级和总体进度 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Trophy className="h-12 w-12 text-yellow-500 mr-4" />
              <div>
                <h2 className="text-2xl font-bold">等级 {achievement.level}</h2>
                <p className="text-gray-600">学习达人</p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">总体进度</span>
                <span className="font-medium">{overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 学习统计 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            学习统计
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 mb-1">课程总数</p>
              <p className="text-2xl font-bold">{achievement.totalCourses}</p>
              <p className="text-green-600 text-sm">已完成 {achievement.completedCourses}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 mb-1">课程内容</p>
              <p className="text-2xl font-bold">{achievement.totalLessons}</p>
              <p className="text-green-600 text-sm">已完成 {achievement.completedLessons}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 mb-1">练习总数</p>
              <p className="text-2xl font-bold">{achievement.totalExercises}</p>
              <p className="text-green-600 text-sm">已完成 {achievement.completedExercises}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 mb-1">测评总数</p>
              <p className="text-2xl font-bold">{achievement.totalAssessments}</p>
              <p className="text-green-600 text-sm">已完成 {achievement.completedAssessments}</p>
            </div>
          </div>
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <div>
                <p className="font-medium">总得分</p>
                <p className="text-2xl font-bold">{achievement.totalScore}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 徽章系统 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-500" />
            徽章系统
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievement.badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`p-4 rounded-md text-center transition-all ${badge.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200 opacity-50'}`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
                {badge.earned && (
                  <div className="mt-2 flex justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;