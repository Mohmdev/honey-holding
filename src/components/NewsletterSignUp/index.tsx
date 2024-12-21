import React, { useId } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { getCookie } from '@utils/get-cookie'
import { getClientSideURL, getServerSideURL } from '@utils/getURL'

import { Text } from '@forms/fields/Text'
import FormComponent from '@forms/Form'
import { validateEmail } from '@forms/validations'

import { ArrowIcon } from '@icons/ArrowIcon'
import { ErrorIcon } from '@icons/ErrorIcon'

import classes from './index.module.scss'

interface NewsletterSignUpProps {
  className?: string
  description?: false | string
  placeholder?: string
}

export const NewsletterSignUp: React.FC<NewsletterSignUpProps> = (props) => {
  const {
    className,
    description = false,
    placeholder = 'Enter your email'
  } = props

  const [buttonClicked, setButtonClicked] = React.useState(false)
  const [formData, setFormData] = React.useState({ email: '' })
  const [error, setError] = React.useState<
    { message: string; status?: string } | undefined
  >()

  const submitButtonRef = React.useRef<HTMLButtonElement>(null)

  const newsletterId = useId()
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    const buttonElement = submitButtonRef.current

    if (buttonElement) {
      buttonElement.addEventListener('click', handleButtonClick)
    }

    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener('click', handleButtonClick)
      }
    }
  }, [])

  const handleButtonClick = () => {
    setButtonClicked(true)
  }

  const handleChange = (value) => {
    setFormData({ ...formData, email: value })
  }

  const onSubmit = React.useCallback(() => {
    setButtonClicked(false)
    const submitForm = () => {
      setError(undefined)

      try {
        const formID = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ID
        const hubspotCookie = getCookie('hubspotutk')
        const pageUri = `${getServerSideURL()}${pathname}`
        const slugParts = pathname?.split('/')
        const pageName = slugParts?.at(-1) === '' ? 'Home' : slugParts?.at(-1)
        toast.promise(
          fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              hubspotCookie,
              pageName,
              pageUri,
              submissionData: { field: 'email', value: formData.email }
            }),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }),
          {
            error: 'Newsletter form submission failed.',
            loading: 'Submitting...',
            success: 'Thank you for subscribing!'
          }
        )
      } catch (err) {
        console.warn(err)
        setError({
          message: 'Newsletter form submission failed.'
        })
      }
    }
    void submitForm()
  }, [pathname, formData, router])

  return (
    <div
      className={[className, classes.newsletterSignUp]
        .filter(Boolean)
        .join(' ')}
    >
      {error && (
        <div className={classes.errorWrap}>
          <ErrorIcon className={classes.errorIcon} />
          {`${error.message || ''}`}
        </div>
      )}
      <FormComponent onSubmit={onSubmit}>
        <div className={classes.inputWrap}>
          <label className="visually-hidden" htmlFor={newsletterId}>
            Subscribe to our newsletter
          </label>
          <Text
            className={classes.emailInput}
            customOnChange={handleChange}
            name="email"
            path={newsletterId}
            placeholder={placeholder}
            required
            type="text"
            validate={validateEmail}
            value={formData.email}
          />
          <button
            className={classes.submitButton}
            disabled={!formData.email}
            ref={submitButtonRef}
            type="submit"
          >
            <ArrowIcon
              className={[classes.inputArrow].filter(Boolean).join(' ')}
            />
            <span className="visually-hidden">Submit</span>
          </button>
        </div>

        <div className={classes.subscribeAction}>
          <p className={classes.subscribeDesc}>{description}</p>
        </div>
      </FormComponent>
    </div>
  )
}
