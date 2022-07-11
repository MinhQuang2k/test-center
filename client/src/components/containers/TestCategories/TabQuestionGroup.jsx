import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  notification,
  Pagination,
  Row,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionGroups,
  questionGroupsSelector,
} from "../../../slices/questionGroup";
import QuestionGroupSkeleton from "../../commons/QuestionGroupSkeleton";
import AddQuestionGroup from "./Forms/AddQuestionGroup";
import QuestionItem from "./QuestionGroupItem";
const { TabPane } = Tabs;
const { Search } = Input;
function TabQuestionGroup({ tab, key, ...props }) {
  const { t } = useTranslation("category");
  const [questionModal, setQuestionModal] = useState(false);
  const [keyword, setKeyword] = useState("");

  const {
    questionGp,
    isLoading,
    pagination: { rowPerPage, totalRows, currentPage },
  } = useSelector(questionGroupsSelector);

  const dispatch = useDispatch();
  const addQuestionGroup = () => {
    setQuestionModal(!questionModal);
  };

  const onSearch = (values) => {
    setKeyword(values);
    dispatch(
      getQuestionGroups({
        page: 1,
        keyword,
        per_page: rowPerPage,
        notification,
        t,
      })
    );
  };
  const handleChangePage = (values) => {
    dispatch(
      getQuestionGroups({
        page: values,
        keyword,
        per_page: rowPerPage,
        notification,
        t,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getQuestionGroups({
        page: 1,
        keyword,
        per_page: rowPerPage,
        notification,
        t,
      })
    );
  }, []);
  return (
    <TabPane tab={tab} key={key} {...props}>
      <div className="category-group">
        <Search
          placeholder={t("search_question_group", { ns: "category" })}
          style={{ width: 400 }}
          defaultValue=""
          loading={isLoading}
          onSearch={onSearch}
        />
        <Button
          className="btn-primary"
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={addQuestionGroup}
          loading={isLoading}
        >
          {t("new_questiongroup", { ns: "category" })}
        </Button>
      </div>
      {questionGp &&
        questionGp.map((question) => (
          <QuestionItem question={question} key={question?.id} />
        ))}

      {isLoading
        ? Array.from(Array(10).keys()).map((_, index) => (
            <QuestionGroupSkeleton key={index} />
          ))
        : null}

      {questionGp.length === 0 && !isLoading ? (
        <span> {t("no_question_groups_found", { ns: "category" })}</span>
      ) : null}

      {totalRows > rowPerPage ? (
        <Row justify="center" align="middle">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={rowPerPage}
            current={currentPage}
            onChange={handleChangePage}
            total={totalRows}
            hideOnSinglePage
          />
        </Row>
      ) : null}
      <Modal
        title={t("create_new_question_group", { ns: "category" })}
        onOk={() => setQuestionModal(false)}
        onCancel={() => setQuestionModal(false)}
        visible={questionModal}
        style={{ top: 25 }}
        footer={null}
      >
        <AddQuestionGroup onCancel={() => setQuestionModal(false)} />
      </Modal>
    </TabPane>
  );
}

export default TabQuestionGroup;
