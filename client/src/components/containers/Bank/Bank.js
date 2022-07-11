import React from 'react';
import BankMenu from './BankMenu';
import { useState } from 'react';
import QuestionList from './QuestionList';

function Bank(props) {
  const [filters, setFilters] = useState({});
  const onFilterChange = () => {};

  return (
    <div className='question-bank container'>
      <BankMenu onFilterChange={onFilterChange} />
      <QuestionList />
    </div>
  );
}

export default Bank;
