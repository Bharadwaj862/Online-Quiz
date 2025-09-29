import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizCategories = pgTable("quiz_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  difficulty: text("difficulty").notNull(),
  estimatedTime: integer("estimated_time").notNull(), // in minutes
  questionCount: integer("question_count").notNull(),
});

export const questions = pgTable("questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  categoryId: varchar("category_id").notNull(),
  questionText: text("question_text").notNull(),
  options: jsonb("options").notNull().$type<string[]>(),
  correctAnswer: integer("correct_answer").notNull(), // 0-based index
  explanation: text("explanation"),
  difficulty: text("difficulty").notNull(),
});

export const quizSessions = pgTable("quiz_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  categoryId: varchar("category_id").notNull(),
  userId: varchar("user_id"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  answers: jsonb("answers").notNull().$type<Record<string, number>>(),
  markedForReview: jsonb("marked_for_review").notNull().$type<string[]>(),
  timeSpent: integer("time_spent"), // in seconds
  score: integer("score"),
  totalQuestions: integer("total_questions").notNull(),
});

export const insertQuizCategorySchema = createInsertSchema(quizCategories).omit({
  id: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
  startedAt: true,
});

export const updateQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
  categoryId: true,
  startedAt: true,
}).partial();

export type QuizCategory = typeof quizCategories.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type QuizSession = typeof quizSessions.$inferSelect;
export type InsertQuizCategory = z.infer<typeof insertQuizCategorySchema>;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type UpdateQuizSession = z.infer<typeof updateQuizSessionSchema>;
