import { useSession } from "../Contexts/sessionContext/sessionContext";

export const useTheme = () => {
  const sessionInfo = useSession();
  let theme = sessionInfo.sessionState.actualTheme;
  return theme;
};
