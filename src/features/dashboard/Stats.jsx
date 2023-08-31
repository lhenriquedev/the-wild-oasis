import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
import Stat from './Stat'

function Stats({ bookings, confirmedStays, numDays, cabinCout }) {
  const numBookings = bookings.length
  const checkins = confirmedStays.length

  const sales = bookings.reduce((acc, booking) => {
    return acc + booking.totalPrice
  }, 0)

  const occupation =
    confirmedStays.reduce((acc, stay) => {
      return acc + stay.numNights
    }, 0) /
    (numDays * cabinCout)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  )
}

export default Stats
