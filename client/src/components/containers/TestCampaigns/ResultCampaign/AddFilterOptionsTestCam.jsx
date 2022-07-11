import {
  Button,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Tag,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DownloadOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";

function AddFilterOptionsTestCam(props) {
  const { t } = useTranslation("statistic");
  const {
    orderBy,
    setOrderBy,
    optionsSelected,
    setOptionsSelected,
    isLoading,
  } = props;
  const [visible, setVisible] = useState(false);
  const [filterOptios, setFilterOptios] = useState("");

  const handleChange = (value) => {
    setOrderBy(value);
  };

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
    setFilterOptios("");
  };

  function onClick(str) {
    setFilterOptios(str);
  }

  function renderfilterOptios() {
    const onFinish = (values) => {
      hide();
      setOptionsSelected((prev) => {
        const newSelector = prev;
        const Object = { ...newSelector, ...values };
        return Object;
      });
    };

    return (
      <>
        <Col span={24}>
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              email: optionsSelected.email,
              identify_code: optionsSelected.identify_code,
              fullname: optionsSelected.fullname,
              phone: optionsSelected.phone,
              position: optionsSelected.position,
              group: optionsSelected.group,
            }}
          >
            <Form.Item
              name={`${filterOptios}`}
              label={filterOptios ? t(filterOptios, { ns: "statistic" }) : ""}
              rules={[
                {
                  required: true,
                  message: t("fill_out_this_feild", { ns: "statistic" }),
                },
              ]}
            >
              <Input
                placeholder={
                  filterOptios ? t(filterOptios, { ns: "statistic" }) : ""
                }
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                {t("search", { ns: "statistic" })}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </>
    );
  }

  function back() {
    setFilterOptios("");
  }

  function addFilterOptions() {
    return (
      <>
        <Row gutter={[8, 8]}>
          <Col flex={1}>
            {filterOptios
              ? t(filterOptios, { ns: "statistic" })
              : "" && (
                  <span onClick={back}>
                    <a>{"<"}</a>
                  </span>
                )}

            <span>
              {filterOptios
                ? t(filterOptios, { ns: "statistic" })
                : t("add_filter_options", { ns: "statistic" })}
            </span>
          </Col>
          <Col>
            <a onClick={hide}>x</a>
          </Col>

          {!filterOptios ? (
            <>
              <Col span={24}>{t("filter_options", { ns: "statistic" })}</Col>
              <Col span={24}>
                <a
                  className={optionsSelected.email && "selected"}
                  onClick={() => {
                    onClick("email");
                  }}
                >
                  {t("email", { ns: "statistic" })}
                </a>
                <a
                  className={optionsSelected.identify_code && "selected"}
                  onClick={() => {
                    onClick("identify_code");
                  }}
                >
                  {t("identify_code", { ns: "statistic" })}
                </a>
                <a
                  className={optionsSelected.fullname && "selected"}
                  onClick={() => {
                    onClick("fullname");
                  }}
                >
                  {t("fullname", { ns: "statistic" })}
                </a>
                <a
                  className={optionsSelected.phone && "selected"}
                  onClick={() => {
                    onClick("phone");
                  }}
                >
                  {t("phone", { ns: "statistic" })}
                </a>
                <a
                  className={optionsSelected.position && "selected"}
                  onClick={() => {
                    onClick("position");
                  }}
                >
                  {t("position", { ns: "statistic" })}
                </a>
                <a
                  className={optionsSelected.group && "selected"}
                  onClick={() => {
                    onClick("group");
                  }}
                >
                  {t("group", { ns: "statistic" })}
                </a>
              </Col>
            </>
          ) : (
            <>{renderfilterOptios()}</>
          )}
        </Row>
      </>
    );
  }

  function removeOption(filter) {
    setOptionsSelected((prev) => {
      const optionsItem = { ...prev };
      delete optionsItem[filter];
      return optionsItem;
    });
    console.log("remove", optionsSelected);
  }

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col>
          <Select
            defaultValue="latest"
            onChange={handleChange}
            value={orderBy}
            style={{ width: 120 }}
          >
            <Select.Option value="latest">
              {t("Latest", { ns: "testCampaign" })}
            </Select.Option>
            <Select.Option value="highest_score">
              {t("Highest_score", { ns: "testCampaign" })}
            </Select.Option>
            <Select.Option value="lowest_score">
              {t("Lowest_score", { ns: "testCampaign" })}
            </Select.Option>
          </Select>
        </Col>
        <Col flex={1}>
          <Popover
            placement="bottomLeft"
            content={addFilterOptions}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <Button type="primary">
              {t("add_filter_options", { ns: "statistic" })}
            </Button>
          </Popover>
        </Col>
        <Col>
          <Tooltip title={t("Export_result_file", { ns: "testCampaign" })}>
            <Button
              type="primary"
              loading={isLoading}
              icon={<DownloadOutlined />}
            ></Button>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title={t("Download_essays", { ns: "testCampaign" })}>
            <Button
              type="primary"
              loading={isLoading}
              icon={<FileTextOutlined />}
            ></Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip
            title={t("Import_essays_score_from_file", { ns: "testCampaign" })}
          >
            <Button
              type="primary"
              loading={isLoading}
              icon={<UploadOutlined />}
            ></Button>
          </Tooltip>
        </Col>
        <Col span={24}>
          {optionsSelected.email && (
            <Tag closable onClose={() => removeOption("email")}>
              {t("email", { ns: "statistic" })}: {optionsSelected.email}
            </Tag>
          )}
          {optionsSelected.identify_code && (
            <Tag closable onClose={() => removeOption("identify_code")}>
              {t("identify_code", { ns: "statistic" })}:{" "}
              {optionsSelected.identify_code}
            </Tag>
          )}
          {optionsSelected.fullname && (
            <Tag closable onClose={() => removeOption("fullname")}>
              {t("fullname", { ns: "statistic" })}: {optionsSelected.fullname}
            </Tag>
          )}
          {optionsSelected.phone && (
            <Tag closable onClose={() => removeOption("phone")}>
              {t("phone", { ns: "statistic" })}: {optionsSelected.phone}
            </Tag>
          )}
          {optionsSelected.position && (
            <Tag closable onClose={() => removeOption("position")}>
              {t("position", { ns: "statistic" })}: {optionsSelected.position}
            </Tag>
          )}
          {optionsSelected.group && (
            <Tag closable onClose={() => removeOption("group")}>
              {t("group", { ns: "statistic" })}: {optionsSelected.group}
            </Tag>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AddFilterOptionsTestCam;
