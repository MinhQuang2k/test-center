import React from 'react';
import { DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { Select } from 'antd';
import Search from 'antd/lib/input/Search';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const { Option } = Select;

function BankMenu({ onFilterChange }) {
  const { t } = useTranslation('bank');
  const handleSearch = (values) => {
    console.log(values);
  };
  const handleMenuClick = (e) => {
    console.log(e.key);
  };
  const handleOnChange = (value) => {
    console.log(value);
  };
  const handleSubmit = () => { };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: t('Add_new_question', { ns: 'bank' }),
          key: '1',
        },
        {
          label: t('Import_spreadsheet', { ns: 'bank' }),
          key: '2',
        },
        {
          label: t('Import_from_markdown_file', { ns: 'bank' }),
          key: '3',
        },
      ]}
    />
  );
  return (
    <div className='menu'>
      <div className='option'>
        <Search
          placeholder={t('Search_question', { ns: 'bank' })}
          style={{ width: 400 }}
          defaultValue=''
          loading={false}
          onSearch={handleSearch}
        />
        <Select
          className='select'
          showSearch
          style={{
            width: 200,
          }}
          size='large'
          placeholder={t('Question_group', { ns: 'bank' })}
          optionFilterProp='children'
          filterOption={(input, option) =>
            option.children
              .toLocaleLowerCase()
              .includes(input.toLocaleLowerCase())
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={handleOnChange}
        >
          <Option value='1'>Not Identified</Option>
          <Option value='2'>Closed</Option>
          <Option value='3'>Communicated</Option>
          <Option value='4'>Identified</Option>
          <Option value='5'>Resolved</Option>
          <Option value='6'>Cancelled</Option>
        </Select>
      </div>
      <Dropdown.Button
        className='create-question'
        size='large'
        icon={<DownOutlined />}
        overlay={menu}
        onClick={handleSubmit}
      >
        <Link to='/bank/create-question' state={{ update: false }}><PlusSquareOutlined /> {t('New_question', { ns: 'bank' })}</Link>
      </Dropdown.Button>
    </div>
  );
}

export default BankMenu;
