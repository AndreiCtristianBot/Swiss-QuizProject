# Swiss Quiz
Swiss Quiz is an interactive quiz application built with React and Redux. The quiz tests your knowledge about Switzerland through multiple-choice questions. Users are provided feedback for their answers and encouraged to keep learning!

## Features
- **Interactive Quiz**: Answer 15 multiple-choice questions about Switzerland.
- **Dynamic Feedback**: 
  - Correct answers are highlighted in green with a success message.
  - Incorrect answers are highlighted in red with an encouraging message.
- **Alerts**: 
  - If you get more than 10 wrong answers, an alert advises you to reload the page and focus again.
  - If all answers are correct, a congratulatory message is displayed.
- **Responsive Design**: Styled with Bootstrap to ensure responsiveness and visually appealing UI.
- **Redux State Management**: Manages quiz state using Redux Toolkit and `extraReducers`.

## Technologies Used
- **React**: For building the user interface.
- **Redux Toolkit**: For managing application state.
- **Bootstrap**: For styling the application.
- **JavaScript**: For implementing functionality.

## Installation and Setup
Follow these steps to set up the project on your local machine:

1. **Clone the repository**:
   Use the following command to clone the repository to your local machine:
   ```bash
   git clone https://github.com/AndreiCtristianBot/Swiss-QuizProject.git
   cd swiss-quiz

## Usage
Start the Development Server
To run the app locally, use the following command in your terminal:

### Copy this code:
npm start
Access the Application
Once the local server is running, open a web browser and navigate to:

### Acces this url:
http://localhost:3000

### How to Use the Application:

The quiz starts as soon as the app loads.
Answer the questions about Switzerland by selecting the correct option.
If your answer is correct:
The text "Your answer is correct!" will appear in green.
If your answer is incorrect:
The text "Your answer is wrong, try again! It's part of the learning process!" will appear in red.
If you give more than 5 wrong answers, an alert message will appear encouraging you to focus and reload the page.
Completing the Quiz

After answering all the questions:
If all answers are correct, a congratulatory message will appear:
"Congratulations !!! 👏🥳🚀"
If not, you will see a summary showing the number of correct and incorrect answers.
