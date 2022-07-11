import { Button, Col, Input, message, Modal, Row, Space, Table } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import Edit from './Edit';

function User(props) {
  const { t } = useTranslation('admin');
  const [getUser, searchUser, listUser] = useOutletContext();
  const accessTokenLocalStorage = useSelector(
    (state) => state.user.accessTokenLocalStorage,
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: t('Name', { ns: 'admin' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
    },
    {
      title: t('Action', { ns: 'admin' }),
      render: (_, record) => (
        <>
          <Edit user={record} getUser={getUser} />
          <Button type='link' onClick={() => warning(record.name, record.id)}>
            {t('Delete', { ns: 'admin' })}
          </Button>
        </>
      ),
    },
  ];

  const warning = (name, id) => {
    Modal.confirm({
      title: t('Notification', { ns: 'admin' }),
      content: `${t('Are_you_sure_you_want_to_delete_user', { ns: 'admin' })} ${name}?`,
      okText: t('Delete', { ns: 'admin' }),
      cancelText: t('Cancel', { ns: 'admin' }),
      onOk() {
        deleteUser(id);
        console.log(id);
      },
    });
  };

  const deleteUser = async (idUser) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL_DEV}/api/delete/${idUser}`,
        {
          headers: {
            Authorization: `Bearer ${accessTokenLocalStorage}`,
          },
        },
      );
      getUser();
      message.success(t('Delete_successful', { ns: 'admin' }));
    } catch (error) {
      if (error.response) {
        message.success(t('Delete_failure', { ns: 'admin' }));
      }
    }
  };

  const onSearch = (value) => {
    if (!value) {
      getUser();
    } else {
      searchUser(value);
    }
  };

  return (
    <div className='user'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h6>{t('User', { ns: 'admin' })}</h6>
        </Col>
        <Col>
          <Space direction='vertical'>
            <Input.Search
              onSearch={onSearch}
              placeholder={t('Enter_keywords', { ns: 'admin' })}
              allowClear
              enterButton={t('Search', { ns: 'admin' })}
            />
          </Space>
        </Col>

        <Col span={24}>
          <Table dataSource={listUser} columns={columns} />
        </Col>
      </Row>
    </div>
  );
}

export default User;
