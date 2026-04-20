export interface Project {
  id: number;
  name: string;
  description: string;
  coreTasks: string[];
  techStack: string[];
  expectedOutput: string[];
  initialCode: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
