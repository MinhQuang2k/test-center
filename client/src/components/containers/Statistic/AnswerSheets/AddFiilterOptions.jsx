import { Button, Col, Form, Input, Popover, Radio, Row, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddFiilterOptions({ optionsSelected, setOptionsSelected }) {
  const { t } = useTranslation("statistic");

  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
    setFilterOptios("");
  };

  const [filterOptios, setFilterOptios] = useState("");

  function onClick(str) {
    setFilterOptios(str);
  }

  function renderfilterOptios() {
    const onFinish = (values) => {
      hide();

      setOptionsSelected((prev) => {
        const newSelector = prev;
        const optionsItem = { ...newSelector, ...values };
        return optionsItem;
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
              label={filterOptios && t(filterOptios, { ns: "statistic" })}
              rules={[
                {
                  required: true,
                  message: t("fill_out_this_feild", { ns: "statistic" }),
                },
              ]}
            >
              <Input
                placeholder={
                  filterOptios && t(filterOptios, { ns: "statistic" })
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
            {filterOptios && t(filterOptios, { ns: "statistic" }) && (
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

  const [value, setValue] = useState(2);

  const onChange = (e) => {
    setValue(e.target.value);
    setOptionsSelected((prev) => {
      const newSelector = prev;
      const optionsItem = { ...newSelector, type_filter: e.target.value };
      return optionsItem;
    });
  };

  function log(filter) {
    setOptionsSelected((prev) => {
      const optionsItem = { ...prev };
      delete optionsItem[filter];
      return optionsItem;
    });
  }

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
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
        <Col span={24}>
          <Radio.Group onChange={onChange} value={value}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Radio value={1}>
                  {t("include_all_options_filter", { ns: "statistic" })}
                </Radio>
              </Col>
              <Col span={24}>
                <Radio value={2}>
                  {t("include_one_of_all_options_filter", {
                    ns: "statistic",
                  })}
                </Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Col>
        <Col span={24}>
          {optionsSelected.email && (
            <Tag closable onClose={() => log("email")}>
              {t("email", { ns: "statistic" })}: {optionsSelected.email}
            </Tag>
          )}
          {optionsSelected.identify_code && (
            <Tag closable onClose={() => log("identify_code")}>
              {t("identify_code", { ns: "statistic" })}:{" "}
              {optionsSelected.identify_code}
            </Tag>
          )}
          {optionsSelected.fullname && (
            <Tag closable onClose={() => log("fullname")}>
              {t("fullname", { ns: "statistic" })}: {optionsSelected.fullname}
            </Tag>
          )}
          {optionsSelected.phone && (
            <Tag closable onClose={() => log("phone")}>
              {t("phone", { ns: "statistic" })}: {optionsSelected.phone}
            </Tag>
          )}
          {optionsSelected.position && (
            <Tag closable onClose={() => log("position")}>
              {t("position", { ns: "statistic" })}: {optionsSelected.position}
            </Tag>
          )}
          {optionsSelected.group && (
            <Tag closable onClose={() => log("group")}>
              {t("group", { ns: "statistic" })}: {optionsSelected.group}
            </Tag>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AddFiilterOptions;
