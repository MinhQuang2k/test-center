import {
  FileFilled,
  FlagFilled,
  MailOutlined,
  PhoneOutlined,
  QrcodeOutlined,
  RocketOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Empty, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatTime } from "../../../../../utils/statistic";

function Candidates(props) {
  const { t } = useTranslation("statistic");

  const candidates = props.data;
  const totalRows = props.totalRows;
  const isLoading = props.isLoading;

  const showEvaluate = (items) => {
    if (!items.endAt) return "_";
    if (items.is_grading_it_questions)
      return (
        <span className="need_grade">
          {t("need_grade", { ns: "statistic" })}
        </span>
      );
    if (items.is_passed)
      return <span className="pass">{t("passed", { ns: "statistic" })}</span>;
    return <span className="not_pass">{t("failed", { ns: "statistic" })}</span>;
  };

  return (
    <div>
      <div className="white_bg pd_20">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            {t("total", { ns: "statistic" })}: {totalRows}
          </Col>
          <Col span={24}>
            <table>
              <tbody>
                <tr>
                  <th>{t("candidate_information", { ns: "statistic" })}</th>
                  <th>{t("test_information", { ns: "statistic" })}</th>
                  <th className="col-center">
                    {t("evaluate", { ns: "statistic" })}
                  </th>
                  <th className="col-center">
                    {t("result", { ns: "statistic" })}
                  </th>
                  <th>{t("time", { ns: "statistic" })}</th>
                  <th></th>
                </tr>
                {candidates.length > 0 &&
                  candidates.map((items, index) => (
                    <tr key={index}>
                      <td>
                        {items.fullname && (
                          <p>
                            <UserOutlined /> {items.fullname}{" "}
                          </p>
                        )}
                        {items.identify_code && (
                          <p>
                            <QrcodeOutlined /> {items.identify_code}
                          </p>
                        )}
                        {items.phone && (
                          <p>
                            <PhoneOutlined /> {items.phone}
                          </p>
                        )}
                        {items.email && (
                          <p>
                            <MailOutlined /> {items.email}
                          </p>
                        )}
                        {items.group && (
                          <p>
                            <TeamOutlined /> {items.group}
                          </p>
                        )}
                        {items.position && (
                          <p>
                            <RocketOutlined /> {items.position}
                          </p>
                        )}
                      </td>
                      <td>
                        <a href={`/tests/${items.test_id}/edit`} target="blank">
                          <FileFilled /> {items.test_name}
                        </a>
                        <br />
                        <a
                          href={`/tests/${items.test_campaign.id}/edit`}
                          target="blank"
                        >
                          <FlagFilled /> {items.test_campaign.name}
                        </a>
                      </td>
                      <td className="col-center">{showEvaluate(items)}</td>
                      <td className="col-center">
                        {items.endAt ? (
                          <p>
                            <span>{items.score}</span>/
                            <span>{items.max_score}</span>
                          </p>
                        ) : (
                          <span>_</span>
                        )}
                        <p>({items.complete_percent || 0} %)</p>
                      </td>
                      <td
                        className={
                          !items.startAt && !items.endAt ? "col-center" : ""
                        }
                      >
                        {items.endAt && items.time_do_test ? (
                          <p>
                            {t("time_do_test", { ns: "statistic" })}:{" "}
                            <span>{items.time_do_test}</span>
                          </p>
                        ) : (
                          <p></p>
                        )}
                        {items.startAt ? (
                          <p>
                            {t("start_at", { ns: "statistic" })}:{" "}
                            <span>{formatTime(items.startAt)}</span>
                          </p>
                        ) : (
                          <p></p>
                        )}
                        {items.endAt ? (
                          <p>
                            {t("end_at", { ns: "statistic" })}:{" "}
                            <span>{formatTime(items.endAt)}</span>
                          </p>
                        ) : (
                          <p></p>
                        )}
                        {!items.startAt && !items.endAt && <span>_</span>}
                      </td>
                      <td className="col-center">
                        <Link to={`/results/${items.id}`}>
                          <Button>{t("bt_result", { ns: "statistic" })}</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {candidates.length === 0 && !isLoading ? (
              <Empty style={{ marginTop: "10px" }} />
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Candidates;
