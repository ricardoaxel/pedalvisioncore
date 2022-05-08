import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultTo) => {
  return useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultTo
  );
};

export { useLocalStorage };
