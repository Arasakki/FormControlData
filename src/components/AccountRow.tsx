import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, getIn } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "../storage";
import type { Account } from "../types/account";
import { labelsToRaw, parseLabels } from "../utils/lables";
import { updateAccount } from "../storage/slice/accountsSlice";
import useLocale from "../hooks/useLocale";

type Props = {
  account: Account;
  onRemove: () => void;
};

type FormValues = {
  labelsRaw: string;
  type: "LOCAL" | "LDAP";
  login: string;
  password: string;
};

export default function AccountRow({ account, onRemove }: Props) {
  const dispatch = useDispatch();
  const [showPwd, setShowPwd] = useState(false);
  const { translate } = useLocale();
  const requiredErrorText = translate("errors.required");
  const max50ErrorText = translate("errors.max50");
  const max100ErrorText = translate("errors.max100");
  const validationSchema = yup.object().shape({
    labelsRaw: yup.string().max(50, max50ErrorText).nullable(),
    type: yup.string().oneOf(["LOCAL", "LDAP"]).required(),
    login: yup.string().required(requiredErrorText).max(100, max100ErrorText),
    password: yup.string().when("type", {
      is: (v: string) => v === "LOCAL",
      then: (schema) =>
        schema.required(requiredErrorText).max(100, max100ErrorText),
      otherwise: (schema) => schema.nullable(),
    }),
  });
  const initialValues: FormValues = {
    labelsRaw: account.labels?.length
      ? labelsToRaw(account.labels)
      : (account.labelsRaw ?? ""),
    type: account.type,
    login: account.login ?? "",
    password: account.password ?? "",
  };
  const formik = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: () => {},
  });

  async function saveFieldIfValid(fieldPath: string) {
    await formik.validateField(fieldPath);
    const err = getIn(formik.errors, fieldPath);
    if (err) return;

    await formik.validateForm();
    const rowErrors = getIn(formik.errors, "");
    if (rowErrors) {
      const specificErr = getIn(formik.errors, fieldPath);
      if (specificErr) return;
    }

    const values = formik.values;
    const labels = parseLabels(values.labelsRaw);
    const password = values.type === "LDAP" ? null : values.password;
    dispatch(
      updateAccount({
        id: account.id,
        changes: {
          labels,
          labelsRaw: values.labelsRaw,
          type: values.type,
          login: values.login,
          password,
        },
      })
    );
  }

  const onTypeChange = async (newType: "LOCAL" | "LDAP") => {
    formik.setFieldValue("type", newType);
    if (newType === "LDAP") {
      formik.setFieldValue("password", "");
    }
    await formik.validateForm();
    if (Object.keys(formik.errors).length === 0) {
      const values = formik.values;
      const labels = parseLabels(values.labelsRaw);
      const password = newType === "LDAP" ? null : values.password;
      dispatch(
        updateAccount({
          id: account.id,
          changes: {
            labels,
            labelsRaw: values.labelsRaw,
            type: values.type,
            login: values.login,
            password,
          },
        })
      );
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <TextField
        name="labelsRaw"
        label={translate("entities.marks")}
        size="small"
        value={formik.values.labelsRaw}
        onChange={formik.handleChange}
        onBlur={async (e) => {
          formik.handleBlur(e);
          await saveFieldIfValid("labelsRaw");
        }}
        error={Boolean(
          getIn(formik.touched, "labelsRaw") &&
            getIn(formik.errors, "labelsRaw")
        )}
      />

      <TextField
        select
        label={translate("entities.typeWrite")}
        size="small"
        value={formik.values.type}
        onChange={async (e) => {
          const val = e.target.value as "LOCAL" | "LDAP";
          await onTypeChange(val);
        }}
      >
        <MenuItem value="LOCAL">
          {translate("pages.controlData.typeWrite.local")}
        </MenuItem>
        <MenuItem value="LDAP">
          {translate("pages.controlData.typeWrite.LDAP")}
        </MenuItem>
      </TextField>

      <TextField
        name="login"
        label={translate("entities.login")}
        size="small"
        value={formik.values.login}
        onChange={formik.handleChange}
        onBlur={async (e) => {
          formik.handleBlur(e);
          await saveFieldIfValid("login");
        }}
        error={Boolean(
          getIn(formik.touched, "login") && getIn(formik.errors, "login")
        )}
      />

      {formik.values.type === "LOCAL" && (
        <TextField
          name="password"
          label={translate("entities.password")}
          size="small"
          type={showPwd ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={async (e) => {
            formik.handleBlur(e);
            await saveFieldIfValid("password");
          }}
          error={Boolean(
            getIn(formik.touched, "password") &&
              getIn(formik.errors, "password")
          )}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPwd((s) => !s)} size="small">
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      <IconButton aria-label="delete" onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
