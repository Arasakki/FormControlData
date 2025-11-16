import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { type Account } from "../../types/account";

type State = { accounts: Account[] };

const initialState: State = { accounts: [] };

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload;
    },
    addAccount(state) {
      const newAcc: Account = {
        id: nanoid(),
        labels: [],
        labelsRaw: "",
        type: "LOCAL",
        login: "",
        password: "",
      };
      state.accounts.push(newAcc);
    },
    updateAccount(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Account> }>
    ) {
      const idx = state.accounts.findIndex((a) => a.id === action.payload.id);
      if (idx >= 0)
        state.accounts[idx] = {
          ...state.accounts[idx],
          ...action.payload.changes,
        };
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter((a) => a.id !== action.payload);
    },
  },
});

export const { addAccount, updateAccount, removeAccount, setAccounts } =
  accountSlice.actions;
export default accountSlice.reducer;
