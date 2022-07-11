import { Form, Row, Col, Button, Select, InputNumber, Radio } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { updateConfig, testSelector } from '../../../../../slices/test'
function TestSetting({ closeModal }) {
  const { t } = useTranslation('test', 'common')
  const dispatch = useDispatch()
  const { test } = useSelector(testSelector)
  const [form] = Form.useForm()
  const onFinish = (values) => {
    dispatch(updateConfig({ ...values, id: test.id }))
    closeModal()
  }
  useEffect(() => {
    return () => form.resetFields()
  })
  return (
    <Form name="setting" form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        style={{ fontWeight: '500' }}
        name="is_all_question_shown"
        label={t('display_setting', { ns: 'test' })}
        rules={[
          {
            required: true,
            message: `${t('this_is_required_information', { ns: 'test' })}`,
          },
        ]}
        initialValue={0}
      >
        <Select
          placeholder={t('show_only_one_question_per_page', { ns: 'test' })}
        >
          <Select.Option value={0}>
            {t('show_only_one_question_per_page', { ns: 'test' })}
          </Select.Option>
          <Select.Option value={1}>
            {t('show_all_questions_per_page', { ns: 'test' })}
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        style={{ fontWeight: '500' }}
        name="language"
        label={t('language_setting', { ns: 'test' })}
        rules={[
          {
            required: true,
            message: `${t('this_is_required_information', { ns: 'test' })}`,
          },
        ]}
        initialValue="VN"
      >
        <Select placeholder="Tiếng Việt">
          <Select.Option value="VN">Tiếng Việt</Select.Option>
          <Select.Option value="EN">Tiếng Anh</Select.Option>
        </Select>
      </Form.Item>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            style={{ fontWeight: '500' }}
            name="duration"
            label={t('time_limit_(minutes)', { ns: 'test' })}
            rules={[
              {
                required: true,
                message: `${t('this_is_required_information', { ns: 'test' })}`,
              },
            ]}
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: '90%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{ fontWeight: '500' }}
            name="is_question_shuffled"
            label={t('shuffle_question', { ns: 'test' })}
            rules={[
              {
                required: true,
                message: `${t('this_is_required_information', { ns: 'test' })}`,
              },
            ]}
            initialValue={0}
          >
            <Radio.Group>
              <Radio value={1}>{t('choose.yes', { ns: 'common' })}</Radio>
              <Radio value={0}>{t('choose.no', { ns: 'common' })}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        style={{ fontWeight: '500' }}
        name="audio_type"
        label={t('question_contains_audio_file', { ns: 'test' })}
        rules={[
          {
            required: true,
            message: `${t('this_is_required_information', { ns: 'test' })}`,
          },
        ]}
        initialValue={1}
      >
        <Radio.Group style={{ display: 'flex' }}>
          <Radio value={1}>
            {t('listen_only_once/dont_stop', { ns: 'test' })}
          </Radio>
          <Radio value={0}>
            {t('can_listen_repeatedly/pause_is_allowed', { ns: 'test' })}
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item className="form-footer ">
        <Button
          type="default"
          htmlType="button"
          className="btn-gray"
          onClick={closeModal}
        >
          {t('button.cancel', { ns: 'common' })}
        </Button>
        <Button type="primary" htmlType="submit" className="btn-primary">
          {t('button.save', { ns: 'common' })}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TestSetting
