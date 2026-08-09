import { createContext, useContext, useState, useEffect } from "react";
import { calculateDeliverys } from "../services/api";

const DeliveryContext = createContext<any>(null);

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [routesData, setRoutesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function updateProgress(url: string) {
    setLoading(true);
    const data = await calculateDeliverys(url);
    setRoutesData(data);
    setLoading(false);
  }

  useEffect(() => {
    // inicializa logo ao montar
    updateProgress("http://seu-backend.com");
  }, []);

  return (
    <DeliveryContext.Provider value={{ routesData, loading, updateProgress }}>
      {children}
    </DeliveryContext.Provider>
  );
}

// Hook para consumir facilmente
export function useDelivery() {
  return useContext(DeliveryContext);
}
