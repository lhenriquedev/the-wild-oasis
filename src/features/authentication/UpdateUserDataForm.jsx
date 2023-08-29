import { useUser } from '../authentication/useUser'
import { useState } from 'react'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateUser } from './useUpdateUser'

function UpdateUserDataForm() {
  // We don't need the loading state
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser()

  const { isUpdating, updateUser } = useUpdateUser()

  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (!fullName) return
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null)
          e.target.reset()
        },
      },
    )
  }

  function handleCancel() {
    setFullName(currentFullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          disabled={isUpdating}
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          // We should also validate that it's actually an image, but never mind
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isUpdating}
          type="reset"
          variation="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
