import { IonContent, IonPage } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import PackageStats from '../components/PackageStats/PackageStats';
import Search from '../components/Search/Search';
import UserStats from '../components/UserStats/UserStats';
import './Home.css';

const Home: React.FC = () => {
  const [query, setQuery] = useState({ q: '', t: '', p: '' }); // query, type, period

  const searchHandler = useCallback((q: string, type: string, period: string) => {
    setQuery({ q, t: type, p: period });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Search onSearch={searchHandler} />
        {query.q.trim() && query.t === 'user' ? (
          <UserStats userName={query.q} period={query.p}></UserStats>
        ) : null}
        {query.q.trim() && query.t === 'package' ? (
          <PackageStats packageName={query.q} period={query.p}></PackageStats>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
