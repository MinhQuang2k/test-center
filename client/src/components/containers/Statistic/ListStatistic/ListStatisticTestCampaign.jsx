import {
  Button,
  Col,
  Pagination,
  Progress,
  Row,
  notification,
  Empty,
} from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestCampaign,
  statisticTestCampaignSelector,
} from "../../../../slices/statisticTestCampaign";

function ListStatisticTestCampaign() {
  const { t } = useTranslation("statistic");

  const {
    testCampaigns,
    isLoading,
    pagination: { rowPerPage, totalRows, currentPage },
  } = useSelector(statisticTestCampaignSelector);

  const dispatch = useDispatch();

  const handleChange = (values) => {
    dispatch(getTestCampaign({ page: values, notification, t }));
  };

  useEffect(() => {
    dispatch(getTestCampaign({ page: 1, notification, t }));
  }, []);

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <div className="list_statistic white_bg pd_20">
            <table>
              <tbody>
                <tr>
                  <th>{t("test_campaign_name", { ns: "statistic" })}</th>
                  <th>{t("completed_total", { ns: "statistic" })}</th>
                  <th>
                    {t("average_correct_completion_percent", {
                      ns: "statistic",
                    })}
                  </th>
                  <th>{t("average_score", { ns: "statistic" })}</th>
                  <th>{t("average_duration", { ns: "statistic" })}</th>
                </tr>
                {testCampaigns.map((items) => (
                  <tr key={items.id}>
                    <td>{items.name}</td>
                    <td>
                      {items.total_answer_sheet_completed ? (
                        items.total_answer_sheet_completed
                      ) : (
                        <span>-</span>
                      )}
                      /
                      {items.total_answer_sheet ? (
                        items.total_answer_sheet
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {items.average_completion_percent}%{" "}
                      <Progress
                        percent={items.average_completion_percent}
                        showInfo={false}
                      />
                    </td>
                    <td>{items.average_score}</td>
                    <td>{items.average_completion_time}</td>
                    <td>
                      <Link to={`/test-campaigns/${items.id}/result`}>
                        <Button>{t("bt_result", { ns: "statistic" })}</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {testCampaigns.length === 0 && !isLoading ? (
              <Empty style={{ marginTop: "10px" }} />
            ) : null}
          </div>
        </Col>
        <Col>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={rowPerPage}
            current={currentPage}
            onChange={handleChange}
            total={totalRows}
            hideOnSinglePage
          />
        </Col>
      </Row>
    </>
  );
}

export default ListStatisticTestCampaign;
