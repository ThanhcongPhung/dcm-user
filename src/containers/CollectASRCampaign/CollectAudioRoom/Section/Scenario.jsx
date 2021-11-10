import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTranslation } from 'react-i18next';
import { v4 as uuidV4 } from 'uuid';
import { ASR_QA } from '../../../../constants/asr';

function Scenario({ recordRoom, userRole }) {
  const [result, setResult] = useState('');

  const { t } = useTranslation();

  return (
    <section className="scenario">
      <div className="scenarioText">
        {recordRoom && (
          <div>
            <h3 className="scenario-subtitle">
              {`${t('scenario')} ${recordRoom.scenarioId.name}`}
            </h3>
            <p>
              <>{t('yourRoleIs')}&nbsp;</>
              {userRole === 'client' ? (
                <>
                  <b>{recordRoom.scenarioId.roleUser1.name}</b>
                  <>{t('describeRoleUser')}&nbsp;</>
                  <>{recordRoom.scenarioId.roleUser1.description}</>
                </>
              ) : (
                <>
                  <b>{recordRoom.scenarioId.roleUser2.name}</b>
                  <>{t('describeRoleUser')}&nbsp;</>
                  <>{recordRoom.scenarioId.roleUser2.description}</>
                </>
              )}
            </p>
            {recordRoom.slots.map((slot) => (
              <>
                <p>
                  <>{t('slot')}</>&nbsp;
                  <b>{slot.name}</b>
                </p>
                <p>
                  <>{t('slotValue')}</>&nbsp;
                  <b>{slot.slotValue.name}</b>
                </p>
              </>
            ))}
          </div>
        )}
      </div>
      {userRole === 'servant' && (
        <>
          <Autocomplete
            onChange={(event, value) => {
              if (value !== null) {
                setResult(value.answer);
              } else {
                setResult('');
              }
            }}
            id="id"
            options={ASR_QA}
            getOptionLabel={(option) => option.question}
            className="styleAutoComplete"
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('seeAnswerHere')}
                variant="outlined"
              />
            )}
          />
          {result && (
            <div className="scenarioText1">
              {result.split('*').map((ele) => (
                <ul>
                  <li key={uuidV4()}>{ele}</li>
                </ul>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Scenario;
