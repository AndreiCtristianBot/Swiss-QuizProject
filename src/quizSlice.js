import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of Switzerland?",
    options: ["Bern", "Zurich", "Geneva", "Lucerne"],
    correctAnswer: "Bern",
  },
  {
    id: 2,
    question: "Which mountain is the highest in Switzerland?",
    options: ["Matterhorn", "Eiger", "Jungfrau", "Monte Rosa"],
    correctAnswer: "Monte Rosa",
  },
  {
    id: 3,
    question: "Which is the most spoken language in Switzerland?",
    options: ["Italian", "French", "Romansch", "German"],
    correctAnswer: "German",
  },
  {
    id: 4,
    question: "Which is the richest city in Switzerland?",
    options: ["Zürich", "Zug", "Geneva", "Interlaken"],
    correctAnswer: "Zug",
  },
  {
    id: 5,
    question: "Instead of 'Hallo', how do the Swiss greet?",
    options: ["Grüezi", "Salut", "Uf Wiederluege", "Gueteete Tah"],
    correctAnswer: "Grüezi",
  },
  {
    id: 6,
    question: "Is military service mandatory in Switzerland?",
    options: ["Yes","Yeah, but the Civil Service is an alternative", "No", "It's random"],
    correctAnswer: "Yeah, but the Civil Service is an alternative",
  },
  {
    id: 7,
    question: "In which Swiss canton is Romansch spoken almost exclusively?",
    options: ["Zug", "canton of Graubünden", "Bern", "Vaud"],
    correctAnswer: "canton of Graubünden",
  },
  {
    id: 8, 
    question: "What is the official currency in Switzerland?",
    options: ["(EUR)Euro", "CHF(swiss franc)", "(SLR)swiss lira", "(SGL:B)swiss gelb"],
    correctAnswer: "CHF(swiss franc)"
  },
  {
    id: 9,
    question: "What is the biggest by land area canton in Switzerland?",
    options: ["Bern", "Valais", "Schaffhausen", "canton of Graubünden"],
    correctAnswer: "canton of Graubünden",
  },
  {
    id: 10,
    question: "What is Switzerland known for?",
    options: ["Luxury Watches", "Water", "Education", "Fashion"],
    correctAnswer: "Luxury Watches",
  },
  {
    id: 11,
    question: "Which city is considered the financial hub of Switzerland?",
    options: ["Geneva", "Zürich", "Bern", "Laussane"],
    correctAnswer: "Zürich",
  },
  {
    id: 12,
    question: "Which of the following languages is NOT an official language of Switzerland?",
    options: ["French", "English", "German", "Italian"],
    correctAnswer: "English",
  },
  {
    id: 13,
    question: "Which of these agreements or organizations does Switzerland NOT belong to?",
    options: ["European Union(EU)", "Schengen Area", "United Nations (UN)", "European Free Trade Association (EFTA)"],
    correctAnswer: "European Union(EU)",
  },
  {
    id: 14,
    question: "Which Swiss canton has the highest population?",
    options: ["Vaud", "Zurich", "Geneva", "Bern"],
    correctAnswer: "Zurich",
  },
  {
    id: 15,
    question: "Which of the following Swiss lakes is the largest by surface area?",
    options: ["Lake Zurich", "Lake Geneva", "Lake Constance", "Lake Lucerne"],
    correctAnswer: "Lake Geneva",
  },
];

export const loadQuestions = createAsyncThunk(
  "quiz/loadQuestions",
  async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockQuestions), 1000)
    );
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    isLoading: false,
    hasError: false,
    completed: false,
    wrongAnswersCount: 0,
    correctAnswersCount: 0,
  },
  reducers: {
    submitAnswer: (state, action) => {
      const question = state.questions.find((q) => q.id === action.payload.id);
      if (question && !question.userAnswer) {
        question.userAnswer = action.payload.answer;
        if (question.userAnswer !== question.correctAnswer) {
          state.wrongAnswersCount += 1; 
        } else {
          state.correctAnswersCount += 1;
        }
        state.completed = state.questions.every(
          (q) => q.userAnswer === q.correctAnswer
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.questions = action.payload;
      })
      .addCase(loadQuestions.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { submitAnswer } = quizSlice.actions;
export default quizSlice.reducer;
