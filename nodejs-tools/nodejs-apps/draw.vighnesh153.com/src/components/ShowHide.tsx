import React, { useState } from 'react';

export interface ShowHideProps {
  show?: boolean;
  children?: React.ReactNode;
}

export const useShowHide = () => {
  const [show, setShow] = useState(false);

  const toggleShow = (newShow?: boolean) => {
    if (newShow === undefined) {
      setShow(!show);
    } else {
      setShow(newShow);
    }
  };

  return { show, toggleShow };
};

export function ShowHide({ show, children }: ShowHideProps) {
  return <>{show ? children : null}</>;
}
