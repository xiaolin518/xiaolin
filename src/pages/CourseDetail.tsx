import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Play, BookOpen, Code, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../utils/supabase';

interface Chapter {
  id: string;
  title: string;
  order_index: number;
  lessons?: Lesson[];
  exercises?: Exercise[];
  assessments?: Assessment[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string;
  order_index: number;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  order_index: number;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  total_points: number;
  order_index: number;
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, setCurrentCourse } = useStore();
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // 从本地状态获取课程信息
        const courseData = courses.find(c => c.id === id);
        if (courseData) {
          setCourse(courseData);
          setCurrentCourse(courseData);
        }

        // 获取章节信息
        const { data: chaptersData, error: chaptersError } = await supabase
          .from('chapters')
          .select('*')
          .eq('course_id', id)
          .order('order_index', { ascending: true });

        if (chaptersError) throw chaptersError;

        if (chaptersData) {
          // 为每个章节获取内容
          const chaptersWithContent = await Promise.all(
            chaptersData.map(async (chapter) => {
              // 获取课程内容
              const { data: lessons, error: lessonsError } = await supabase
                .from('lessons')
                .select('*')
                .eq('chapter_id', chapter.id)
                .order('order_index', { ascending: true });

              if (lessonsError) throw lessonsError;

              // 获取练习
              const { data: exercises, error: exercisesError } = await supabase
                .from('exercises')
                .select('*')
                .eq('chapter_id', chapter.id)
                .order('order_index', { ascending: true });

              if (exercisesError) throw exercisesError;

              // 获取测评
              const { data: assessments, error: assessmentsError } = await supabase
                .from('assessments')
                .select('*')
                .eq('chapter_id', chapter.id)
                .order('order_index', { ascending: true });

              if (assessmentsError) throw assessmentsError;

              return {
                ...chapter,
                lessons,
                exercises,
                assessments
              };
            })
          );

          setChapters(chaptersWithContent);
        }
      } catch (error) {
        console.error('Error fetching course detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id, courses, setCurrentCourse]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">加载中...</div>;
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-12 text-center">课程不存在</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-64 md:h-auto bg-gray-200">
              {course.cover_image ? (
                <img src={course.cover_image} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  课程封面
                </div>
              )}
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{course.level}</span>
                <span className="ml-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">{course.category}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              <div className="flex space-x-6 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">预计学习时间: 20小时</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">6个章节</span>
                </div>
              </div>
              <Link to={`/courses/${course.id}/learn/${chapters[0]?.id || ''}`} className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
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
            {chapters.map((chapter, index) => (
              <div key={chapter.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <h3 className="text-xl font-semibold mb-4">第{index + 1}章: {chapter.title}</h3>
                <div className="space-y-3 pl-4">
                  {/* 课程内容 */}
                  {chapter.lessons?.map((lesson) => (
                    <div key={lesson.id} className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <Link to={`/courses/${course.id}/learn/${chapter.id}?lessonId=${lesson.id}`} className="text-gray-700 hover:text-blue-600">
                        {lesson.title}
                      </Link>
                    </div>
                  ))}
                  
                  {/* 练习 */}
                  {chapter.exercises?.map((exercise) => (
                    <div key={exercise.id} className="flex items-center space-x-3">
                      <Code className="h-5 w-5 text-green-600" />
                      <Link to={`/courses/${course.id}/practice/${exercise.id}`} className="text-gray-700 hover:text-blue-600">
                        {exercise.title}
                      </Link>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{exercise.difficulty}</span>
                    </div>
                  ))}
                  
                  {/* 测评 */}
                  {chapter.assessments?.map((assessment) => (
                    <div key={assessment.id} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <Link to={`/courses/${course.id}/assessment/${assessment.id}`} className="text-gray-700 hover:text-blue-600">
                        {assessment.title}
                      </Link>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{assessment.total_points}分</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 课程介绍 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">课程介绍</h2>
          <p className="text-gray-600 mb-4">
            本课程旨在帮助商务数据分析与应用专业的学生掌握Python数据分析的核心技能，从基础语法到高级应用，
            全面覆盖数据分析的各个环节。通过理论学习、实践练习和测评评估，
            让学生能够熟练运用Python进行数据处理、分析和可视化，为未来的职业发展打下坚实基础。
          </p>
          <h3 className="text-xl font-semibold mb-2">学习目标</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>掌握Python基础语法和数据分析库的使用</li>
            <li>能够独立完成数据清洗、转换和分析</li>
            <li>熟练使用数据可视化工具展示分析结果</li>
            <li>具备解决实际商务数据分析问题的能力</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;