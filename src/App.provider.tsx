import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const APP_DATA_KEY = 'APP_DATA';

const setAppData = async (appData: AppData) => {
  try {
    await AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(appData));
  } catch {}
};

const getAppData = async (): Promise<AppData> => {
  try {
    const appDataString = await AsyncStorage.getItem(APP_DATA_KEY);
    if (appDataString) {
      return JSON.parse(appDataString);
    }
  } catch {}
  return { moodList: [] };
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

export const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(prevState => {
      const newMoodList = [...prevState, { mood, timestamp: Date.now() }];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const appData = await getAppData();
      if (appData) {
        setMoodList(appData.moodList);
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
