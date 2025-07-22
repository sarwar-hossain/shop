import React from 'react';
import SubjectPdf from '../subjects/SubjectPdf';
import {
  FaCalculator,
  FaAtom,
  FaFlask
} from 'react-icons/fa';

function Syllabus() {
  return (

    <div className="subject-page">
      <header className="subject-header">
        <h1>Subject Syllabus</h1>
        <p>Test your knowledge with our subject-wise subjectzes</p>
      </header>

      <div className="subject-categories">
        <SubjectPdf
          id="1"
          name="Syllabus"
          subject="Mathematics"
          icon={FaCalculator}
          color="#42e326ff"
          link="pdf-viewer"
        />

        <SubjectPdf
          id="2"
          name="Syllabus"
          subject="Physics"
          icon={FaAtom}
          color="#1bded1ff"
          link="syllabus"
        />

        <SubjectPdf
         id="3"
          name="Syllabus"
          subject="Chemistry"
          icon={FaFlask}
          color="#3c5be7ff"
          link="syllabus"
        />

         <SubjectPdf
         id="4"
          name="Syllabus"
          subject="Biology"
          icon={FaFlask}
          color="#e73ca5ff"
          link="syllabus"
        />

      </div>
    </div>

  );
}

export default Syllabus;