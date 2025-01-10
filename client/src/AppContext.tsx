import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  checkInDate: string;
  checkOutDate: string;
  numberOfPersons: number;
  numberOfRooms: number;
  selectedFilterLocation: string;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setNumberOfPersons: (count: number) => void;
  setNumberOfRooms: (count: number) => void;
  setSelectedFilterLocation: (location: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  // Default state for input values
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [numberOfPersons, setNumberOfPersons] = useState<number>(1);
  const [numberOfRooms, setNumberOfRooms] = useState<number>(1);
  const [selectedFilterLocation, setSelectedFilterLocation] = useState<string>('');

  // The context value
  const value = {
    checkInDate,
    checkOutDate,
    numberOfPersons,
    numberOfRooms,
    selectedFilterLocation,
    setCheckInDate,
    setCheckOutDate,
    setNumberOfPersons,
    setNumberOfRooms,
    setSelectedFilterLocation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to access the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
