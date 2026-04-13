import { create } from 'zustand';
import { supabase } from '../utils/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  cover_image: string;
}

interface Store {
  // 用户状态
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // 课程状态
  courses: Course[];
  currentCourse: Course | null;
  
  // 认证方法
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  
  // 课程方法
  fetchCourses: () => Promise<void>;
  setCurrentCourse: (course: Course | null) => void;
}

export const useStore = create<Store>((set, get) => ({
  // 初始状态
  user: null,
  isLoading: false,
  error: null,
  courses: [],
  currentCourse: null,
  
  // 注册
  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: 'student' }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        set({ user: {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || '',
          role: data.user.user_metadata?.role || 'student'
        }});
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 登录
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        set({ user: {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || '',
          role: data.user.user_metadata?.role || 'student'
        }});
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 登出
  signOut: async () => {
    set({ isLoading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 获取课程列表
  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*');
      
      if (error) throw error;
      set({ courses: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 设置当前课程
  setCurrentCourse: (course) => {
    set({ currentCourse: course });
  }
}));

// 监听认证状态变化
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    useStore.setState({
      user: {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata?.name || '',
        role: session.user.user_metadata?.role || 'student'
      }
    });
  } else {
    useStore.setState({ user: null });
  }
});