// src/hooks/product/use-shop-products.ts
import { QUERY_KEYS } from "@/constants/query-keys";
import { getAllProductsPublic } from "@/services/product.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const usePublicProducts = (
  params?: { page?: number; limit?: number },
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTSSHOP, params],
    queryFn: async () => {
      const res = await getAllProductsPublic(params)
      return res.data
    },
    ...queryOptions,
  });
};
