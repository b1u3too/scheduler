import React from "react";

import "components/Button.scss";

export default function Button(props) {
   const label = props.children;
   const { onClick, disabled } = props;

   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += " button--confirm";
   }

   if (props.danger) {
      buttonClass += " button--danger";
   }

   return (
      <button 
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}>{label}</button>
   );
}
