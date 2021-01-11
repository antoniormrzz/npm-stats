import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonProgressBar,
  IonSkeletonText
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';
import handleErrors from '../../utils/handleFetchErrors';
import { theme } from '../../utils/victoryTheme';
import './PackageStats.css';

const PackageStats = ({ packageName, period, onError }) => {
  const [loaded, setLoaded] = useState(false);

  const [packageData, setPackageData] = useState({
    downloads: [],
    end: '',
    package: '',
    start: ''
  });
  useEffect(() => {
    fetch(`https://api.npmjs.org/downloads/range/${period}/${packageName}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        setLoaded(true);
        setPackageData(data);
      })
      .catch(e => {
        onError(e);
      });
  }, [packageName, period, onError]);

  return (
    <div className={'package-stats-wrapper'}>
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
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.npmjs.com/package/${packageData.package}`}
              >
                {packageData.package}
              </a>
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
