import { useState, useEffect } from "react";
import { licitacionesService } from "../api/licitaciones.service";
import type { Licitacion } from "../types";

export const useLicitaciones = (initialFilters = {}) => {
  const [licitaciones, setLicitaciones] = useState<Licitacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState({
    page: 1,
    per_page: 10,
    estado: "",
    titulo: "",
    fechaDesde: "",
    fechaHasta: "",
    ...initialFilters,
  });

  const fetchLicitaciones = async () => {
    setLoading(true);
    setError(null);
    try {
      // Limpiar filtros vacíos
      const params = Object.fromEntries(
        Object.entries(filtros).filter(([_, v]) => v !== "")
      );

      const data = await licitacionesService.listar(params);
      setLicitaciones(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al cargar licitaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicitaciones();
  }, [filtros]);

  return {
    licitaciones,
    loading,
    error,
    filtros,
    setFiltros,
    refetch: fetchLicitaciones,
  };
};
