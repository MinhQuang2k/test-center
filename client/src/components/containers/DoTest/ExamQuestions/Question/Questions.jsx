import { Col } from "antd";

import QuestionType1 from "./Type/QuestionType1";
import QuestionType2 from "./Type/QuestionType2";
import QuestionType3 from "./Type/QuestionType3";
import QuestionType4 from "./Type/QuestionType4";
import QuestionType5 from "./Type/QuestionType5";
import QuestionType6 from "./Type/QuestionType6";
import QuestionType7 from "./Type/QuestionType7";

function QuestionTest(props) {
  const { data } = props;
  const showArrayQuestion = (question) => {
    if (question.type === 1) return <QuestionType1 data={question} />;
    if (question.type === 2) return <QuestionType2 data={question} />;
    if (question.type === 3) return <QuestionType3 data={question} />;
    if (question.type === 6) return <QuestionType4 data={question} />;
    if (question.type === 7) return <QuestionType5 data={question} />;
    if (question.type === 8) return <QuestionType6 data={question} />;
    if (question.type === 9) return <QuestionType7 data={question} />;
  };

  return (
    <>
      {data &&
        data.map((question) => (
          <Col span={24} key={question.id}>
            <div className="pd_20 exam question--exam_question">
              {showArrayQuestion(question)}
            </div>
          </Col>
        ))}
    </>
  );
}

export default QuestionTest;
