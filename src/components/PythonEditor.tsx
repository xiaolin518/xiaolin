import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Loader2 } from 'lucide-react';
import { loadPyodide, PyodideInterface } from 'pyodide';

interface PythonEditorProps {
  initialCode: string;
}

export default function PythonEditor({ initialCode }: PythonEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        const pyodideInstance = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
        });
        setPyodide(pyodideInstance);
        setOutput('🎉 Python 环境已准备就绪！\n\n现在可以开始编写和运行代码了。');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('❌ 加载 Python 环境失败。请刷新页面重试。');
      } finally {
        setIsLoading(false);
      }
    };

    initPyodide();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput(prev => prev + '\n⏳ 正在运行代码...\n');

    try {
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = captured_output = StringIO()
      `);

      await pyodide.runPythonAsync(code);

      const stdout = pyodide.runPython('captured_output.getvalue()');
      
      if (stdout) {
        setOutput(prev => prev + stdout + '\n✅ 代码执行完成！\n');
      } else {
        setOutput(prev => prev + '✅ 代码执行完成！\n');
      }
    } catch (error) {
      setOutput(prev => prev + `❌ 错误: ${error}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('🔄 代码已重置。\n\n现在可以开始编写和运行代码了。');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Python 代码编辑器</span>
          {isLoading && (
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>加载环境中...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            disabled={isLoading || isRunning}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            重置
          </button>
          <button
            onClick={runCode}
            disabled={isLoading || isRunning || !pyodide}
            className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isRunning ? '运行中...' : '运行代码'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-[500px]">
        <div className="flex-1 lg:w-1/2 border-r border-gray-200">
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>

        <div className="flex-1 lg:w-1/2 flex flex-col">
          <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
            输出结果
          </div>
          <div
            ref={outputRef}
            className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-y-auto"
          >
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}