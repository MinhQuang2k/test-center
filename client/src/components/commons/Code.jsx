import Editor from '@monaco-editor/react';
import { Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeLanguage } from './../../utils/utils';

function Code(props) {
  const { isReadOnly } = props;
  const { t } = useTranslation('bank');

  const [code, setCode] = React.useState(CodeLanguage.Js);

  const [language, setLanguage] = useState('javascript');

  const handleChangeLanguage = (value) => {
    if (value === '1') {
      setCode(CodeLanguage.PHP);
      setLanguage('php');
    }
    if (value === '2') {
      setCode(CodeLanguage.Python);
      setLanguage('python');
    }
    if (value === '3') {
      setCode(CodeLanguage.Js);
      setLanguage('javascript');
    }
    if (value === '4') {
      setCode(CodeLanguage.Java);
      setLanguage('java');
    }
    if (value === '5') {
      setCode(CodeLanguage.Ruby);
      setLanguage('ruby');
    }
    if (value === '6') {
      setCode(CodeLanguage.C);
      setLanguage('c');
    }
  };

  function onChange(value) {
    // console.log(value)
  }

  return (
    <>
      <div className='change_languages'>
        <b>{t('Language', { ns: 'bank' })} </b>
        <span>
          <Select defaultValue='3' onChange={handleChangeLanguage}>
            <Select.Option value='1'>PHP</Select.Option>
            <Select.Option value='2'>Python</Select.Option>
            <Select.Option value='3'>Javascript (NodeJs)</Select.Option>
            <Select.Option value='4'>Java</Select.Option>
            <Select.Option value='5'>Ruby</Select.Option>
            <Select.Option value='6'>C#</Select.Option>
          </Select>
        </span>
      </div>
      <Editor
        height='500px'
        theme='vs-dark'
        language={language}
        value={code}
        onChange={onChange}
        options={{ readOnly: isReadOnly ? true : false }}
      />
    </>
  );
}

export default Code;
