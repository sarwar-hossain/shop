import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyDataPage from './pages/admin/MyDataPage';
import InventoryPage from './pages/admin/InventoryPage';
import AddInventory from './pages/admin/AddInventory';
import AddMydata from './pages/admin/AddMydata';
import ProductsPage from './pages/admin/ProductsPage';
import AddProducts from './pages/admin/AddProducts';
import Navbar from './pages/Navbar';
import UpdateInventoryPage from './pages/admin/UpdateInventoryPage';
import UpdateMydataPage from './pages/admin/UpdateMyDataPage';
import UpdateProductsPage from './pages/admin/UpdateProductsPage';
import Student from './pages/admin/Student';
import AddStudent from './pages/admin/AddStudent';
import UpdateStudent from './pages/admin/UpdateStudent';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import AddPdf from './pages/admin/AddPdf';
import Pdf from './pages/admin/Pdf';
import Users from './pages/admin/Users';

import Books from './pages/books/Books';
import Notes from './pages/nodes/Nodes';
import PreviousQuestions from './pages/previousquestions/PreviousQuestions';
import PracticeQuestions from './pages/practicequestions/PracticeQuestions';
import Quiz from './pages/quiz/Quiz';
import Formulas from './pages/formulas/Formulas';
import SubjectTopics from './pages/books/BookSubjectTopics';
import BookSubjectTopics from './pages/books/BookSubjectTopics';
import FormulaSubjectTopics from './pages/formulas/FormulaSubjectTopics';
import NoteSubjectTopics from './pages/nodes/NoteSubjectTopics';
import PracticeQuestionsSubjectTopics from './pages/practicequestions/PracticeQuestionsSubjectTopics';
import PreviousQuestionsSubjectTopics from './pages/previousquestions/PreviousQuestionsSubjectTopics';
import QuizSubjectTopics from './pages/quiz/QuizSubjectTopics';
import Class from './pages/class/Class';
import ClassSubjectTopics from './pages/class/ClassSubjectTopics';
import Syllabus from './pages/syllabus/Syllabus';
import SyllabysSubjectTopics from './pages/syllabus/syllabusSubjectTopics';

import ExamPattern from './pages/pages/ExamPattern';
import StudyPlan from './pages/pages/StudyPlan';
import ExamNotices from './pages/pages/ExamNotices';
import AboutExam from './pages/pages/AboutExam';
import AdminNavbar from '../../../shop/frontend/src/components/admin/AdminNavbar/AdminNavbar';




const App = () => {
  return (
    <Router>

      <AdminNavbar />

      < Navbar />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/books" element={<Books />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/previous-questions" element={<PreviousQuestions />} />
        <Route path="/practice-questions" element={<PracticeQuestions />} />
        <Route path="/exam-pattern" element={<ExamPattern />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/about-exam" element={<AboutExam />} />
        <Route path="/exam-notices" element={<ExamNotices />} />
        <Route path="/class" element={<Class />} />
        <Route path="/syllabus" element={<Syllabus />} />



        <Route path="/book/mathematics" element={<SubjectTopics />} />
        <Route path="/book/mathematics" element={<BookSubjectTopics />} />
        <Route path="/formulas/mathematics" element={<FormulaSubjectTopics />} />
        <Route path="/notes/mathematics" element={<NoteSubjectTopics />} />
        <Route path="/practice-questions/mathematics" element={<PracticeQuestionsSubjectTopics />} />
        <Route path="/previous-questions/mathematics" element={<PreviousQuestionsSubjectTopics />} />
        <Route path="/quiz/mathematics" element={<QuizSubjectTopics />} />
        <Route path="/class/mathematics" element={<ClassSubjectTopics />} />
        <Route path="/syllabus/mathematics" element={<SyllabysSubjectTopics />} />




        <Route path="/admin/mydata" element={<MyDataPage />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
        <Route path="/admin/add-inventory" element={<AddInventory />} />
        <Route path="/admin/add-mydata" element={<AddMydata />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/student" element={<Student />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-products" element={<AddProducts />} />
        <Route path="/admin/update/:id" element={<UpdateInventoryPage />} />
        <Route path="/admin/updatemydata/:id" element={<UpdateMydataPage />} />
        <Route path="/admin/updateproducts/:id" element={<UpdateProductsPage />} />
        <Route path="/admin/updateproduct/:id" element={<UpdateProductsPage />} />
        <Route path="/admin/updatestudent/:id" element={<UpdateStudent />} />
        <Route path="/admin/add-pdf" element={<AddPdf />} />
        <Route path="/admin/pdf" element={<Pdf />} />
        <Route path="/admin/users" element={<Users />} />


      </Routes>


    </Router>
  );
};

export default App;
