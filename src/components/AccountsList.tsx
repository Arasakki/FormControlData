import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "../storage";
import { removeAccount } from "../storage/slice/accountsSlice";
import AccountRow from "./AccountRow";
import type { Account } from "../types/account";

export default function AccountList() {
  const { accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  console.log(accounts)
  const handleRemoveAccount = (id: string) => {
    dispatch(removeAccount(id));
  };
  return (
    <Stack spacing={2}>
      {accounts.map((account: Account) => (
        <AccountRow
          account={account}
          onRemove={() => handleRemoveAccount(account.id)}
          key={account.id}
        />
      ))}
    </Stack>
  );
}
