import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

function TinyMCE(props) {
  const { t } = useTranslation('bank');
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log('cau hoi', editorRef.current.getContent());
    }
  };
  return (
    <div>
      <Editor
        apiKey='b3m4owtz9mxa6zl1otn948snen4m5np54rm3w5s6a5zny4kz'
        cloudChannel='5-stable'
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          statusbar: false,
          menubar: false,
          inline: true,
          placeholder: t('enter_content', { ns: 'bank' }),
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste help autoresize',
          ],
          images_upload_url: 'postAcceptor.php',
          automatic_uploads: false,
          toolbar_mode: 'sliding',
          toolbar:
            ' bold italic underline | forecolor backcolor casechange ' +
            ' permanentpen formatpainter | numlist bullist checklist | ' +
            ' image media pageembed template link |alignleft aligncenter alignright alignjustify |  ',
          // content_style:
          //   ' tox-tinymce { margin: 10px; border: 5px solid red; padding: 3px; }',
          // branding: false,

        }}
      />

    </div>
  );
}

export default TinyMCE;
