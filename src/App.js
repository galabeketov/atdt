import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import CourseOne from "./pages/course/CourseOne";
import HomeOne from "./pages/homepages/HomeOne";
import LoginRegister from "./pages/innerpages/LoginRegister";
import PrivacyPolicy from "./pages/innerpages/PrivacyPolicy";
import InstructorDetails from "./pages/detailspages/InstructorDetails";
import Error from "./pages/innerpages/Error";

// Import Css Here
import "./assets/scss/style.scss";
import CourseCreate from "./pages/detailspages/CourseCreate";
import Quiz from "./pages/detailspages/Quiz";
import CourseList from "./pages/course/CourseList";
import QuizList from "./pages/course/QuizList";
import ChatWidget from "./components/widget";
import Publications from "./pages/course/Publications";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route
            exact
            path="/"
            element={<HomeOne />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/quizzes"}`}
            element={<QuizList />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/lessons"}`}
            element={<CourseOne />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/publications"}`}
            element={<Publications />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/lessons/:id"}`}
            element={<CourseCreate />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/lessons/search/:query"}`}
            element={<CourseList />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/quizzes/:id"}`}
            element={<Quiz />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/profile"}`}
            element={<InstructorDetails />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/about-us"}`}
            element={<PrivacyPolicy />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/login-register"}`}
            element={<LoginRegister />}
          />

          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </ScrollToTop>
      <ChatWidget />
    </Router>
  );
}

export default App;
