import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils/helpers'

import Spinner from '../../ui/Spinner'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Checkbox from '../../ui/Checkbox'

import BookingDataBox from '../../features/bookings/BookingDataBox'

import { useBooking } from '../../features/bookings/useBooking'
import { useMoveBack } from '../../hooks/useMoveBack'
// import { useCheckin } from './useCheckin'

import styled from 'styled-components'
import { useSettings } from '../../features/settings/useSettings'
import { useCheckin } from './useCheckin'

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

export function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)

  const { booking, isLoading } = useBooking()
  const { checkin, isCheckingIn } = useCheckin()
  const { settings, isLoading: isLoadingSettings } = useSettings()
  const moveBack = useMoveBack()

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking])

  if (isLoading || isLoadingSettings) return <Spinner />

  const { id: bookingId, guests, totalPrice, hasBreakfast, numNights } = booking
  const optionalBreakfastPrice = settings?.breakfastPrice * numNights

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={isCheckingIn}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast)
              setConfirmPaid(false)
            }}
          >
            Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}
