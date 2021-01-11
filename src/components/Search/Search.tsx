import { IonButton, IonCard, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import './Search.css';

const Search: React.FC<{ onSearch }> = ({ onSearch }) => {
  const [text, setText] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Search User');
  const [searchType, setSearchType] = useState<string>('user');
  const [searchTime, setSearchTime] = useState<string>('last-week');

  const timeChangeHander = useCallback(() => {
    if (text.trim()) {
      onSearch(text, searchType, searchTime);
    }
  }, [text, searchType, searchTime, onSearch]);

  const enterHandler = useCallback(
    event => {
      if (text.trim() && event.key === 'Enter') {
        onSearch(text, searchType, searchTime);
      }
    },
    [text, searchType, searchTime, onSearch]
  );

  useEffect(() => {
    timeChangeHander();
    // eslint-disable-next-line
  }, [searchTime]);

  return (
    <div className="search">
      <IonCard>
        <div className="search__row">
          <IonInput
            value={text}
            placeholder={placeholder}
            onIonChange={e => setText(e.detail.value!)}
            onKeyPress={enterHandler}
          ></IonInput>
          <IonButton
            className="search__button"
            color="primary"
            onClick={e => onSearch(text, searchType, searchTime)}
          >
            Search
          </IonButton>
        </div>
        <div className="search__row">
          <IonSelect
            className="search__select"
            value={searchType}
            okText="Okay"
            cancelText="Dismiss"
            onIonChange={e => {
              setSearchType(e.detail.value);
              setPlaceholder(e.detail.value === 'user' ? 'Search User' : 'Search Package');
            }}
          >
            <IonSelectOption value="user">User</IonSelectOption>
            <IonSelectOption value="package">Package</IonSelectOption>
          </IonSelect>
          <IonSelect
            className="search__select"
            value={searchTime}
            okText="Okay"
            cancelText="Dismiss"
            onIonChange={e => setSearchTime(e.detail.value)}
          >
            <IonSelectOption value="last-day">Last Day</IonSelectOption>
            <IonSelectOption value="last-week">Last Week</IonSelectOption>
            <IonSelectOption value="last-month">Last Month</IonSelectOption>
            <IonSelectOption value="last-year">Last Year</IonSelectOption>
          </IonSelect>
        </div>
      </IonCard>
    </div>
  );
};

export default Search;
