"use server";

import { redirect } from "next/navigation";
import { period } from "../types/period";
import { urlEncodeText } from "../utils/urlEncodeDecode";

export async function search(formData: FormData) {
  const searchText = formData.get("searchText");
  const searchType = formData.get("searchType") as string;
  const searchPeriod = formData.get("searchPeriod") as string;

  if(!searchText ||
    (searchType !== "user" && searchType !== "package") ||
    (searchPeriod !== period.daily &&
    searchPeriod !== period.weekly &&
    searchPeriod !== period.monthly &&
    searchPeriod !== period.yearly)) {
      return;
  }

  redirect(`/${searchType}/${urlEncodeText(searchText as string)}/?period=${searchPeriod}`);
}