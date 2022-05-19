import React from "react";

import "components/Button.scss";

export default function Button(props) {
   const label = props.children;
   return (
      <button>{label}</button>
   );
}
