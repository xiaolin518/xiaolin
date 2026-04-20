import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, BookOpen, CheckCircle2, Terminal } from 'lucide-react';
import { projects } from '@/data/projects';
import PythonEditor from '@/components/PythonEditor';

const difficultyColors = {
  beginner: { bg: 'bg-green-100', text: 'text-green-700', label: '初级' },
  intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '中级' },
  advanced: { bg: 'bg-red-100', text: 'text-red-700', label: '高级' },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id || '0'));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">项目未找到</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const difficulty = difficultyColors[project.difficulty];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>返回</span>
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className={`${difficulty.bg} ${difficulty.text} px-3 py-1 rounded-full text-sm font-medium`}>
                {difficulty.label}
              </div>
              <span className="text-sm text-gray-500">{project.category}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">{project.name}</h1>
            <p className="text-lg text-gray-600">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">核心任务</h2>
              </div>
              <ul className="space-y-3">
                {project.coreTasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">预期产出</h2>
              </div>
              <ul className="space-y-2">
                {project.expectedOutput.map((output, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{output}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 px-6 py-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">实战代码</h2>
              </div>
              <div className="h-[700px]">
                <PythonEditor initialCode={project.initialCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}