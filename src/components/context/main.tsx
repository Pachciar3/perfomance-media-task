import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const AppContext = createContext<Context | null>(null);

interface AppWrapperProps {
  children: ReactNode;
}

interface Context {
  setLink: Dispatch<SetStateAction<boolean>>;
  lastInternalLink: boolean;
}

export function AppWrapper(props: AppWrapperProps) {
  const { children } = props;
  const [lastInternalLink, setLink] = useState<boolean>(false);
  const sharedState: Context = { lastInternalLink, setLink };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
