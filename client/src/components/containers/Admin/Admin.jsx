import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Col, Layout, Menu, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageLoading from './../../commons/PageLoading';
import { logout } from '../../../slices/userSlice';
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  multiLanguageSelector,
} from '../../../slices/multiLanguage';
import { useTranslation } from 'react-i18next';

const { Header, Sider, Content } = Layout;

function Admin(props) {
  document.title = 'Admin';
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState([]);
  const admin = useSelector((state) => state.user.userLocalStorage);
  const accessTokenLocalStorage = useSelector(
    (state) => state.user.accessTokenLocalStorage,
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('common', 'admin');
  const { language } = useSelector(multiLanguageSelector);

  const handleClick = (language) => {
    if (language === LANGUAGE_VI) {
      dispatch(changeLocales(LANGUAGE_EN));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };

  const accessToken = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL_DEV}/api/token-admin`);
      console.log(1);
    } catch (error) {
      if (error.response) {
        navigate('/');
      }
    }
    setLoading(false);
  };

  const getUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_DEV}/api/users`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenLocalStorage}`,
        },
      },
    );
    setListUser(response.data);
  };

  const searchUser = async (value) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_DEV}/api/search-users/${value}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenLocalStorage}`,
        },
      },
    );
    setListUser(response.data);
  };

  const Logout = async () => {
    try {
      const action = logout();
      await dispatch(action);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    accessToken();
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div className='admin'>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme='light'
            >
              <div className='logo'>
                <svg
                  viewBox='0 0 170 42'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  class='logo'
                >
                  <path
                    d='M27.837 5.65635V5.64985H27.8241L18.0834 0L8.44623 5.58483L8.4527 5.59783H8.44623V17.5412H13.5075V8.52353L18.0834 5.8644L22.7757 8.58855V16.8L27.837 19.7387V5.65635Z'
                    fill='url(#paint0_linear_415_904)'
                  ></path>
                  <path
                    d='M8.44623 36.3437V36.3502H8.4527L18.1999 42L27.8306 36.4152L27.8241 36.4022H27.837V24.4588H22.7757V33.4765L18.1999 36.1356L13.5075 33.4115V25.2L8.44623 22.2678V36.3437Z'
                    fill='url(#paint1_linear_415_904)'
                  ></path>
                  <path
                    d='M31.222 7.58728V25.6161L5.05481 10.4415V10.4285L2.42709 8.90709L0 10.3374V31.4024L5.05481 34.3411V16.3059L31.222 31.4805V31.4935L33.8562 33.0213L36.2833 31.5845V10.5195L31.222 7.58728Z'
                    fill='#7DB548'
                  ></path>
                  <path
                    d='M44.4513 11.4102C44.4646 11.1205 44.5528 10.8393 44.7071 10.5942C44.8615 10.3491 45.0767 10.1486 45.3315 10.0124C45.9676 9.60963 46.7094 9.40804 47.4609 9.43374C48.82 9.43374 49.7521 9.86717 50.2569 10.734L60.3859 24.9399H60.496L60.4571 11.2542C60.4626 10.9906 60.5351 10.7328 60.6676 10.5052C60.8001 10.2776 60.9883 10.0878 61.2144 9.95386C61.7381 9.58955 62.3639 9.40277 63.0007 9.42074C63.6394 9.40364 64.267 9.59028 64.7935 9.95386C65.0179 10.0891 65.2046 10.2793 65.3359 10.5068C65.4672 10.7342 65.5389 10.9913 65.5443 11.2542V30.7913C65.5327 31.0815 65.446 31.3636 65.2928 31.6099C65.1396 31.8561 64.9251 32.058 64.6706 32.1956C64.0332 32.5955 63.2923 32.7968 62.5412 32.7743C61.1345 32.7743 60.2069 32.3669 59.7581 31.552L49.6485 17.2876H49.5385L49.5773 30.9409C49.5712 31.2043 49.4985 31.4619 49.366 31.6894C49.2336 31.9168 49.0457 32.1067 48.8201 32.2412C48.2814 32.5889 47.6546 32.7739 47.0143 32.7739C46.374 32.7739 45.7472 32.5889 45.2085 32.2412C44.9829 32.1067 44.795 31.9168 44.6626 31.6894C44.5301 31.4619 44.4574 31.2043 44.4513 30.9409V11.4102Z'
                    fill='#7DB548'
                  ></path>
                  <path
                    d='M70.1331 11.6183C70.1404 11.3543 70.2144 11.0966 70.348 10.8691C70.4815 10.6417 70.6703 10.4521 70.8968 10.3179C71.4271 9.95146 72.0591 9.7626 72.7025 9.77831H88.1776C88.4648 9.77676 88.7493 9.83355 89.014 9.94528C89.2787 10.057 89.5182 10.2214 89.718 10.4285C89.9181 10.6175 90.0775 10.8457 90.1864 11.099C90.2954 11.3522 90.3516 11.6252 90.3516 11.9011C90.3516 12.177 90.2954 12.4499 90.1864 12.7032C90.0775 12.9564 89.9181 13.1846 89.718 13.3737C89.5152 13.574 89.2742 13.7314 89.0096 13.8364C88.745 13.9413 88.4621 13.9918 88.1776 13.9848H75.272V19.1861H85.6858C85.9692 19.1795 86.251 19.2303 86.5145 19.3353C86.778 19.4403 87.0178 19.5973 87.2197 19.7972C87.4198 19.9863 87.5792 20.2144 87.6881 20.4677C87.7971 20.7209 87.8533 20.9939 87.8533 21.2698C87.8533 21.5457 87.7971 21.8187 87.6881 22.0719C87.5792 22.3252 87.4198 22.5533 87.2197 22.7424C87.0178 22.9423 86.778 23.0993 86.5145 23.2043C86.251 23.3093 85.9692 23.3601 85.6858 23.3535H75.272V28.6263H88.1776C88.4625 28.6205 88.7456 28.6722 89.0102 28.7783C89.2748 28.8844 89.5155 29.0427 89.718 29.2439C89.9181 29.433 90.0775 29.6612 90.1864 29.9144C90.2954 30.1677 90.3516 30.4407 90.3516 30.7165C90.3516 30.9924 90.2954 31.2654 90.1864 31.5187C90.0775 31.7719 89.9181 32.0001 89.718 32.1892C89.5152 32.3895 89.2742 32.5469 89.0096 32.6519C88.745 32.7568 88.4621 32.8073 88.1776 32.8003H72.7025C72.0591 32.816 71.4271 32.6272 70.8968 32.2607C70.6695 32.1275 70.48 31.9381 70.3463 31.7104C70.2126 31.4828 70.1392 31.2246 70.1331 30.9604V11.6183Z'
                    fill='#7DB548'
                  ></path>
                  <path
                    d='M96.4686 13.7963C95.9107 13.7963 95.3757 13.5736 94.9812 13.1774C94.5867 12.7811 94.3651 12.2437 94.3651 11.6833C94.3651 11.1229 94.5867 10.5854 94.9812 10.1891C95.3757 9.79287 95.9107 9.57025 96.4686 9.57025H114.015C114.573 9.57025 115.108 9.79287 115.502 10.1891C115.897 10.5854 116.118 11.1229 116.118 11.6833C116.118 12.2437 115.897 12.7811 115.502 13.1774C115.108 13.5736 114.573 13.7963 114.015 13.7963H107.814V31.2269C107.805 31.4897 107.731 31.7461 107.599 31.9731C107.467 32.2001 107.281 32.3905 107.057 32.5272C106.519 32.8832 105.889 33.0729 105.245 33.0729C104.601 33.0729 103.971 32.8832 103.433 32.5272C103.207 32.3917 103.02 32.2018 102.886 31.9746C102.753 31.7475 102.678 31.4905 102.669 31.2269V13.7963H96.4686Z'
                    fill='#7DB548'
                  ></path>
                  <path
                    d='M120.319 10.7015C120.325 10.4282 120.401 10.1612 120.54 9.92566C120.678 9.69014 120.874 9.49397 121.108 9.3557C121.669 8.99049 122.323 8.79615 122.992 8.79615C123.66 8.79615 124.314 8.99049 124.875 9.3557C125.109 9.4949 125.304 9.6913 125.442 9.92661C125.58 10.1619 125.657 10.4285 125.665 10.7015V31.1879C125.657 31.4619 125.581 31.7296 125.443 31.966C125.305 32.2025 125.11 32.4 124.875 32.5402C124.313 32.9008 123.659 33.0924 122.992 33.0924C122.324 33.0924 121.671 32.9008 121.108 32.5402C120.873 32.4014 120.676 32.2042 120.538 31.9674C120.4 31.7307 120.324 31.4623 120.319 31.1879V10.7015ZM133.38 20.948L142.182 29.6015C142.375 29.7771 142.518 30.0004 142.597 30.2492C142.677 30.498 142.69 30.7634 142.635 31.0189C142.507 31.6175 142.155 32.1438 141.651 32.4882C141.133 32.8908 140.501 33.1184 139.845 33.1384C139.551 33.1502 139.258 33.0983 138.985 32.9861C138.713 32.8739 138.468 32.7041 138.266 32.4882L128.06 22.6254C127.822 22.4166 127.631 22.1586 127.502 21.8691C127.372 21.5796 127.306 21.2654 127.309 20.948C127.307 20.6297 127.373 20.3146 127.502 20.0241C127.632 19.7336 127.822 19.4744 128.06 19.2641L138.266 9.40121C138.466 9.18359 138.711 9.01262 138.984 8.9003C139.257 8.78798 139.551 8.73703 139.845 8.75105C140.501 8.76739 141.134 8.99535 141.651 9.40121C142.156 9.74813 142.508 10.2765 142.635 10.8771C142.689 11.1315 142.676 11.3958 142.597 11.6435C142.517 11.8911 142.374 12.1134 142.182 12.2879L133.38 20.948Z'
                    fill='#7DB548'
                  ></path>
                  <path
                    d='M158.498 33.1124C156.971 33.133 155.457 32.8312 154.053 32.2264C152.649 31.6216 151.388 30.7273 150.35 29.6016C148.197 27.2371 147.004 24.1489 147.004 20.9447C147.004 17.7406 148.197 14.6524 150.35 12.2879C151.399 11.1805 152.661 10.2987 154.059 9.69617C155.458 9.09365 156.964 8.78296 158.486 8.78296C160.007 8.78296 161.513 9.09365 162.912 9.69617C164.31 10.2987 165.572 11.1805 166.621 12.2879C168.793 14.6427 170 17.7345 170 20.9447C170 24.155 168.793 27.2468 166.621 29.6016C165.587 30.7253 164.33 31.6185 162.931 32.2233C161.532 32.8281 160.022 33.131 158.498 33.1124V33.1124ZM165.767 20.948C165.803 18.8724 165.046 16.8619 163.65 15.3307C163.005 14.5991 162.212 14.0133 161.325 13.6122C160.437 13.2111 159.475 13.0037 158.502 13.0037C157.528 13.0037 156.566 13.2111 155.679 13.6122C154.791 14.0133 153.999 14.5991 153.353 15.3307C151.989 16.8861 151.236 18.888 151.236 20.961C151.236 23.034 151.989 25.0359 153.353 26.5913C154.003 27.3156 154.797 27.8947 155.684 28.2911C156.571 28.6875 157.531 28.8923 158.502 28.8923C159.472 28.8923 160.432 28.6875 161.319 28.2911C162.206 27.8947 163 27.3156 163.65 26.5913C165.05 25.0525 165.808 23.0322 165.767 20.948V20.948Z'
                    fill='#7DB548'
                  ></path>
                  <defs>
                    <linearGradient
                      id='paint0_linear_415_904'
                      x1='18.1416'
                      y1='0'
                      x2='18.1416'
                      y2='19.7387'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#7DB548'></stop>
                      <stop offset='1' stopColor='#009444'></stop>
                    </linearGradient>
                    <linearGradient
                      id='paint1_linear_415_904'
                      x1='551.97'
                      y1='1319.07'
                      x2='551.97'
                      y2='719.998'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#7DB548'></stop>
                      <stop offset='1' stopColor='#009444'></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <Link to='/admin/user'> {t('User', { ns: 'admin' })}</Link>,
                  },
                  {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: t('Setting', { ns: 'admin' }),
                  },
                ]}
              />
            </Sider>
            <Layout className='site-layout'>
              <Header className='site-layout-background'>
                <Row justify='space-between'>
                  <Col>
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                      },
                    )}
                  </Col>
                  <Col>
                    <h5> {t('Hello', { ns: 'admin' })}: {admin.name}</h5>
                  </Col>
                  <Col>
                    <Button type='link' onClick={() => handleClick(language)}>
                      {t('header.language')} <img className='language' alt='lag' src={t('header.img')} />
                    </Button>
                    <Button onClick={Logout}> {t('Logout', { ns: 'admin' })}</Button>
                  </Col>
                </Row>
              </Header>
              <Content>
                <Outlet context={[getUser, searchUser, listUser]} />
              </Content>
            </Layout>
          </Layout>
        </div>
      )}
    </>
  );
}

export default Admin;
