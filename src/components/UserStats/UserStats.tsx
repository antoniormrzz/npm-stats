import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
  IonSelect,
  IonSelectOption,
  IonProgressBar
} from '@ionic/react';
import React, { useState } from 'react';
import './UserStats.css';

const UserStats = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <IonCard>
        {loaded ? null : <IonProgressBar type="indeterminate"></IonProgressBar>}
        <IonCardHeader>
          <IonCardSubtitle>
            {loaded ? (
              'Total Packages: 3'
            ) : (
              <IonSkeletonText animated style={{ width: '50px' }}></IonSkeletonText>
            )}
          </IonCardSubtitle>
          <IonCardTitle>
            {loaded ? (
              'Username'
            ) : (
              <IonSkeletonText animated style={{ width: '90px' }}></IonSkeletonText>
            )}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {loaded ? (
            'Total Downloads in period for non-scoped packages: 30'
          ) : (
            <IonSkeletonText animated style={{ width: '50%' }}></IonSkeletonText>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default UserStats;
