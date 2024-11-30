import { useQuery, useMutation, useQueryClient } from "react-query"
import { axiosInstance } from "../api/interceptors"

export const useGetUsers = () => {
    return useQuery({
        queryKey: "user",
        queryFn: () => axiosInstance.get('/user/find-all'),
        refetchOnWindowFocus: false
    })
}

export const useAddUser = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (data) => fetch("jjjk", {method: "POST", body: JSON.stringify(data)}),{
            onSuccess: () => {
                queryClient.invalidateQueries("user")
            }
        }
    )
}