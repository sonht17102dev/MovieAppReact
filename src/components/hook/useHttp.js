import { useState, useCallback, useEffect } from "react";
import axios from "axios";
export default function useHttp(domainUrl) {
  const [listMovie, setListMovie] = useState([]);

  const getDatas = useCallback(async () => {
    const result = await axios.get(domainUrl);
    setListMovie(result.data.results);
  }, [domainUrl]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  return listMovie;
}
