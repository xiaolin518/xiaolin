import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, TrendingUp, Zap, Star, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';

const categories = [
  { id: 'all', name: '全部项目' },
  { id: '基础数据处理', name: '基础数据处理' },
  { id: '核心分析方法', name: '核心分析方法' },
  { id: '高级建模与可视化', name: '高级建模与可视化' },
  { id: '全流程综合', name: '全流程综合' },
];

const difficultyColors = {
  beginner: { bg: 'bg-green-100', text: 'text-green-700', label: '初级' },
  intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '中级' },
  advanced: { bg: 'bg-red-100', text: 'text-red-700', label: '高级' },
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              数据分析实战训练平台
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              专为商务数据分析与应用专业学生打造，10个实战项目助你掌握数据分析全流程
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <BookOpen className="h-5 w-5" />
                <span>10个实战项目</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Code2 className="h-5 w-5" />
                <span>在线 Python 环境</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5" />
                <span>从入门到精通</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">项目分类</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const difficulty = difficultyColors[project.difficulty];
            return (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`${difficulty.bg} ${difficulty.text} px-2.5 py-1 rounded-full text-xs font-medium`}>
                        {difficulty.label}
                      </div>
                      <span className="text-xs text-gray-500">{project.category}</span>
                    </div>
                    <Star className="h-4 w-4 text-gray-300 group-hover:text-yellow-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      项目 #{project.id}
                    </div>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      开始学习
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Zap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">该分类下暂无项目</p>
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 数据分析实战训练平台 | 专为商务数据分析与应用专业学生设计
          </p>
        </div>
      </div>
    </div>
  );
}