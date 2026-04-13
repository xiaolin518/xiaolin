import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart3, Code, Award, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

const Home = () => {
  const { fetchCourses, courses } = useStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // 课程分类数据
  const categories = [
    { id: 1, name: 'Python基础', icon: <Code className="h-8 w-8" />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: '数据分析', icon: <BarChart3 className="h-8 w-8" />, color: 'bg-green-100 text-green-600' },
    { id: 3, name: '数据可视化', icon: <BarChart3 className="h-8 w-8" />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, name: '机器学习', icon: <BarChart3 className="h-8 w-8" />, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                掌握数据分析技能，开启职业新篇章
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                专为商务数据分析与应用专业学生设计的在线教育平台，提供系统化的课程体系和互动式学习体验。
              </p>
              <div className="flex space-x-4">
                <Link to="/courses" className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
                  浏览课程
                </Link>
                <Link to="/register" className="px-6 py-3 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-colors">
                  免费注册
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-blue-600 font-semibold mb-4">学习路径</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">理论学习</h4>
                      <p className="text-sm text-gray-600">掌握数据分析基础理论</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full">
                      <Code className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">实践练习</h4>
                      <p className="text-sm text-gray-600">通过编码巩固知识点</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">测评评估</h4>
                      <p className="text-sm text-gray-600">检验学习成果</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 text-orange-600 p-2 rounded-full">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">成就激励</h4>
                      <p className="text-sm text-gray-600">获得徽章和等级提升</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">课程分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`${category.color} rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">探索{category.name}相关课程</p>
                <Link to="/courses" className="text-blue-600 font-medium flex items-center">
                  查看课程
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">热门课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.slice(0, 3).map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    {course.cover_image ? (
                      <img src={course.cover_image} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        课程封面
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{course.level}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <Link to={`/courses/${course.id}`} className="text-blue-600 font-medium flex items-center">
                      查看详情
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-blue-100 flex items-center justify-center">
                    <Code className="h-16 w-16 text-blue-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">初级</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Python基础课程</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">从零开始学习Python编程基础，掌握变量、数据类型、控制流等核心概念。</p>
                    <Link to="/courses/python-basics" className="text-blue-600 font-medium flex items-center">
                      查看详情
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
              查看全部课程
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">完整的课程体系</h3>
              <p className="text-gray-600">
                从Python基础到高级数据分析，涵盖商务数据分析所需的全部技能。
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">互动式学习模块</h3>
              <p className="text-gray-600">
                在线代码编辑器，实时代码执行，即时反馈学习效果。
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">成就激励系统</h3>
              <p className="text-gray-600">
                徽章、等级和学习统计，激发学习动力，追踪学习进度。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;