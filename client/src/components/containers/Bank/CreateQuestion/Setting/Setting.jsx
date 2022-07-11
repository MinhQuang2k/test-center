import {
    CheckOutlined
} from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Switch
} from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Setting(props) {
    const { t } = useTranslation('bank');

    const handleChangeQuestionGroup = (value) => {
        console.log(`selected ${value}`);
    };

    const [numberOfCorrect, setNumberOfCorrect] = useState(1);

    const onChangeNumberOfCorrect = (e) => {
        console.log('radio checked', e.target.value);
        setNumberOfCorrect(e.target.value);
    };

    const CheckboxGroup = Checkbox.Group;

    const plainOptions = [
        'PHP',
        'JavaScript (NodeJs)',
        'Java',
        'Python',
        'Ruby',
        'C#',
    ];
    const defaultCheckedList = [];

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChangeCheckBox = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const tabKey = props.tabKey
    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <div className='white_bg pd_20'>
                    <h6>{t('Setting', { ns: 'bank' })}</h6>
                    <Form
                        name='basic'
                        initialValues={{ Score: 1 }}
                        layout='vertical'
                    >
                        {tabKey != 8 && (
                            <Form.Item
                                label={t('Score_Of_Question', { ns: 'bank' })}
                                name='Score'
                                rules={[{ required: true, message: 'bat buoc' }]}
                            >
                                <Input
                                    suffix={
                                        <CheckOutlined
                                            style={{
                                                color: 'rgba(0,0,0,.25)',
                                            }}
                                        />
                                    }
                                />
                            </Form.Item>
                        )}

                        {tabKey == 3 && (
                            <Form.Item
                                name='ScoreMatching'
                                rules={[{ required: true, message: 'bat buoc' }]}
                            >
                                <Radio.Group onChange={onChangeNumberOfCorrect}>
                                    <Radio value={1}>
                                        {t('All_correct_answers', { ns: 'bank' })}
                                    </Radio>
                                    <Radio value={2}>
                                        {t('Each_correct_answer', { ns: 'bank' })}
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}

                        {tabKey == 7 && (
                            <Form.Item
                                name='ScoreFillingBlankSpaces'
                                rules={[{ required: true, message: 'bat buoc' }]}
                            >
                                <Radio.Group onChange={onChangeNumberOfCorrect}>
                                    <Radio value={1}>
                                        {t('Calculate_the_entire_question', {
                                            ns: 'bank',
                                        })}
                                    </Radio>
                                    <Radio value={2}>
                                        {t('Calculate_each_blank', { ns: 'bank' })}
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}

                        <Form.Item
                            label={t('Question_group', { ns: 'bank' })}
                            name='questionGroup'
                        >
                            <Select
                                showSearch
                                placeholder={`-- ${t('Question_group', {
                                    ns: 'bank',
                                })} --`}
                                optionFilterProp='children'
                                filterOption={(input, option) =>
                                    option.children.includes(input)
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children
                                        .toLowerCase()
                                        .localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Select.Option value='1'>
                                    Not Identified
                                </Select.Option>
                                <Select.Option value='2'>Closed</Select.Option>
                                <Select.Option value='3'>Communicated</Select.Option>
                                <Select.Option value='4'>Identified</Select.Option>
                                <Select.Option value='5'>Resolved</Select.Option>
                                <Select.Option value='6'>Cancelled</Select.Option>
                            </Select>
                        </Form.Item>

                        {tabKey == 1 && (
                            <Form.Item
                                label={t('The_number_of_correct_answer', {
                                    ns: 'bank',
                                })}
                                name='numberOfCorrect'
                                rules={[{ required: true, message: 'bat buoc' }]}
                            >
                                <Radio.Group onChange={onChangeNumberOfCorrect}>
                                    <Radio value={1}>
                                        {t('Only_one', { ns: 'bank' })}
                                    </Radio>
                                    <Radio value={2}>{t('Many', { ns: 'bank' })}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}

                        {numberOfCorrect == 2 && tabKey == 1 && (
                            <Form.Item
                                label={t('Scoring_for_multiple_correct_answers', {
                                    ns: 'bank',
                                })}
                                name='scoringForMultipleCorrect'
                                rules={[{ required: true, message: 'bat buoc' }]}
                            >
                                <Radio.Group>
                                    <Radio value={1}>
                                        {t('All_correct_answers2', { ns: 'bank' })}
                                    </Radio>
                                    <Radio value={2}>
                                        {t('Each_correct_answer2', { ns: 'bank' })}
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}

                        <Form.Item
                            label={t('Time_limit', { ns: 'bank' })}
                            name='timeLimit'
                        >
                            <DatePicker picker='time' placeholder='HH:mm:ss' />
                        </Form.Item>

                        {(tabKey == 1 || tabKey == 2) && (
                            <Form.Item
                                label={t('Shuffable_Answer', { ns: 'bank' })}
                                name='shuffableAnswer '

                            >
                                <Switch defaultChecked />
                            </Form.Item>
                        )}
                    </Form>
                </div>
            </Col>
            {tabKey == 5 && (
                <Col span={24}>
                    <div className='white_bg pd_20'>
                        <Row gutter={[16, 16]}>
                            <Col>
                                <b>{t('Allowed_languages', { ns: 'bank' })}</b>
                            </Col>
                            <Col>
                                <CheckboxGroup
                                    options={plainOptions}
                                    value={checkedList}
                                    onChange={onChangeCheckBox}
                                />
                            </Col>
                            <Col>
                                <Button>
                                    <Checkbox
                                        indeterminate={indeterminate}
                                        onChange={onCheckAllChange}
                                        checked={checkAll}
                                    >
                                        {t('Select_All', { ns: 'bank' })}
                                    </Checkbox>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    );
}

export default Setting;