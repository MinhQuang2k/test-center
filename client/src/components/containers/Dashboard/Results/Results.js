import { Progress, Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Results(props) {
  const { t } = useTranslation('dashboard', 'common');
  return (
    <div className='white_bg pdrbl_20'>
      <Tabs>
        <Tabs.TabPane
          tab={t('latest_test_results', { ns: 'dashboard' })}
          key='1'
          className='exam_results'
        >
          <h6>
            {t('latest_test_results', { ns: 'dashboard' })}
          </h6>
          <div className='table'>
            <table >
              <tbody>
                <tr>
                  <th>{t('full_name', { ns: 'dashboard' })}</th>
                  <th>{t('correct_compelete', { ns: 'dashboard' })}</th>
                  <th>{t('score', { ns: 'dashboard' })}</th>
                  <th>{t('duration', { ns: 'dashboard' })}</th>
                  <th>{t('status', { ns: 'dashboard' })}</th>
                </tr>
                <tr>
                  <td>Hoang Duc Nam</td>
                  <td>
                    50.0% <Progress percent={100} showInfo={false} />
                  </td>
                  <td>5</td>
                  <td>00:00:05</td>
                  <td>
                    <span>Đạt</span>
                  </td>
                </tr>
                <tr>
                  <td>Hoang Duc Nam</td>
                  <td>
                    50.0% <Progress percent={100} showInfo={false} />
                  </td>
                  <td>5</td>
                  <td>00:00:05</td>
                  <td>
                    <span>Đạt</span>
                  </td>
                </tr>
                <tr>
                  <td>Hoang Duc Nam</td>
                  <td>
                    50.0% <Progress percent={100} showInfo={false} />
                  </td>
                  <td>5</td>
                  <td>00:00:05</td>
                  <td>
                    <span>Đạt</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='MBTI' key='2'>
          {t('latest_MBTI_exam_results', { ns: 'dashboard' })}
        </Tabs.TabPane>
        <Tabs.TabPane tab='DISC' key='3'>
          {t('latest_DISC_exam_results', { ns: 'dashboard' })}
        </Tabs.TabPane>
        <Tabs.TabPane tab='MI' key='4'>
          {t('latest_MI_exam_results', { ns: 'dashboard' })}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Results;
