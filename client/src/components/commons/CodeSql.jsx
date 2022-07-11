import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';

function CodeSql(props) {
  const { isReadOnly } = props;
  const [code, setCode] = React.useState(
    `-- Create table and insert rows using SQL. Sample below

CREATE TABLE employees
  (
     id   INT,
     name VARCHAR(255)
  );

INSERT INTO employees (id, name) VALUES (1, 'Matt');
INSERT INTO employees (id, name) VALUES (2, 'John');`,
  );

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <div>
      <div className='change_languages'>
        <b>MySQL </b>
      </div>

      <Editor
        height='500px'
        theme='vs-dark'
        defaultLanguage='sql'
        defaultValue={code}
        onMount={handleEditorDidMount}
        options={{ readOnly: isReadOnly ? true : false }}
      />
    </div>
  );
}

export default CodeSql;
