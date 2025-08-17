import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("AccessToken dans le dashboard :", token);

  return (
    <div>
      <h1>Dashboard</h1>
      {token ? (
        <p>✅ Connecté</p>
      ) : (
        <p>❌ Non connecté</p>
      )}
    </div>
  );
};

export default Dashboard;