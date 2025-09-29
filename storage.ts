import { type QuizCategory, type Question, type QuizSession, type InsertQuizCategory, type InsertQuestion, type InsertQuizSession, type UpdateQuizSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Quiz Categories
  getQuizCategories(): Promise<QuizCategory[]>;
  getQuizCategory(id: string): Promise<QuizCategory | undefined>;
  
  // Questions
  getQuestionsByCategory(categoryId: string): Promise<Question[]>;
  getQuestion(id: string): Promise<Question | undefined>;
  
  // Quiz Sessions
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  getQuizSession(id: string): Promise<QuizSession | undefined>;
  updateQuizSession(id: string, updates: UpdateQuizSession): Promise<QuizSession | undefined>;
  
  // Statistics
  getUserStats(userId?: string): Promise<{
    totalQuizzes: number;
    averageScore: number;
    timeSpent: number;
    streak: number;
  }>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, QuizCategory>;
  private questions: Map<string, Question>;
  private sessions: Map<string, QuizSession>;

  constructor() {
    this.categories = new Map();
    this.questions = new Map();
    this.sessions = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize quiz categories
    const categories: QuizCategory[] = [
      {
        id: "science",
        name: "Science & Nature",
        description: "Test your knowledge of biology, chemistry, physics, and environmental science.",
        icon: "fas fa-atom",
        difficulty: "Intermediate",
        estimatedTime: 20,
        questionCount: 15,
      },
      {
        id: "history",
        name: "World History",
        description: "Explore major events, civilizations, and historical figures from around the globe.",
        icon: "fas fa-landmark",
        difficulty: "Advanced",
        estimatedTime: 25,
        questionCount: 20,
      },
      {
        id: "technology",
        name: "Technology & Computing",
        description: "Challenge yourself with questions about programming, AI, and modern technology.",
        icon: "fas fa-microchip",
        difficulty: "Expert",
        estimatedTime: 15,
        questionCount: 12,
      },
      {
        id: "literature",
        name: "Literature & Arts",
        description: "Test your knowledge of classic literature, poetry, and artistic movements.",
        icon: "fas fa-book",
        difficulty: "Intermediate",
        estimatedTime: 22,
        questionCount: 18,
      },
      {
        id: "geography",
        name: "Geography & Culture",
        description: "Explore world geography, countries, capitals, and cultural landmarks.",
        icon: "fas fa-globe",
        difficulty: "Beginner",
        estimatedTime: 18,
        questionCount: 16,
      },
      {
        id: "mixed",
        name: "Mixed Topics",
        description: "A challenging mix of questions from all categories for the ultimate test.",
        icon: "fas fa-random",
        difficulty: "All Levels",
        estimatedTime: 30,
        questionCount: 25,
      },
    ];

    categories.forEach(category => {
      this.categories.set(category.id, category);
    });

    // Initialize sample questions for science category
    const scienceQuestions: Question[] = [
      {
        id: "q1",
        categoryId: "science",
        questionText: "Which planet in our solar system has the most extensive ring system?",
        options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
        correctAnswer: 0,
        explanation: "Saturn has the most extensive and visible ring system of any planet in our solar system.",
        difficulty: "Intermediate",
      },
      {
        id: "q2",
        categoryId: "science",
        questionText: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum'.",
        difficulty: "Beginner",
      },
      {
        id: "q3",
        categoryId: "science",
        questionText: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        explanation: "The blue whale is the largest mammal and the largest animal ever known to have lived on Earth.",
        difficulty: "Beginner",
      },
      {
        id: "q4",
        categoryId: "science",
        questionText: "Which gas makes up approximately 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen makes up about 21%.",
        difficulty: "Intermediate",
      },
      {
        id: "q5",
        categoryId: "science",
        questionText: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
        correctAnswer: 1,
        explanation: "Mitochondria are often called the powerhouse of the cell because they produce ATP, the cell's main energy currency.",
        difficulty: "Beginner",
      },
    ];

    scienceQuestions.forEach(question => {
      this.questions.set(question.id, question);
    });

    // Add more questions for other categories (shortened for brevity)
    const historyQuestions: Question[] = [
      {
        id: "h1",
        categoryId: "history",
        questionText: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with the surrender of Japan in September.",
        difficulty: "Beginner",
      },
      {
        id: "h2",
        categoryId: "history",
        questionText: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctAnswer: 2,
        explanation: "George Washington was the first President of the United States, serving from 1789 to 1797.",
        difficulty: "Beginner",
      },
    ];

    historyQuestions.forEach(question => {
      this.questions.set(question.id, question);
    });
  }

  async getQuizCategories(): Promise<QuizCategory[]> {
    return Array.from(this.categories.values());
  }

  async getQuizCategory(id: string): Promise<QuizCategory | undefined> {
    return this.categories.get(id);
  }

  async getQuestionsByCategory(categoryId: string): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(q => q.categoryId === categoryId);
  }

  async getQuestion(id: string): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async createQuizSession(insertSession: InsertQuizSession): Promise<QuizSession> {
    const id = randomUUID();
    const session: QuizSession = {
      ...insertSession,
      id,
      userId: insertSession.userId || null,
      startedAt: new Date(),
      completedAt: null,
    };
    this.sessions.set(id, session);
    return session;
  }

  async getQuizSession(id: string): Promise<QuizSession | undefined> {
    return this.sessions.get(id);
  }

  async updateQuizSession(id: string, updates: UpdateQuizSession): Promise<QuizSession | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    const updatedSession = { ...session, ...updates };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async getUserStats(userId?: string): Promise<{
    totalQuizzes: number;
    averageScore: number;
    timeSpent: number;
    streak: number;
  }> {
    const userSessions = Array.from(this.sessions.values()).filter(s => 
      s.completedAt && (!userId || s.userId === userId)
    );

    const totalQuizzes = userSessions.length;
    const averageScore = totalQuizzes > 0 
      ? userSessions.reduce((sum, s) => sum + (s.score || 0), 0) / totalQuizzes 
      : 0;
    const timeSpent = userSessions.reduce((sum, s) => sum + (s.timeSpent || 0), 0);

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore),
      timeSpent: Math.round(timeSpent / 3600), // Convert to hours
      streak: 7, // Simplified streak calculation
    };
  }
}

export const storage = new MemStorage();
