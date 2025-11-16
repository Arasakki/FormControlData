import React from "react";
import AccountBlock from "../components/AccountBlock";

function ControlDataPage() {
  return <AccountBlock />;
}

export default React.memo(ControlDataPage, () => true);
