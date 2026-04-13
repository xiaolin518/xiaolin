import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface Assessment {
  id: string;
  title: string;
  description: string;
  total_points: number;
  questions: Question[];
}

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string[];
  points: number;
  order_index: number;
}

const Assessment = () => {
  const { id, testId } = useParams<{ id: string; testId: string }>();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!testId) return;
      
      setIsLoading(true);
      try {
        // 获取测评信息
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', testId)
          .single();

        if (assessmentError) throw assessmentError;

        // 获取测评问题
        const { data: questionsData, error: questionsError } = await supabase
          .from('assessment_questions')
          .select('*')
          .eq('assessment_id', testId)
          .order('order_index', { ascending: true });

        if (questionsError) throw questionsError;

        const assessmentWithQuestions: Assessment = {
          ...assessmentData,
          questions: questionsData
        };

        setAssessment(assessmentWithQuestions);

        // 初始化答案对象
        const initialAnswers: Record<string, string[]> = {};
        questionsData.forEach(q => {
          initialAnswers[q.id] = [];
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching assessment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessment();
  }, [testId]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(item => item !== value)
        : [...currentAnswers, value];
      return {
        ...prev,
        [questionId]: newAnswers
      };
    });
  };

  const handleSubmit = () => {
    if (!assessment) return;

    // 计算得分
    let totalScore = 0;
    assessment.questions.forEach(question => {
      const userAnswer = answers[question.id] || [];
      const correctAnswer = question.correct_answer;
      
      // 检查答案是否正确
      const isCorrect = userAnswer.length === correctAnswer.length &&
        userAnswer.every(answer => correctAnswer.includes(answer));
      
      if (isCorrect) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setIsSubmitted(true);
    setShowResults(true);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">加载中...</div>;
  }

  if (!assessment) {
    return <div className="container mx-auto px-4 py-12 text-center">测评不存在</div>;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* 测评头部 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link to={`/courses/${id}`} className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
                <ChevronLeft className="h-4 w-4 mr-2" />
                返回课程
              </Link>
            </div>
            <h1 className="text-2xl font-bold mb-2">{assessment.title}</h1>
            <p className="text-gray-600 mb-4">{assessment.description}</p>
            <div className="flex items-center text-gray-600">
              <span className="mr-4">总分数: {assessment.total_points}</span>
              <span>问题数量: {assessment.questions.length}</span>
            </div>
          </div>

          {/* 测评结果 */}
          {showResults && (
            <div className="mb-8 p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold mb-2">测评结果</h2>
              <p className="text-gray-700 mb-2">你的得分: {score} / {assessment.total_points}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${(score / assessment.total_points) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* 问题列表 */}
          <div className="space-y-8">
            {assessment.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">问题 {index + 1} ({question.points}分)</h3>
                  <p className="text-gray-700">{question.question_text}</p>
                </div>
                
                {/* 选项 */}
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type={question.question_type === 'multiple' ? 'checkbox' : 'radio'}
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id]?.includes(option) || false}
                        onChange={() => handleAnswerChange(question.id, option)}
                        disabled={isSubmitted}
                        className="mr-2"
                      />
                      <label className={`cursor-pointer ${isSubmitted ? (answers[question.id]?.includes(option) ? (question.correct_answer.includes(option) ? 'text-green-600' : 'text-red-600') : (question.correct_answer.includes(option) ? 'text-green-600' : 'text-gray-700')) : 'text-gray-700'}`}>
                        {option}
                      </label>
                      {isSubmitted && question.correct_answer.includes(option) && (
                        <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 提交按钮 */}
          {!isSubmitted && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                提交答案
              </button>
            </div>
          )}

          {/* 提示信息 */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  提示：提交答案后，你将看到详细的测评结果和正确答案。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;