import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle, AlertCircle, Copy, Code } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  solution: string;
}

const Practice = () => {
  const { id, exerciseId } = useParams<{ id: string; exerciseId: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  // 加载Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodideInstance = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Error loading Pyodide:', error);
      }
    };

    loadPyodide();
  }, []);

  // 获取练习信息
  useEffect(() => {
    const fetchExercise = async () => {
      if (!exerciseId) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .eq('id', exerciseId)
          .single();

        if (error) throw error;

        setExercise(data);
        setCode(data.solution || '');
      } catch (error) {
        console.error('Error fetching exercise:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  // 运行代码
  const runCode = async () => {
    if (!pyodide || !code) return;

    setIsExecuting(true);
    setResult('');

    try {
      // 运行代码
      const output = await pyodide.runPythonAsync(code);
      setResult(output || '代码执行成功');
    } catch (error: any) {
      setResult(`错误: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  // 复制代码
  const copyCode = () => {
    if (codeRef.current) {
      codeRef.current.select();
      document.execCommand('copy');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">加载中...</div>;
  }

  if (!exercise) {
    return <div className="container mx-auto px-4 py-12 text-center">练习不存在</div>;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧练习描述 */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${exercise.difficulty === 'easy' ? 'bg-green-100 text-green-600' : exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                  {exercise.difficulty === 'easy' ? '简单' : exercise.difficulty === 'medium' ? '中等' : '困难'}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
              <div className="text-gray-700 mb-6">
                {exercise.description}
              </div>
              <Link to={`/courses/${id}`} className="flex items-center text-blue-600 hover:text-blue-700">
                <ChevronLeft className="h-4 w-4 mr-2" />
                返回课程
              </Link>
            </div>
          </div>

          {/* 右侧代码编辑器 */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* 编辑器头部 */}
              <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-200">
                <div className="flex items-center">
                  <Code className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="font-medium">Python 代码编辑器</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={copyCode} 
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={runCode} 
                    disabled={isExecuting}
                    className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {isExecuting ? '运行中...' : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        运行代码
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 代码编辑区 */}
              <div className="p-4">
                <textarea
                  ref={codeRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-80 p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="在此输入Python代码..."
                />
              </div>

              {/* 运行结果 */}
              <div className="border-t border-gray-200">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium">
                  运行结果
                </div>
                <div className="p-4 font-mono text-sm bg-gray-50 min-h-[100px]">
                  {result ? (
                    <pre className="whitespace-pre-wrap">{result}</pre>
                  ) : (
                    <p className="text-gray-500">运行代码查看结果</p>
                  )}
                </div>
              </div>
            </div>

            {/* 提示信息 */}
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    提示：你可以修改代码并运行，查看不同的结果。完成练习后，你可以返回课程继续学习。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;