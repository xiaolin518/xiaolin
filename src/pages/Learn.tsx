import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Fullscreen, BookOpen } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string;
  order_index: number;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

const Learn = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const [searchParams] = useSearchParams();
  const [lessonId] = useState(searchParams.get('lessonId'));
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchChapterAndLesson = async () => {
      if (!chapterId) return;
      
      setIsLoading(true);
      try {
        // 获取章节信息
        const { data: chapterData, error: chapterError } = await supabase
          .from('chapters')
          .select('*')
          .eq('id', chapterId)
          .single();

        if (chapterError) throw chapterError;

        // 获取章节下的所有课程内容
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('chapter_id', chapterId)
          .order('order_index', { ascending: true });

        if (lessonsError) throw lessonsError;

        const chapterWithLessons: Chapter = {
          ...chapterData,
          lessons: lessonsData
        };

        setChapter(chapterWithLessons);

        // 确定当前课程内容
        let lessonToShow: Lesson;
        if (lessonId) {
          lessonToShow = lessonsData.find(l => l.id === lessonId) || lessonsData[0];
        } else {
          lessonToShow = lessonsData[0];
        }

        setCurrentLesson(lessonToShow);
      } catch (error) {
        console.error('Error fetching chapter and lesson:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapterAndLesson();
  }, [chapterId, lessonId]);

  const handleVideoToggle = () => {
    setVideoPlaying(!videoPlaying);
  };

  const handleVolumeToggle = () => {
    setVolume(volume > 0 ? 0 : 1);
  };

  const handleFullscreenToggle = () => {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if ((videoContainer as any).mozRequestFullScreen) {
        (videoContainer as any).mozRequestFullScreen();
      } else if ((videoContainer as any).webkitRequestFullscreen) {
        (videoContainer as any).webkitRequestFullscreen();
      } else if ((videoContainer as any).msRequestFullscreen) {
        (videoContainer as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">加载中...</div>;
  }

  if (!chapter || !currentLesson) {
    return <div className="container mx-auto px-4 py-12 text-center">内容不存在</div>;
  }

  const currentLessonIndex = chapter.lessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentLessonIndex > 0 ? chapter.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < chapter.lessons.length - 1 ? chapter.lessons[currentLessonIndex + 1] : null;

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧章节导航 */}
          <div className="lg:w-1/4 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">章节内容</h2>
            <ul className="space-y-2">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link 
                    to={`/courses/${id}/learn/${chapterId}?lessonId=${lesson.id}`} 
                    className={`flex items-center p-2 rounded-md transition-colors ${currentLesson.id === lesson.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{lesson.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 右侧学习内容 */}
          <div className="lg:w-3/4">
            {/* 视频播放器 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div id="video-container" className="relative aspect-video bg-black">
                {currentLesson.video_url ? (
                  <video 
                    src={currentLesson.video_url} 
                    className="w-full h-full"
                    controls
                    autoPlay={videoPlaying}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    视频内容
                  </div>
                )}
                {/* 视频控制 overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <button 
                    onClick={handleVideoToggle} 
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 text-white transition-colors"
                  >
                    {videoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-4">
                  <button 
                    onClick={handleVolumeToggle} 
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-colors"
                  >
                    {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={handleFullscreenToggle} 
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-colors"
                  >
                    <Fullscreen className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 课程内容 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>
              <div className="text-gray-700">
                {currentLesson.content || (
                  <p>课程内容正在加载中...</p>
                )}
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between">
              {prevLesson ? (
                <Link 
                  to={`/courses/${id}/learn/${chapterId}?lessonId=${prevLesson.id}`} 
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  上一课
                </Link>
              ) : (
                <div className="w-32"></div>
              )}
              {nextLesson ? (
                <Link 
                  to={`/courses/${id}/learn/${chapterId}?lessonId=${nextLesson.id}`} 
                  className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                >
                  下一课
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              ) : (
                <Link 
                  to={`/courses/${id}`} 
                  className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                >
                  完成本章
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;