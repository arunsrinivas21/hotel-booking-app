import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for the context state
interface AppContextType {
  checkInDate: string;
  checkOutDate: string;
  numberOfPersons: number;
  numberOfRooms: number;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setNumberOfPersons: (count: number) => void;
  setNumberOfRooms: (count: number) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the provider component
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  // Default state for input values
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [numberOfPersons, setNumberOfPersons] = useState<number>(1);
  const [numberOfRooms, setNumberOfRooms] = useState<number>(1);

  // The context value
  const value = {
    checkInDate,
    checkOutDate,
    numberOfPersons,
    numberOfRooms,
    setCheckInDate,
    setCheckOutDate,
    setNumberOfPersons,
    setNumberOfRooms,
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
