import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonSkeletonText
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';
import { theme } from '../../utils/victoryTheme';
import './PackageStats.css';

const PackageStats = ({ packageName, period }) => {
  const [loaded, setLoaded] = useState(false);

  const [packageData, setPackageData] = useState({
    downloads: [],
    end: '',
    package: '',
    start: ''
  });
  useEffect(() => {
    fetch(`https://api.npmjs.org/downloads/range/${period}/${packageName}`)
      .then(response => response.json())
      .then(data => {
        setLoaded(true);
        setPackageData(data);
        console.log(data);
      });
  }, [packageName, period]);

  return (
    <div>
      <IonCard>
        {loaded ? (
          <div className={'single-package-chart'}>
            <VictoryChart theme={theme} width={1100} height={400}>
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                data={packageData.downloads.map((e: any, i) => ({
                  x: i + 1,
                  y: e.downloads,
                  label: `${e.downloads}\n${e.day}`
                }))}
              />
            </VictoryChart>
          </div>
        ) : (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        )}

        <IonCardHeader>
          <IonCardSubtitle>
            {loaded ? (
              `Total Downloads: ${packageData.downloads.reduce(function (
                accumulator,
                currentValue: any
              ) {
                return accumulator + currentValue.downloads;
              },
              0)}`
            ) : (
              <IonSkeletonText animated style={{ width: '50px' }}></IonSkeletonText>
            )}
          </IonCardSubtitle>
          <IonCardTitle>
            {loaded ? (
              `${packageData.package}`
            ) : (
              <IonSkeletonText animated style={{ width: '90px' }}></IonSkeletonText>
            )}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {loaded ? (
            `${packageData.start} ... ${packageData.end}`
          ) : (
            <IonSkeletonText animated style={{ width: '50%' }}></IonSkeletonText>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default PackageStats;
