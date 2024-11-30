import { useQuery } from "react-query"
import { axiosInstance } from "../api/interceptors"

export const useGetAricles = () => {
    return useQuery({
        queryKey: "article",
        queryFn: () => axiosInstance.get("/article/find-all"),
        refetchOnWindowFocus: false

    })
}