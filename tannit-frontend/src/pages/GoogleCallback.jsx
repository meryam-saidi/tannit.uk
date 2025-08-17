import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice'; 

export default function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const processedRef = useRef(false); // empêche le double-traitement (StrictMode)

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);

    const token = hash.get("token") || query.get("token");
    console.log("AccessToken après google callback :", token);

    if (token) {
      // 1) Stocker
      dispatch(setToken(token));
      
      // 2) Nettoyer l’URL (retirer #token=... / ?token=...)
      const cleanUrl = window.location.origin + "/GoogleCallback";
      window.history.replaceState({}, document.title, cleanUrl);

      // 3) Rediriger
      navigate("/ProfileCreatedPage", { replace: true });
    } else {
      navigate("/loginPage", { replace: true });
    }
  }, [navigate]);

  return <div>Signing you in…</div>;
}
