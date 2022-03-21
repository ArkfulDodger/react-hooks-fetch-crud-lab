import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:4000/questions`)
      .then( res => res.json())
      .then( data => setQuestions(data))
      .catch( error => console.log(error.message));
  }, [])

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function updateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map(question => question.id === updatedQuestion.id ? updatedQuestion : question);
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form"
        ? <QuestionForm onAddQuestion={addQuestion} /> 
        : <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} onUpdateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
