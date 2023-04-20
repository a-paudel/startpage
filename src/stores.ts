import { writable } from "svelte/store";

export const StoreImageUrl = writable<string>(
  localStorage.getItem("StoreImageUrl") || ""
);
StoreImageUrl.subscribe((value) => {
  localStorage.setItem("StoreImageUrl", value);
});

export const StoreImageFetchDate = writable<string | null>(
  localStorage.getItem("StoreImageFetchDate") || null
);
StoreImageFetchDate.subscribe((value) => {
  localStorage.setItem("StoreImageFetchDate", value);
});
