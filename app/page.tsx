"use client";

import { useState, useEffect } from "react";
import { FileText, ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Question = {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
};

type QuestionsData = {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
};

type StartScreenProps = {
  onStart: () => void;
};

type QuizScreenProps = {
  onFinish: (finalScore: number, answers: string[][]) => void;
};

type ScoreScreenProps = {
  score: number;
  totalQuestions: number;
  userAnswers: string[][];
  questions: Question[];
  onRestart: () => void;
};

const QUESTIONS: QuestionsData = {
  status: "SUCCESS",
  data: {
    testId: "oihq2eo9h1029921-210-20112",
    questions: [
      {
        questionId: "b28af948-db8b-465e-92e6-3d42534c4533",
        question:
          "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
        questionType: "text",
        answerType: "options",
        options: ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
        correctAnswer: [
          "User-centric",
          "Incorporated",
          "Enhancing",
          "Cultivating",
        ],
      },
      {
        questionId: "6e6534ea-260a-4c26-96fd-f830b27601fb",
        question:
          "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
        questionType: "text",
        answerType: "options",
        options: ["Captivating", "Eclectic", "Garnering", "Blended"],
        correctAnswer: ["Eclectic", "Blended", "Captivating", "Garnering"],
      },
      {
        questionId: "7186e3da-0384-460a-af19-5a3984758e78",
        question:
          "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
        questionType: "text",
        answerType: "options",
        options: ["Pioneering", "Paving", "Overcoming", "Opened up"],
        correctAnswer: ["Pioneering", "Opened up", "Overcoming", "Paving"],
      },
      {
        questionId: "10cbe3c2-13bb-4973-a794-18bf309b0791",
        question:
          "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
        questionType: "text",
        answerType: "options",
        options: ["Improving", "Reducing", "Enabled", "Revolutionary"],
        correctAnswer: ["Revolutionary", "Enabled", "Improving", "Reducing"],
      },
      {
        questionId: "71ffe41e-8732-48e6-87f2-f84ea07eb060",
        question:
          "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
        questionType: "text",
        answerType: "options",
        options: ["Raising", "Massive", "Prompting", "Compromised"],
        correctAnswer: ["Massive", "Compromised", "Raising", "Prompting"],
      },
      {
        questionId: "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
        question:
          "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
        questionType: "text",
        answerType: "options",
        options: ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
        correctAnswer: [
          "Comprehensive",
          "Implemented",
          "Promoting",
          "Enhancing",
        ],
      },
      {
        questionId: "ed5e6e2d-8408-406e-be32-777ac26460e2",
        question:
          "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
        questionType: "text",
        answerType: "options",
        options: ["Implemented", "Setting", "Unwavering", "Reducing"],
        correctAnswer: ["Unwavering", "Implemented", "Reducing", "Setting"],
      },
      {
        questionId: "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
        question:
          "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
        questionType: "text",
        answerType: "options",
        options: ["Opening", "Improved", "Gradual", "Reducing"],
        correctAnswer: ["Gradual", "Improved", "Reducing", "Opening"],
      },
      {
        questionId: "d78effdf-88ab-4667-8115-3bfb2baa0a24",
        question:
          "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
        questionType: "text",
        answerType: "options",
        options: [
          "Providing",
          "Brought together",
          "Promoting",
          "International",
        ],
        correctAnswer: [
          "International",
          "Brought together",
          "Promoting",
          "Providing",
        ],
      },
      {
        questionId: "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
        question:
          "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
        questionType: "text",
        answerType: "options",
        options: ["Enhancing", "Improved", "Providing", "Widespread"],
        correctAnswer: ["Widespread", "Improved", "Enhancing", "Providing"],
      },
    ],
  },
};

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 space-y-8">
        {!started ? (
          <StartScreen onStart={() => setStarted(true)} />
        ) : !finished ? (
          <QuizScreen
            onFinish={(finalScore, answers) => {
              setScore(finalScore);
              setUserAnswers(answers);
              setFinished(true);
            }}
          />
        ) : (
          <ScoreScreen
            score={score}
            totalQuestions={QUESTIONS.data.questions.length}
            userAnswers={userAnswers}
            questions={QUESTIONS.data.questions}
            onRestart={() => {
              setStarted(false);
              setFinished(false);
              setScore(0);
              setUserAnswers([]);
            }}
          />
        )}
      </Card>
    </main>
  );
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Sentence Construction
        </h1>
        <p className="text-muted-foreground mt-2">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="space-y-2 text-center">
          <h2 className="font-medium">Time Per Question</h2>
          <p className="text-2xl font-bold">30 sec</p>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="font-medium">Total Questions</h2>
          <p className="text-2xl font-bold">
            {QUESTIONS.data.questions.length}
          </p>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="font-medium">Coins</h2>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      <Button onClick={onStart} className="w-full">
        Start
      </Button>
    </div>
  );
}

function QuizScreen({ onFinish }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [allAnswers, setAllAnswers] = useState<string[][]>([]);

  const currentQuestion = QUESTIONS.data.questions[currentQuestionIndex];
  const blanksCount = (currentQuestion.question.match(/_{2,}/g) || []).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < blanksCount) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleNext = () => {
    // Check answers and update score
    const correctAnswers = currentQuestion.correctAnswer;
    const isCorrect = selectedWords.every(
      (word, index) => word === correctAnswers[index]
    );
    if (isCorrect) {
      setScore(score + 1);
    }

    // Store the user's answer
    setAllAnswers([...allAnswers, selectedWords]);

    if (currentQuestionIndex < QUESTIONS.data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedWords([]);
      setTimeLeft(30);
    } else {
      onFinish(score, [...allAnswers, selectedWords]);
    }
  };

  const handleSkip = () => {
    // Store an empty answer for skipped question
    setAllAnswers([...allAnswers, []]);

    if (currentQuestionIndex < QUESTIONS.data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedWords([]);
      setTimeLeft(30);
    } else {
      onFinish(score, [...allAnswers, []]);
    }
  };

  const formatQuestion = () => {
    const parts = currentQuestion.question.split(/_{2,}/g);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="mx-1 px-2 py-1 bg-purple-100 rounded">
            {selectedWords[index] || "_____"}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFinish(score, allAnswers)}
        >
          Quit
        </Button>
      </div>

      <div className="space-y-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / QUESTIONS.data.questions.length) *
                100
              }%`,
            }}
          />
        </div>

        <p className="text-center text-muted-foreground">
          Select the missing words in the correct order
        </p>

        <div className="space-y-8">
          <p className="text-lg leading-relaxed">{formatQuestion()}</p>

          <div className="flex flex-wrap gap-2">
            {currentQuestion.options.map((word) => (
              <Button
                key={word}
                variant={selectedWords.includes(word) ? "default" : "outline"}
                size="sm"
                className={
                  selectedWords.includes(word)
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "border-purple-500 text-purple-500"
                }
                onClick={() => handleWordClick(word)}
              >
                {word}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleSkip} variant="outline">
          Skip
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedWords.length !== blanksCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function ScoreScreen({
  score,
  totalQuestions,
  userAnswers,
  questions,
  onRestart,
}: ScoreScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const formatAnswer = (question: string, answer: string[]) => {
    const parts = question.split(/_{2,}/g);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="mx-1 px-2 py-1 bg-purple-100 rounded">
            {answer[index] || "_____"}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <div className="text-6xl font-bold text-primary">{percentage}</div>
        <p className="text-muted-foreground">Overall Score</p>
      </div>

      <div className="space-y-2 text-center">
        <p>
          While you correctly formed several sentences, there are a couple of
          areas where improvement is needed. Pay close attention to sentence
          structure and word placement to ensure clarity and correctness.
        </p>
        <p className="text-sm text-muted-foreground">
          Correct answers: {score} out of {totalQuestions}
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-lg">Detailed Results</h3>
        {questions.map((question, index) => {
          const isCorrect = question.correctAnswer.every(
            (word, i) => word === userAnswers[index]?.[i]
          );

          return (
            <div key={question.questionId} className="space-y-4 border-b pb-4">
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  {isCorrect ? (
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-purple-600" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center">
                      <X className="h-3 w-3 text-pink-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Question {index + 1}
                  </p>
                  <div className="space-y-1">
                    <p className="font-medium">
                      Your response: {isCorrect ? "Correct" : "Incorrect"}
                    </p>
                    <p className="text-sm">
                      {formatAnswer(
                        question.question,
                        userAnswers[index] || []
                      )}
                    </p>
                  </div>
                  {!isCorrect && (
                    <div className="space-y-1">
                      <p className="font-medium text-muted-foreground">
                        Correct answer:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatAnswer(
                          question.question,
                          question.correctAnswer
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Start
      </Button>
    </div>
  );
}
