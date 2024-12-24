'use client'

import React, { useCallback } from 'react'

// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'sonner'

// import type { PaymentMethod } from '@stripe/stripe-js'

import { ProjectWithSubscription } from '@dashboard/api/fetchProject'
import { TeamWithCustomer } from '@dashboard/api/fetchTeam'
import { updateSubscription } from '@dashboard/api/updateSubscription'

import { CreditCardSelector } from '.'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
// const Stripe = loadStripe(apiKey)

export const ProjectPaymentMethodSelector: React.FC<{
  team: TeamWithCustomer
  project: ProjectWithSubscription
  // initialPaymentMethods?: PaymentMethod[] | null
}> = (props) => {
  // const { team, project, initialPaymentMethods } = props

  // const onPaymentMethodChange = useCallback(
  //   async (newPaymentMethod: string) => {
  //     if (project?.stripeSubscriptionID) {
  //       try {
  //         await updateSubscription(team, project, {
  //           default_payment_method: newPaymentMethod
  //         })
  //         toast.success('Payment method updated successfully.')
  //       } catch (error) {
  //         console.error(error) // eslint-disable-line no-console
  //         toast.error('Error updating payment method.')
  //       }
  //     }
  //   },
  //   [project, team]
  // )

  return (
    <div>
      <h3>Under Development...</h3>
    </div>
    // <Elements stripe={Stripe}>
    //   <CreditCardSelector
    //     onPaymentMethodChange={onPaymentMethodChange}
    //     team={team}
    //     initialValue={project?.stripeSubscription?.default_payment_method}
    //     enableInlineSave
    //     initialPaymentMethods={initialPaymentMethods}
    //   />
    // </Elements>
  )
}
