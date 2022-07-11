import { Col, Pagination, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCandidates,
  statisticCandidateSelector,
} from "../../../../slices/statisticCandidate";
import AddFiilterOptions from "./AddFiilterOptions";
import Candidates from "./Candidates/Candidates";
import { useTranslation } from "react-i18next";

function AnswerSheets() {
  const { t } = useTranslation("statistic");

  const {
    candidates,
    isLoading,
    pagination: { rowPerPage, totalRows, currentPage },
  } = useSelector(statisticCandidateSelector);

  const [optionsSelected, setOptionsSelected] = useState({});
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  function onChangePagination(values) {
    setPage(values);
  }

  useEffect(() => {
    dispatch(
      getCandidates({
        notification,
        t,
        page,
        ...optionsSelected,
      })
    );
  }, [optionsSelected, page]);

  return (
    <div className="answer_sheets">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <div className="white_bg pd_20">
            <AddFiilterOptions
              optionsSelected={optionsSelected}
              setOptionsSelected={setOptionsSelected}
            />
          </div>
        </Col>
        <Col span={24}>
          <Candidates
            data={candidates}
            totalRows={totalRows}
            isLoading={isLoading}
          />
        </Col>
        <Col>
          {totalRows > rowPerPage ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={rowPerPage}
              current={currentPage}
              onChange={onChangePagination}
              total={totalRows}
              hideOnSinglePage
            />
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default AnswerSheets;
