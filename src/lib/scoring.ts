/**
 * Scoring rules (shared by the quiz runner and the server):
 *  - Correct answer: 100 points
 *  - Speed bonus (timed quizzes only): up to +50, proportional to time left
 *  - Hint used on that question: -30
 *  - Wrong / skipped / timed out: 0
 */
export const BASE_POINTS = 100;
export const MAX_SPEED_BONUS = 50;
export const HINT_PENALTY = 30;

export function pointsFor(correct: boolean, hintUsed: boolean, timeTaken: number, timeLimit: number): number {
  if (!correct) return 0;
  let pts = BASE_POINTS;
  if (timeLimit > 0) {
    const left = Math.max(0, timeLimit - Math.max(0, timeTaken));
    pts += Math.round((MAX_SPEED_BONUS * left) / timeLimit);
  }
  if (hintUsed) pts -= HINT_PENALTY;
  return Math.max(10, pts);
}

export function maxScoreFor(total: number, timeLimit: number): number {
  return total * (BASE_POINTS + (timeLimit > 0 ? MAX_SPEED_BONUS : 0));
}

export function gradeFor(accuracy: number): { label: string; tone: "great" | "good" | "ok" | "low" } {
  if (accuracy >= 90) return { label: "Outstanding!", tone: "great" };
  if (accuracy >= 75) return { label: "Great job!", tone: "good" };
  if (accuracy >= 50) return { label: "Good effort", tone: "ok" };
  return { label: "Keep practising", tone: "low" };
}
