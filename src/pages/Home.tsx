import { IonAlert, IonContent, IonPage } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import PackageStats from '../components/PackageStats/PackageStats';
import Search from '../components/Search/Search';
import UserStats from '../components/UserStats/UserStats';
import './Home.css';

const Home: React.FC = () => {
  const [query, setQuery] = useState({ q: '', t: '', p: '' }); // query, type, period
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Something went considerably wrong, I swear it worked on my machine! :('
  );

  const searchHandler = useCallback((q: string, type: string, period: string) => {
    setQuery({ q, t: type, p: period });
  }, []);

  const errorHandler = useCallback((e: Error) => {
    console.log(e);

    if (e.message === 'not found') {
      setErrorMessage('Package not found!');
    } else {
      setErrorMessage('Something went considerably wrong, I swear it worked on my machine! :(');
    }
    setShowAlert(true);
    setQuery({ q: '', t: '', p: '' });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Search onSearch={searchHandler} />
        {query.q.trim() && query.t === 'user' ? (
          <UserStats onError={errorHandler} userName={query.q} period={query.p}></UserStats>
        ) : null}
        {query.q.trim() && query.t === 'package' ? (
          <PackageStats
            onError={errorHandler}
            packageName={query.q}
            period={query.p}
          ></PackageStats>
        ) : null}
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Oh Oh!'}
        subHeader={'hmm..'}
        message={errorMessage}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Home;
