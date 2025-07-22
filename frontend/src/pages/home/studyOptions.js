
import {
  FaClipboardList,
  FaBook,
  FaFileAlt,
  FaCalculator,
  FaHistory,
  FaFlask,
  FaChartBar,
  FaInfoCircle,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBell,
  FaListAlt 
} from 'react-icons/fa';

 const studyOptions = [
    { id: 1, name: 'Syllabus', icon: <FaListAlt size={32} />, color: '#009688', path: '/syllabus' },
    { id: 2, name: 'Class', icon: <FaChalkboardTeacher size={32} />, color: '#673AB7', path: '/class' },
    { id: 3, name: 'Books', icon: <FaBook size={32} />, color: '#2196F3', path: '/books' },
    { id: 4, name: 'Notes', icon: <FaFileAlt size={32} />, color: '#FFC107', path: '/notes' },
    { id: 5, name: 'Formulas', icon: <FaCalculator size={32} />, color: '#FF9800', path: '/formulas' },
    { id: 6, name: 'Practice Questions', icon: <FaFlask size={32} />, color: '#F44336', path: '/practice-questions' },
    { id: 7, name: 'Quiz', icon: <FaClipboardList size={32} />, color: '#4CAF50', path: '/quiz' },
    { id: 8, name: 'Previous Year Questions', icon: <FaHistory size={32} />, color: '#9C27B0', path: '/previous-year-questions' },
    { id: 9, name: 'Exam Pattern', icon: <FaChartBar size={32} />, color: '#607D8B', path: '/exam-pattern' },
    { id: 10, name: 'Exam Notices', icon: <FaBell size={32} />, color: '#E91E63', path: '/exam-notices' },
    { id: 11, name: 'About Exam', icon: <FaInfoCircle size={32} />, color: '#795548', path: '/about-exam' },
    { id: 12, name: 'Study Plan', icon: <FaGraduationCap size={32} />, color: '#9fd400ff', path: '/study-plan' }
  ];

  
  export default studyOptions;