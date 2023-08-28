import ButtonIcon from './../../ui/ButtonIcon'

import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

export function Logout() {
  const { logout, isLogginOut } = useLogout()

  return (
    <ButtonIcon disabled={isLogginOut} onClick={logout}>
      {!isLogginOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  )
}
