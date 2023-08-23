import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin } from '../../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
  const queryClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success('CABIN SUCCESFULLY CREATED')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isCreating, createCabin }
}