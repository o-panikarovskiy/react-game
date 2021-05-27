import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from 'store/context';
import { Player } from 'store/models';
import { AppError } from 'types/http-error';
import './style.scss';

const Ratings = () => {
  const { getRatings } = useContext(GameContext);
  const [isLoading, setIsloading] = useState(true);
  const [ratings, setRatings] = useState<readonly Player[]>([]);
  const [loadingError, setIsloadingError] = useState<AppError>();

  useEffect(() => {
    const abortCtrl = new AbortController();

    (async () => {
      try {
        setIsloading(true);
        const res = await getRatings();
        if (abortCtrl.signal.aborted) return;
        setRatings(res);
      } catch (error) {
        if (abortCtrl.signal.aborted) return;
        setIsloadingError(error);
      } finally {
        if (abortCtrl.signal.aborted) return;
        setIsloading(false);
      }
    })();

    return () => abortCtrl.abort();
  }, [getRatings]);

  if (isLoading) {
    return <div className="title">Loading rating table...</div>;
  }

  if (loadingError) {
    return <div className="title">{loadingError.message}</div>;
  }

  return (
    <table className="ratings">
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
