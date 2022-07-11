import { useState } from "react"
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { Tooltip, Typography, Button, Modal, notification } from "antd"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  deleteQuestionGroup,
  updateQuestionGroup,
} from "../../../slices/questionGroup"
const { Paragraph } = Typography

function QuestionItem({ question }) {
  const { t } = useTranslation("category", "common")
  const [questionName, setQuestionName] = useState(question?.name)
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()
  const onRemove = () => {
    Modal.confirm({
      title: `${t("are_you_sure_delete_question_group", { ns: "category" })} ${
        question.name
      }`,
      icon: <ExclamationCircleOutlined />,
      okText: t("button.ok", { ns: "common" }),
      cancelText: t("button.cancel", { ns: "common" }),
      onOk: onOk,
    })
  }
  const onOk = () => {
    dispatch(deleteQuestionGroup({ id: question.id, notification, t }))
  }
  const onEnd = () => {
    setEditMode(!editMode)
  }
  const switchEditMode = () => {
    setQuestionName(question?.name)
    setEditMode(!editMode)
  }
  const onEditEnd = async () => {
    const data = await dispatch(
      updateQuestionGroup({
        questionGp: { ...question, name: questionName },
        notification,
        t,
      })
    )
    if (!data || !data.payload?.success) {
      setQuestionName(question?.name)
    } else {
      setQuestionName(data.payload?.name)
    }

    setEditMode(!editMode)
  }
  return (
    <div className="question">
      <div className="question-item">
        <div className="question-item-header">
          <Paragraph
            editable={{
              editing: editMode,
              onChange: setQuestionName,
              onEnd: onEnd,
            }}
          >
            {questionName}
          </Paragraph>
        </div>
        {editMode ? (
          <div className="edit-mode">
            <Button className="btn-gray" onClick={switchEditMode}>
              {t("button.cancel", { ns: "common" })}
            </Button>
            <Button className="btn-primary" onClick={onEditEnd}>
              {t("button.update", { ns: "common" })}
            </Button>
          </div>
        ) : (
          <div className="question-item-option">
            <Tooltip title={t("button.update", { ns: "common" })}>
              <EditOutlined onClick={switchEditMode} />
            </Tooltip>
            <Tooltip title={t("button.delete", { ns: "common" })}>
              <DeleteOutlined onClick={onRemove} />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionItem
