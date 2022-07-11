import { Form, Button, Input, notification } from "antd"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { addQuestionGroup } from "../../../../slices/questionGroup"

function AddQuestionGroup({ onCancel }) {
  const { t } = useTranslation("category", "common")
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  useEffect(() => {
    return () => form.resetFields()
  })
  const onFinish = (values) => {
    dispatch(addQuestionGroup({ questionGp: { ...values }, notification, t }))

    onCancel()
  }
  return (
    <Form
      name="testChildGroupForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        style={{ fontWeight: "500" }}
        name="name"
        label={t("tag_name", { ns: "category" })}
        rules={[
          {
            required: true,
            message: `${t("the_tag_name_field_is_required", {
              ns: "category",
            })}`,
          },
        ]}
      >
        <Input
          placeholder={t("your_input_here", {
            ns: "category",
          })}
        />
      </Form.Item>
      <Form.Item className="form-footer ">
        <Button
          type="default"
          htmlType="button"
          className="btn-gray"
          onClick={onCancel}
        >
          {t("button.cancel", { ns: "common" })}
        </Button>
        <Button type="primary" htmlType="submit" className="btn-primary">
          {t("button.save", { ns: "common" })}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddQuestionGroup
