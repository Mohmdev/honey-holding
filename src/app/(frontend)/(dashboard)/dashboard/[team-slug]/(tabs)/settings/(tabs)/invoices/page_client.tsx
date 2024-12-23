'use client'

import * as React from 'react'
import Link from 'next/link.js'

import { checkTeamRoles } from '@utils/check-team-roles.js'
import { formatDate } from '@utils/format-date-time.js'
import { priceFromJSON } from '@utils/price-from-json.js'

import { CircleIconButton } from '@components/CircleIconButton'
import { Heading } from '@components/Heading'
import { Pill } from '@components/Pill'
import { InvoicesResult } from '@dashboard/api/fetchInvoices.js'
import { TeamWithCustomer } from '@dashboard/api/fetchTeam.js'
import { User } from '@dashboard/types'

import classes from './page.module.scss'
import { useInvoices } from './useInvoices.js'

export const TeamInvoicesPage: React.FC<{
  team: TeamWithCustomer
  invoices: InvoicesResult
  user: User
}> = ({ team, invoices: initialInvoices, user }) => {
  const isCurrentTeamOwner = checkTeamRoles(user, team, ['owner'])
  const hasCustomerID = team?.stripeCustomerID

  const {
    result: invoices,
    isLoading,
    loadMoreInvoices
  } = useInvoices({
    team,
    initialInvoices
  })

  return (
    <React.Fragment>
      {hasCustomerID && (
        <React.Fragment>
          {!isCurrentTeamOwner && (
            <p className={classes.error}>
              You must be an owner of this team to manage invoices.
            </p>
          )}
          {invoices !== null && (
            <React.Fragment>
              {Array.isArray(invoices?.data) &&
                invoices?.data?.length === 0 && <p>No invoices found.</p>}
              {Array.isArray(invoices?.data) && invoices?.data?.length > 0 && (
                <React.Fragment>
                  <ul className={classes.list}>
                    {invoices &&
                      invoices?.data?.map((invoice, index) => {
                        const {
                          status,
                          total,
                          created,
                          lines,
                          hosted_invoice_url
                        } = invoice

                        const dateCreated = new Date(created * 1000)

                        return (
                          <li
                            key={`${invoice.id}-${index}`}
                            className={classes.invoice}
                          >
                            <div className={classes.invoiceBlockLeft}>
                              <Heading
                                element="h3"
                                as="h5"
                                margin={false}
                                className={classes.invoiceDate}
                              >
                                {formatDate({ date: dateCreated })}
                              </Heading>
                              <span className={classes.invoiceStatus}>
                                {status}
                              </span>
                            </div>
                            <div className={classes.invoiceLines}>
                              {lines?.data?.map((line, lineIndex) => {
                                const { description, period } = line

                                return (
                                  <div
                                    className={classes.invoiceLine}
                                    key={`${invoice.id}-${line.id}-${lineIndex}`}
                                  >
                                    <span>
                                      {period?.start && period?.end && (
                                        <span
                                          className={classes.invoiceLinePeriod}
                                        >
                                          {'Period: '}
                                          {formatDate({
                                            date: new Date(period.start * 1000)
                                          })}
                                          {' - '}
                                          {formatDate({
                                            date: new Date(period.end * 1000)
                                          })}
                                        </span>
                                      )}
                                    </span>
                                    <span
                                      className={classes.invoiceLineDescription}
                                    >
                                      {description}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                            <div className={classes.invoiceBlockRight}>
                              <Heading
                                element="h4"
                                as="h5"
                                marginBottom={false}
                                marginTop={false}
                                className={[
                                  total < 0
                                    ? classes.invoiceTotalNegative
                                    : classes.invoiceTotalPositive
                                ]
                                  .filter(Boolean)
                                  .join(' ')}
                              >
                                {`${priceFromJSON(
                                  JSON.stringify({
                                    unit_amount: total
                                  })
                                )}`}
                              </Heading>
                              {hosted_invoice_url && (
                                <Link
                                  href={hosted_invoice_url}
                                  className={classes.invoiceLink}
                                  target="_blank"
                                >
                                  View Invoice
                                </Link>
                              )}
                            </div>
                          </li>
                        )
                      })}
                  </ul>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {invoices?.has_more && (
        <div className={classes.loadMore}>
          <CircleIconButton
            icon="add"
            label={isLoading === 'loading' ? 'Loading...' : 'Load more'}
            onClick={loadMoreInvoices}
          />
        </div>
      )}
    </React.Fragment>
  )
}
