
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthScreen from './screens/AuthScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabBar from './components/TabBar';
import { UserProfile, AppState, UserStats } from './types';
import { mockBackend } from './services/mockBackend';

const App: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('fitzee_state');
    return saved ? JSON.parse(saved) : {
      isAuthenticated: false,
      isOnboarded: false,
      user: null,
      stats: {
        dailyCaloriesGoal: 2000,
        consumedCalories: 1240,
        burnedCalories: 450,
        steps: 7540,
        waterIntake: 1500,
        workoutsCompleted: 12
      }
    };
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Handle PWA Install Prompt
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  useEffect(() => {
    localStorage.setItem('fitzee_state', JSON.stringify(state));
  }, [state]);

  const handleLogin = (email: string) => {
    setState(prev => ({ ...prev, isAuthenticated: true }));
  };

  const handleOnboarding = (profile: UserProfile) => {
    setState(prev => ({ ...prev, user: profile, isOnboarded: true }));
  };

  const updateStats = useCallback((updates: Partial<UserStats>) => {
    setState(prev => ({
      ...prev,
      stats: { ...prev.stats, ...updates }
    }));
  }, []);

  const syncData = async () => {
    setIsSyncing(true);
    try {
      const result = await mockBackend.syncData(state);
      if (result.success) {
        setLastSync(result.timestamp);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fitzee_state');
    setState({
      isAuthenticated: false,
      isOnboarded: false,
      user: null,
      stats: {
        dailyCaloriesGoal: 2000,
        consumedCalories: 0,
        burnedCalories: 0,
        steps: 0,
        waterIntake: 0,
        workoutsCompleted: 0
      }
    });
  };

  if (!state.isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (!state.isOnboarded) {
    return <OnboardingScreen onComplete={handleOnboarding} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-20 overflow-x-hidden font-sans">
        <Routes>
          <Route path="/" element={
            <HomeScreen 
              stats={state.stats} 
              user={state.user} 
              onUpdateStats={updateStats} 
              showInstallBtn={!!deferredPrompt}
              onInstall={handleInstall}
            />
          } />
          <Route path="/workouts" element={<WorkoutsScreen />} />
          <Route path="/progress" element={<ProgressScreen stats={state.stats} />} />
          <Route path="/profile" element={
            <ProfileScreen 
              user={state.user} 
              onLogout={handleLogout} 
              onSync={syncData}
              isSyncing={isSyncing}
              lastSync={lastSync}
            />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
};

export default App;
