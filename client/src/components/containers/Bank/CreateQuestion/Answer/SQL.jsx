import { Button, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeSql from '../../../../commons/CodeSql';
import Required from '../../../../commons/Required';

function SQL(props) {
  const { t } = useTranslation('bank');

  return (
    <>
      <Col span={24}>
        <div className='white_bg pd_20'>
          <Row gutter={[16, 16]}>
            <Col flex={1}>
              <h6>
                Schema <Required />
              </h6>
            </Col>
            <Col>
              <Button>{t('Download_file_example', { ns: 'bank' })}</Button>
            </Col>
            <Col span={24}>
              <CodeSql />
            </Col>

            <Col span={24}>
              <h6>{t('Table', { ns: 'bank' })}</h6>
              <table>
                <tbody>
                  <tr>
                    <th>{t('Table_name', { ns: 'bank' })}</th>
                    <th>{t('Columns', { ns: 'bank' })}</th>
                    <th>{t('Total_records', { ns: 'bank' })}</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>test 2</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>test 2</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      </Col>

      <Col span={24}>
        <div className='white_bg pd_20'>
          <Row gutter={[16, 16]}>
            <Col>
              <h6>
                {t('Expected_Output', { ns: 'bank' })} <Required />
              </h6>
              <p>{t('The_expected_output', { ns: 'bank' })}</p>
            </Col>
            <Col span={24}>
              <CodeSql />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
}

export default SQL;
