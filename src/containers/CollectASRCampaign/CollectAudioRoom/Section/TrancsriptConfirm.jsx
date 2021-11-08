import React, { useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useForm, Form } from '../../../../components/PopupForm/useForm';
import TextArea from '../../../../components/TextArea';

const initialFValues = {
  audioLink: '',
  manualTranscript: '',
};
export default function TranscriptConfirm({ audioForEdit, setSubmitScript }) {
  const { t } = useTranslation();
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('manualTranscript' in fieldValues)
      temp.manualTranscript = fieldValues.manualTranscript
        ? ''
        : t('fieldCannotEmpty');
    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitScript(values, resetForm);
  };

  useEffect(() => {
    if (audioForEdit != null) setValues({ ...audioForEdit });
  }, [audioForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container className="scriptConfirmGrid">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls controlsList="nodownload" preload="auto" autoPlay>
          <source src={values.audioLink} type="audio/wav" />
        </audio>
        <TextArea
          name="manualTranscript"
          label={t('content')}
          value={values.manualTranscript}
          error={errors.manualTranscript}
          onChange={handleInputChange}
        />
        <div className="buttonConfirm">
          <Button type="submit" variant="contained">
            {t('confirm')}
          </Button>
        </div>
      </Grid>
    </Form>
  );
}
