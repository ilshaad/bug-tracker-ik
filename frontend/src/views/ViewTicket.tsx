import React, { useEffect } from "react";
import SeoReactHelmet from "../components/SeoReactHelmet";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_allCommentsForASingleTicket_actions } from "../models/reducers/comments/commentsSlice";

export default function ViewTicket(): JSX.Element {
  const ticketsList = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ticketId = "049e7fd3-753c-4123-8df5-df3aab63d9d2";
    dispatch(get_allCommentsForASingleTicket_actions(ticketId));
  }, [dispatch]);

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from view ticket"
        metaDescriptionContent="mDescContent-view ticket"
        metaKeywordsContent="view ticket & etc"
      />

      <h1>ViewTicket:ticketid PAGE</h1>
    </div>
  );
} //END ViewTicket component
