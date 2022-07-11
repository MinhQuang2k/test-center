import HeaderDoTest from '../components/commons/HeaderDoTest';
import LayoutComponent from '../components/commons/LayoutComponent';
import LayoutWeb from '../components/commons/LayoutWeb';
import ChangePassword from '../components/containers/Account/ ChangePassword';
import Account from '../components/containers/Account/Account';
import AccountInfo from '../components/containers/Account/AccountInfo';
import CreateCertificate from '../components/containers/Account/CreateCertificate';
import ManageCertificate from '../components/containers/Account/ManageCertificate';
import Admin from '../components/containers/Admin/Admin';
import User from '../components/containers/Admin/User/User';
import Bank from '../components/containers/Bank/Bank';
import CreateQuestion from '../components/containers/Bank/CreateQuestion/CreateQuestion';
import Campaigns from '../components/containers/Campaigns/Campaigns';
import Dashboard from '../components/containers/Dashboard/Dashboard';
import DoTest from '../components/containers/DoTest/DoTest';
import ExamQuestions from '../components/containers/DoTest/ExamQuestions/ExamQuestions';
import Guide from '../components/containers/DoTest/Guide/Guide';
import InfoCollect from '../components/containers/DoTest/InfoCollect/InfoCollect';
import JoinTest from '../components/containers/DoTest/JoinTest/JoinTest';
import Login from '../components/containers/Login/CarouselLogin';
import ForgetPassword from '../components/containers/Login/ForgetPassword';
import LoginForm from '../components/containers/Login/LoginForm';
import RegisterForm from '../components/containers/Login/RegisterForm';
import AnswerSheets from '../components/containers/Statistic/AnswerSheets/AnswerSheets';
import ListStatisticTest from '../components/containers/Statistic/ListStatistic/ListStatisticTest';
import ListStatisticTestCampaign from '../components/containers/Statistic/ListStatistic/ListStatisticTestCampaign';
import ResetPassword from '../components/containers/Login/ResetPassword';
import ResultsStatistic from '../components/containers/Statistic/ResultsStatistic/ResultsStatistic';
import Statistic from '../components/containers/Statistic/Statistic';
import TestSection from '../components/containers/Test/TestEdit/HasSection/TestSection';
import TestEdit from '../components/containers/Test/TestEdit/TestEdit';
import TestResult from '../components/containers/Test/TestResult/TestResult';
import Tests from '../components/containers/Test/TestRoute/Tests';
import CreateCampaign from '../components/containers/TestCampaigns/CreateCampaign/CreateCampaign';
import Preview from '../components/containers/TestCampaigns/CreateCampaign/Preview/Preview';
import QuestionStatistic from '../components/containers/TestCampaigns/QuestionStatistic/QuestionStatistic';
import ResultCampaign from '../components/containers/TestCampaigns/ResultCampaign/ResultCampaign';
import TestCampaigns from '../components/containers/TestCampaigns/TestCampaigns';
import TestCategory from '../components/containers/TestCategories/TestCategory';
import HeaderResult from '../components/commons/HeadResult';

export const routes = [
  {
    path: '/',
    element: <LayoutWeb />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: '/test-categories',
        element: <TestCategory />,
      },
      {
        path: '/question-tags',
        element: <TestCategory />,
      },
      {
        path: '/tests',
        element: <LayoutComponent />,
        children: [
          { index: true, element: <Tests /> },
          {
            path: '/tests/:id/edit',
            element: <TestEdit />,
          },
          {
            path: '/tests/:id/result',
            element: <TestResult />,
          },
        ],
      },
      {
        path: 'results/:id',
        element: <ResultsStatistic />,
      },
      {
        path: '/test-campaigns',
        element: <LayoutComponent />,
        children: [
          { index: true, element: <TestCampaigns /> },
          {
            path: '/test-campaigns/create',
            element: <CreateCampaign />,
          },
          {
            path: '/test-campaigns/:id/result',
            element: <ResultCampaign />,
          },
          {
            path: '/test-campaigns/:id/edit',
            element: <Preview />,
          },
          {
            path: '/test-campaigns/:id/question-statistic',
            element: <QuestionStatistic />,
          },
        ],
      },

      {
        path: 'results/:id',
        element: <ResultsStatistic />,
      },

      {
        path: 'results/:id',
        element: <ResultsStatistic />,
      },
      {
        path: '/bank',
        element: <LayoutComponent />,
        children: [
          { index: true, element: <Bank /> },
          {
            path: '/bank/create-question',
            element: <CreateQuestion />,
          },
          {
            path: '/bank/question/:id/edit',
            element: <CreateQuestion />,
          },
        ],
      },
      {
        path: '/campaigns',
        element: <Campaigns />,
      },
      {
        path: '/statistic',
        element: <Statistic />,
        children: [
          {
            path: '/statistic/campaigns',
            element: <ListStatisticTestCampaign />,
          },
          {
            path: '/statistic/tests',
            element: <ListStatisticTest />,
          },
          {
            path: '/statistic/answer-sheets',
            element: <AnswerSheets />,
          },
        ],
      },

      {
        path: '/account',
        element: <Account />,
        children: [
          {
            path: '/account/profile',
            element: <AccountInfo />,
          },
          {
            path: '/account/manage-certificates',
            element: <ManageCertificate />,
          },
          {
            path: '/account/change-password',
            element: <ChangePassword />,
          },
          {
            path: '/account/integrated',
          },
        ],
      },
      {
        path: '/account/manage-certificates/create',
        element: <CreateCertificate />,
      },
    ],
  },
  {
    path: '/do-test',
    element: <DoTest />,
    children: [
      { index: true, element: <JoinTest /> },
      {
        path: '/do-test/info-collect',
        element: <InfoCollect />,
      },
    ],
  },
  {
    path: '/do-test-in-single',
    element: <HeaderDoTest />,
    children: [
      { index: true, element: <Guide /> },
      {
        path: '/do-test-in-single/exam-question',
        element: <ExamQuestions />,
      },
    ],
  },
  {
    path: '/result',
    element: <HeaderResult />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <User />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
];

// config router https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src%2FApp.tsx
