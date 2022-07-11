import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Badge, Table, Button, Space, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatTime } from "../../../../utils/statistic";
import { deleteCandidateResult } from "../../../../slices/statisticTestResult";
import { useDispatch } from "react-redux";
const { Column } = Table;
function TestResultTable({
  data,
  pagination: { currentPage, totalRows, rowPerPage },
  setCurrentPage,
}) {
  const { t } = useTranslation("test", "common");
  const dispatch = useDispatch();
  const onDelete = (id) => {
    Modal.confirm({
      title: `${t("Do_you_want_to_remove_the_result?", { ns: "test" })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t("button.ok", { ns: "common" })}`,
      cancelText: `${t("button.cancel", { ns: "common" })}`,
      onOk: () => onDeleteOK(id),
    });
  };

  const onDeleteOK = (id) => {
    dispatch(deleteCandidateResult({ id, notification, t }));
  };

  const showEvaluate = (items) => {
    if (!items.endAt || !items.need_grade) return "";
    if (items.is_grading_it_questions)
      return (
        <Space size="middle">
          <Badge
            count={t("need_grade", { ns: "statistic" })}
            style={{
              backgroundColor: "#dc3545",
            }}
          ></Badge>
        </Space>
      );
    if (items.is_passed)
      return (
        <Space size="middle">
          <Badge
            count={t("passed", { ns: "statistic" })}
            style={{
              backgroundColor: "#06ba02",
            }}
          ></Badge>
        </Space>
      );
    return (
      <Space size="middle">
        <Badge
          count={t("failed", { ns: "statistic" })}
          style={{
            backgroundColor: "#1b2150",
          }}
        ></Badge>
      </Space>
    );
  };
  const handlePagination = (value) => {
    setCurrentPage(value.current);
  };
  return (
    <Table
      dataSource={data.map((row) => ({ key: row.id, ...row }))}
      pagination={{
        current: currentPage,
        pageSize: rowPerPage,
        total: totalRows,
      }}
      onChange={handlePagination}
    >
      <Column
        title={t("INFORMATION_CONTESTANTS", { ns: "test" })}
        dataIndex="full_name"
        key="full_name"
      />
      <Column
        title={t("COMPLETE_PERCENT", { ns: "test" })}
        key="complete_percent"
        render={(text, record) => (
          <>
            {record.endAt ? (
              <Space size="middle">
                <p>{record.complete_percent}</p>
                <progress value={record.complete_percent} max={100} />
              </Space>
            ) : (
              "_"
            )}
          </>
        )}
      />
      <Column
        title={t("RESULT", { ns: "test" })}
        key="score"
        render={(text, record) => <>{record.endAt ? record.score : "_"}</>}
      />
      <Column
        title={t("DURATION", { ns: "test" })}
        key="time_do_test"
        render={(text, record) => (
          <>{record.endAt ? record.time_do_test : "_"}</>
        )}
      />
      <Column
        title={t("CREATED_AT", { ns: "test" })}
        key="createdAt"
        render={(text, record) => <>{formatTime(record.createdAt)}</>}
      />
      <Column
        title=""
        key="result"
        render={(text, record) => <>{showEvaluate(record)}</>}
      />
      <Column
        title={t("ACTION", { ns: "test" })}
        key="view"
        render={(text, record) => (
          <Space size="middle">
            <Link to={`/results/${record.id}`} className="btn-link">
              {t("View_Detail", { ns: "test" })}
            </Link>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              onClick={() => onDelete(record.id)}
            ></Button>
          </Space>
        )}
      />
    </Table>
  );
}

export default TestResultTable;
