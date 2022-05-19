import React from "react";

import "components/Button.scss";

export default function Button(props) {
   const text = props.children;
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
         disabled={disabled}>{text}</button>
   );
}
