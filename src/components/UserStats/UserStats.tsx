import {
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
import React, { useCallback, useEffect, useState } from 'react';
import PackageStats from '../PackageStats/PackageStats';
import './UserStats.css';

interface PackageType {
  package: { name: string; scope: string };
}

const UserStats = ({ userName, period }) => {
  const [nameTotalLoaded, setNameTotalLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalDownloadsLoaded, setTotalDownloadsLoaded] = useState(false);
  const [userPacks, setUserPacks] = useState({
    objects: []
  } as { objects: PackageType[] });
  const [userPacksLoaded, setUserPacksLoaded] = useState(false);
  const [pagination, setPagination] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesToShow, setPackagesToShow] = useState<any[]>([]);

  useEffect(() => {
    if (userPacksLoaded) {
      setPackagesToShow(
        userPacks.objects.map(e => e.package.name).slice((currentPage - 1) * 10, currentPage * 10)
      );
    }
  }, [pagination, currentPage, userPacksLoaded, userPacks]);

  useEffect(() => {
    setTotalDownloadsLoaded(false);
    setCurrentPage(1);
    setPagination([]);
    setNameTotalLoaded(false);
    setTotal(0);
    setTotalDownloads(0);
    setUserPacks({ objects: [] });
    setUserPacksLoaded(false);
    setPackagesToShow([]);
  }, [userName]);

  useEffect(() => {
    setTotalDownloadsLoaded(false);
  }, [period]);

  const fetchTotalPackages = useCallback(
    data => {
      if (data.total > 0) {
        if (data.total <= 250) {
          setUserPacks({ objects: data.objects });
          setUserPacksLoaded(true);
        } else {
          const pages = Math.ceil(data.total / 250);
          const urlArray: string[] = [];
          for (let i = 1; i < pages; i++) {
            urlArray.push(
              `https://registry.npmjs.com/-/v1/search?text=maintainer:${userName}&size=250&quality=0.0&maintenance=0.0&popularity=1.0&from=${
                i * 250
              }`
            );
          }
          Promise.all(urlArray.map(u => fetch(u)))
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(packages => {
              let totalPackages: any[] = [...data.objects];
              packages.forEach(e => {
                totalPackages = [...totalPackages, ...e.objects];
              });
              setUserPacks({ objects: totalPackages });
              setUserPacksLoaded(true);
            });
        }
      }
      setTotal(data.total);
      setNameTotalLoaded(true);
    },
    [userName]
  );

  useEffect(() => {
    fetch(
      `https://registry.npmjs.com/-/v1/search?text=maintainer:${userName}&size=250&quality=0.0&maintenance=0.0&popularity=1.0&from=0`
    )
      .then(response => response.json())
      .then(data => {
        fetchTotalPackages(data);
      });
  }, [userName, fetchTotalPackages]);

  useEffect(() => {
    if (userPacksLoaded) {
      let allPages: number[] = [];
      for (let i = 0; i < Math.ceil(total / 10); i++) {
        allPages.push(i + 1);
      }
      setPagination(allPages);
      let unscopedpacks = userPacks.objects.filter(e => e.package.scope === 'unscoped');
      let queryNumber = Math.ceil(unscopedpacks.length / 128);
      let queryPackageGroups: any[] = [];
      for (let i = 0; i < queryNumber; i++) {
        queryPackageGroups.push(
          unscopedpacks.map(e => e.package.name).slice(i * 128, (i + 1) * 128)
        );
      }
      Promise.all(
        queryPackageGroups.map(u =>
          fetch(`https://api.npmjs.org/downloads/point/${period}/${u.join(',')}`)
        )
      )
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(downloads => {
          let downloadsSum = downloads
            .map(e => {
              return Object.values(e).reduce(function (accumulator, currentValue: any) {
                return accumulator + currentValue.downloads;
              }, 0);
            })
            .reduce(function (accumulator, currentValue: any) {
              return accumulator + currentValue;
            }, 0);
          setTotalDownloads(downloadsSum as number);
          setTotalDownloadsLoaded(true);
        });
    }
  }, [userPacksLoaded, total, period, userPacks.objects]);

  return (
    <div>
      <IonCard>
        {nameTotalLoaded ? null : <IonProgressBar type="indeterminate"></IonProgressBar>}
        <IonCardHeader>
          <IonCardSubtitle>
            {nameTotalLoaded ? (
              `Total Packages: ${total}`
            ) : (
              <IonSkeletonText animated style={{ width: '50px' }}></IonSkeletonText>
            )}
          </IonCardSubtitle>
          <IonCardTitle>
            {nameTotalLoaded ? (
              `${userName}`
            ) : (
              <IonSkeletonText animated style={{ width: '90px' }}></IonSkeletonText>
            )}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {totalDownloadsLoaded ? (
            `Total Downloads in period for non-scoped packages: ${totalDownloads}`
          ) : (
            <IonSkeletonText animated style={{ width: '50%' }}></IonSkeletonText>
          )}
        </IonCardContent>
      </IonCard>
      {pagination.length > 1 ? (
        <IonCard>
          <IonSelect
            interface={'popover'}
            className="search__select__full"
            value={currentPage}
            okText="Okay"
            cancelText="Dismiss"
            onIonChange={e => setCurrentPage(e.detail.value)}
          >
            {pagination.map(e => (
              <IonSelectOption key={e} value={e}>
                {e}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonCard>
      ) : null}
      <div className={'package-stats-list'}>
        {packagesToShow.map(e => (
          <PackageStats key={e} packageName={e} period={period}></PackageStats>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
