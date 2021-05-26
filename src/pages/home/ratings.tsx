import React, { useEffect, useState } from 'react';
import { Player } from 'store/models';
import { AppError } from 'types/http-error';
import * as store from '../../store/store.service';
import './style.scss';

const Ratings = () => {
  const [isLoading, setIsloading] = useState(true);
  const [ratings, setRatings] = useState<readonly Player[]>([]);
  const [loadingError, setIsloadingError] = useState<AppError>();

  useEffect(() => {
    let destroyed = false;

    (async () => {
      try {
        setIsloading(true);
        const res = await store.getRatings();
        if (destroyed) return;
        setRatings(res);
      } catch (error) {
        if (destroyed) return;
        setIsloadingError(error);
      } finally {
        if (destroyed) return;
        setIsloading(false);
      }
    })();

    return () => {
      destroyed = true;
    };
  }, []);

  if (isLoading) {
    return <div className='title'>Loading rating table...</div>;
  }

  if (loadingError) {
    return <div className='title'>{loadingError.message}</div>;
  }

  return (
    <table className='ratings'>
      <tbody>
        {ratings.map((p) => (
          <tr key={p.name}>
            <td>{p.name}</td>
            <td>${p.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Ratings;
