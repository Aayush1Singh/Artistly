import { createContext } from "react";

interface userData {
  isLoggedIn?: boolean;
  setLoggedIn: (state: boolean) => void;
}
export const provider = createContext<userData>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});
