import { useState } from 'react';
import { useStore } from '../store/useStore';
import { UserCircle, Edit, Save, BookOpen, Settings, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    return <div className="container mx-auto px-4 py-12 text-center">请登录查看个人信息</div>;
  }

  const handleSave = () => {
    // 这里可以添加更新用户信息的逻辑
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">个人中心</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧个人资料 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <UserCircle className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm mt-2">{user.role === 'student' ? '学生' : '教师'}</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  编辑资料
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  退出登录
                </button>
              </div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="lg:col-span-2">
            {/* 个人资料编辑 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <UserCircle className="h-6 w-6 mr-2 text-blue-600" />
                个人资料
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">姓名</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">邮箱</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      保存
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">姓名</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">邮箱</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">角色</span>
                    <span className="font-medium">{user.role === 'student' ? '学生' : '教师'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">注册时间</span>
                    <span className="font-medium">2026-01-01</span>
                  </div>
                </div>
              )}
            </div>

            {/* 学习记录 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                学习记录
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                  <div>
                    <h3 className="font-medium">Python数据分析基础</h3>
                    <p className="text-sm text-gray-600">最近学习: 2026-04-01</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">进度: 60%</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                  <div>
                    <h3 className="font-medium">数据可视化实战</h3>
                    <p className="text-sm text-gray-600">最近学习: 2026-03-28</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">进度: 30%</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 设置 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-2 text-blue-600" />
                设置
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">通知设置</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">深色模式</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">自动播放视频</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;