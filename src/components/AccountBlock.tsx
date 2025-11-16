import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "../storage";
import useLocale from "../hooks/useLocale";
import AccountsList from "./AccountsList";
import { addAccount } from "../storage/slice/accountsSlice";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import AddIcon from "@mui/icons-material/Add";
export default function AccountBlock() {
  const dispatch = useDispatch();
  const { translate } = useLocale();

  const handleAddAccount = () => {
    dispatch(addAccount());
  };
  return (
    <Stack spacing={3}>
      <Stack spacing={2} alignItems={"center"} direction={"row"}>
        <Typography>{translate("pages.controlData.title")}</Typography>
        <Button
          sx={{ color: "gray", border: "1px solid gray" }}
          onClick={handleAddAccount}
        >
          <AddIcon />
        </Button>
      </Stack>
      <Stack
        sx={{ backgroundColor: "lightgrey", p: 1 }}
        direction={"row"}
        textAlign={"left"}
        spacing={2}
        alignItems={"center"}
      >
        <InfoOutlineIcon />
        <Typography>{translate("pages.controlData.infoText")}</Typography>
      </Stack>
      <AccountsList />
    </Stack>
  );
}
