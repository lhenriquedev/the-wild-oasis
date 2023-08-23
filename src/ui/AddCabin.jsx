import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import { CreateCabinForm } from '../features/cabins/CreateCabinForm'

export function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  )
}
