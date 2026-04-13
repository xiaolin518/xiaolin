import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Play, BookOpen, Code, CheckCircle, Clock } from 'lucide-react';

const PythonBasics = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载课程数据
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">加载中...</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-64 md:h-auto bg-blue-100">
              <div className="w-full h-full flex items-center justify-center">
                <Code className="h-32 w-32 text-blue-600" />
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">初级</span>
                <span className="ml-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Python基础</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">Python基础课程</h1>
              <p className="text-gray-600 mb-6">
                从零开始学习Python编程基础，掌握变量、数据类型、控制流等核心概念，为数据分析打下坚实基础。
              </p>
              <div className="flex space-x-6 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">预计学习时间: 10小时</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">4个章节</span>
                </div>
              </div>
              <Link to="/courses/python-basics/learn/chapter-1" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
                开始学习
                <Play className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* 课程大纲 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">课程大纲</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-4">第1章: Python简介与环境搭建</h3>
              <div className="space-y-3 pl-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-1" className="text-gray-700 hover:text-blue-600">
                    Python简介
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-green-600" />
                  <Link to="/courses/python-basics/practice/exercise-1" className="text-gray-700 hover:text-blue-600">
                    环境搭建练习
                  </Link>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">简单</span>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-4">第2章: Python基础语法</h3>
              <div className="space-y-3 pl-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-2" className="text-gray-700 hover:text-blue-600">
                    变量与数据类型
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-2" className="text-gray-700 hover:text-blue-600">
                    控制流语句
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-green-600" />
                  <Link to="/courses/python-basics/practice/exercise-2" className="text-gray-700 hover:text-blue-600">
                    基础语法练习
                  </Link>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">中等</span>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-4">第3章: 函数与模块</h3>
              <div className="space-y-3 pl-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-3" className="text-gray-700 hover:text-blue-600">
                    函数定义与调用
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-3" className="text-gray-700 hover:text-blue-600">
                    模块与包
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-green-600" />
                  <Link to="/courses/python-basics/practice/exercise-3" className="text-gray-700 hover:text-blue-600">
                    函数练习
                  </Link>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">中等</span>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-4">第4章: 数据结构与文件操作</h3>
              <div className="space-y-3 pl-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-4" className="text-gray-700 hover:text-blue-600">
                    列表与字典
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <Link to="/courses/python-basics/learn/chapter-4" className="text-gray-700 hover:text-blue-600">
                    文件读写操作
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <Link to="/courses/python-basics/assessment/test-1" className="text-gray-700 hover:text-blue-600">
                    章节测试
                  </Link>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">10分</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 课程介绍 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">课程介绍</h2>
          <p className="text-gray-600 mb-4">
            本课程旨在帮助商务数据分析与应用专业的学生掌握Python编程基础，为后续的数据分析课程打下坚实的基础。
            通过理论学习和实践练习，学生将掌握Python的核心概念和基本语法，能够编写简单的Python程序解决实际问题。
          </p>
          <h3 className="text-xl font-semibold mb-2">学习目标</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>了解Python的基本概念和应用场景</li>
            <li>掌握Python的基础语法和数据类型</li>
            <li>学会使用函数和模块组织代码</li>
            <li>熟悉Python的基本数据结构</li>
            <li>能够进行简单的文件读写操作</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PythonBasics;