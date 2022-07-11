import React from 'react';
import { Row, Col, Breadcrumb, Select, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const { Option } = Select;

function QuestionStatistic(props) {

  const { t } = useTranslation('testCampaign')


  const handleChange = (value) => {
    //console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    //console.log(value);
  }

  return (
    <div className='question_statistic'>
      <Row gutter={[24, 24]} >
        <Col span={24}>
          <Breadcrumb >
            <Breadcrumb.Item>
              <Link to="/test-campaigns"><span>{t('test_campaign', { ns: 'testCampaign' })} </span></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/test-campaigns/:id/result"><span>test1</span></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {t('Question_statistic', { ns: 'testCampaign' })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <h4>test1</h4>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col>
              <Select defaultValue="1" style={{ width: 200 }} onChange={handleChange}>
                <Option value="1">{t('Most_correct', { ns: 'testCampaign' })} </Option>

                <Option value="2">{t('Most_wrong', { ns: 'testCampaign' })}</Option>
              </Select>
            </Col>
            <Col flex={1}>
              <Input.Search placeholder={t('Enter_keyword', { ns: 'testCampaign' })} onSearch={onSearch} style={{ width: 200 }} />
            </Col>

            <Col>
              <Link to="/test-campaigns/:id/result"><Button type="primary">{t('Back_to_campaign_result', { ns: 'testCampaign' })}</Button></Link>
            </Col>
          </Row>
        </Col>
        <Col span={24} >
          <div className='white_bg pd_20'>
            <table>
              <tbody>
                <tr >
                  <th>{t('QUESTION', { ns: 'testCampaign' })}</th>
                  <th>{t('TOTAL_CORRECT_ANS', { ns: 'testCampaign' })}</th>
                  <th>{t('TOTAL_WRONG_ANS', { ns: 'testCampaign' })}</th>
                  <th>{t('TOTAL_HAS_NO_ANS', { ns: 'testCampaign' })}</th>
                </tr>
                <tr>
                  <td>12</td>
                  <td>1</td>
                  <td>5</td>
                  <td>5</td>
                </tr>

              </tbody>
            </table>
          </div>

        </Col>
      </Row>
    </div>
  );
}

export default QuestionStatistic;