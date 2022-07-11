import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Empty,
  Modal,
  notification,
  Pagination,
  Progress,
  Row,
  Select,
  Space,
} from "antd";
import { ArcElement, Chart as ChartJS, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  deleteCandidateResult,
  getTestCampaignResult,
  statisticTestCampaignResultSelector,
} from "../../../../slices/statisticTestCampaignResult";
import { formatTime } from "../../../../utils/statistic";
import AddFilterOptionsTestCam from "./AddFilterOptionsTestCam";

ChartJS.register(ArcElement, Legend);

const { Option } = Select;

function ResultCampaign(props) {
  const { t } = useTranslation("testCampaign");
  const { id } = useParams();
  const [orderBy, setOrderBy] = useState("latest");
  const [optionsSelected, setOptionsSelected] = useState({});
  const [page, setPage] = useState(1);
  const {
    test_campaign_result,
    question_statistic: {
      total_true_question,
      total_fail_question,
      total_empty_answer_question,
    },
    result_statistic: { total_participants, total_unfinished_participants },
    examination,
    isLoading,
    pagination: { currentPage, totalRows, rowPerPage },
  } = useSelector(statisticTestCampaignResultSelector);
  const dispatch = useDispatch();

  const styleChart = {
    backgroundColor: [
      "rgba(44, 74, 159, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(189, 195, 199, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderColor: ["rgba(255, 255, 255, 1)"],
    borderWidth: 2,
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const showEvaluate = (items) => {
    if (!items.endAt) return "";
    if (items.is_grading_it_questions)
      return (
        <span className="need_grade">
          {t("need_grade", { ns: "testCampaign" })}
        </span>
      );
    if (items.is_passed)
      return (
        <span className="pass">{t("passed", { ns: "testCampaign" })}</span>
      );
    return (
      <span className="not_pass">{t("not_pass", { ns: "testCampaign" })}</span>
    );
  };

  const showModalDelete = (id) => {
    Modal.confirm({
      title: t("Notification", { ns: "testCampaign" }),
      icon: <ExclamationCircleOutlined />,
      content: t("Do_you_want_to_remove_the_result", { ns: "testCampaign" }),
      okText: t("yes", { ns: "testCampaign" }),
      cancelText: t("no", { ns: "testCampaign" }),
      onOk: () => deleteCandidate(id),
      maskClosable: true,
    });
  };

  const deleteCandidate = (id) => {
    dispatch(deleteCandidateResult({ id, notification, t }));
  };
  const onChangePagination = (values) => {
    setPage(values);
  };

  useEffect(() => {
    dispatch(
      getTestCampaignResult({
        id,
        order_by: orderBy,
        page,
        ...optionsSelected,
        notification,
        t,
      })
    );
  }, [id, orderBy, optionsSelected, page]);
  return (
    <div className="result_campaign">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/test-campaigns">
                <span>{t("test_campaign", { ns: "testCampaign" })}</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {t("The_test_campaign_result", { ns: "testCampaign" })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Space direction="vertical" size="middle">
            <Row gutter={[16, 16]} className="details">
              <Col span={24}>
                <Row gutter={[8, 8]} align="middle">
                  <Col flex={1}>
                    <h4>{examination.name}</h4>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <div className="white_bg pd_20">
                  {true ? (
                    <>
                      <Row gutter={[16, 16]} justify="center">
                        <Col>
                          <img
                            src={require("../../../../assets/img/no_chart.png")}
                          />
                        </Col>
                        <Col>
                          <p>
                            {t("Havent_setup_pass_mark_for_campaign", {
                              ns: "testCampaign",
                            })}
                          </p>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <Pie
                      data={{
                        labels: ["Max score", "Need grade passed"],
                        datasets: [
                          {
                            label: "# of Votes",
                            data: [1, 2],
                            ...styleChart,
                          },
                        ],
                      }}
                      options={options}
                    />
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="white_bg pd_20">
                  <Row gutter={[24, 24]}>
                    <Col span={12}>
                      <h6>{total_participants}</h6>
                      <p>{t("Participants", { ns: "testCampaign" })}</p>
                    </Col>
                    <Col span={12}>
                      <h6>{total_unfinished_participants}</h6>
                      <p>{t("Havent_done_yet", { ns: "testCampaign" })}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={4}>
                <div className="white_bg ">
                  {total_participants > 0 ? (
                    <Pie
                      data={{
                        labels: [
                          "Correct Answer",
                          "Wrong Answer",
                          "Empty Answer",
                        ],
                        datasets: [
                          {
                            label: "# of Votes",
                            data: [
                              total_true_question,
                              total_fail_question,
                              total_empty_answer_question,
                            ],
                            ...styleChart,
                          },
                        ],
                      }}
                      options={options}
                    />
                  ) : (
                    <>
                      <Row gutter={[16, 16]} justify="center">
                        <Col>
                          <img
                            src={require("../../../../assets/img/no_chart.png")}
                          />
                        </Col>
                        <Col>
                          <p>
                            {t("not_enough_data_for_display", {
                              ns: "testCampaign",
                            })}
                          </p>
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="white_bg pd_20">
                  <Row gutter={[24, 24]}>
                    <Col span={12}>
                      <h6>{total_true_question}</h6>
                      <p>{t("Correct_Answer", { ns: "testCampaign" })}</p>
                    </Col>
                    <Col span={12}>
                      <h6>{total_fail_question}</h6>
                      <p>{t("Wrong_Answer", { ns: "testCampaign" })}</p>
                    </Col>
                    <Col span={12}>
                      <h6>{total_empty_answer_question}</h6>
                      <p>{t("Empty_Answer", { ns: "testCampaign" })}</p>
                    </Col>
                    <Col span={12}>
                      <Link
                        to={`/test-campaigns/${examination.id}/question-statistic`}
                      >
                        {t("View_detail", { ns: "testCampaign" })} {">"}
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <AddFilterOptionsTestCam
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  optionsSelected={optionsSelected}
                  setOptionsSelected={setOptionsSelected}
                  isLoading={isLoading}
                />
              </Col>

              <Col span={24}>
                <div className="white_bg pd_20">
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          {t("INFORMATION_CONTESTANTS", {
                            ns: "testCampaign",
                          })}
                        </th>
                        <th>{t("COMPLETE_PERCENT", { ns: "testCampaign" })}</th>
                        <th>{t("SCORE", { ns: "testCampaign" })}</th>
                        <th>{t("DURATION", { ns: "testCampaign" })}</th>
                        <th>{t("CREATED_AT", { ns: "testCampaign" })}</th>
                      </tr>
                      {test_campaign_result.length > 0 &&
                        test_campaign_result.map((item) => (
                          <tr key={item.id}>
                            <td>{item.full_name}</td>
                            <td>
                              {item?.endAt ? (
                                <>
                                  {item.complete_percent}
                                  <Progress
                                    percent={item.complete_percent}
                                    showInfo={false}
                                  />
                                </>
                              ) : (
                                "_"
                              )}
                            </td>
                            <td>{item?.endAt ? item.score : "_"}</td>
                            <td>{item?.endAt ? item.time_do_test : "_"}</td>
                            <td>{formatTime(item.createdAt)}</td>
                            <td>{showEvaluate(item)}</td>
                            <td>
                              {item?.endAt && (
                                <Link to="/test-campaigns">
                                  <Button>
                                    {t("View_Detail", { ns: "testCampaign" })}
                                  </Button>
                                </Link>
                              )}
                            </td>
                            <td>
                              <span onClick={() => showModalDelete(item.id)}>
                                <DeleteOutlined />
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {test_campaign_result.length === 0 && !isLoading ? (
                    <Empty style={{ marginTop: "10px" }} />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={rowPerPage}
                current={currentPage}
                onChange={onChangePagination}
                total={totalRows}
                hideOnSinglePage
              />
            </Row>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default ResultCampaign;
