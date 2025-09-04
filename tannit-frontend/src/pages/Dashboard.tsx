import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AppHeader from '../components/AppHeader';

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [balance, setBalance] = useState(0);
  const [xp, setXp] = useState(0);
  const avatarUrl = undefined;

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