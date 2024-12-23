import { fetchMe } from '@dashboard/api/fetchMe.js'
import { fetchProjectAndRedirect } from '@dashboard/api/fetchProject'
import { Metadata } from 'next'

import { canUserMangeProject } from '@access.js'
import { MaxWidth } from '@components/MaxWidth'
import { Plan } from '@dashboard/types'
import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { isExpandedDoc } from '@utils/is-expanded-doc.js'
import { PRODUCTION_ENVIRONMENT_SLUG } from '@constants.js'
import { SectionHeader } from '../_layoutComponents/SectionHeader
import { DeletePlanButton } from './DeletePlanButton
import { DeletePlanModal } from './DeletePlanModal

import classes from './index.module.scss'
import { generateRoutePath } from '@dashboard/utils/generate-route-path'

export default async ({
  params,
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
    'environment-slug': string
  }>
}) => {
  const {
    'team-slug': teamSlug,
    'project-slug': projectSlug,
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG,
  } = await params
  const { user } = await fetchMe()
  const { project } = await fetchProjectAndRedirect({
    teamSlug,
    projectSlug,
    environmentSlug,
  })
  const canManageProject = canUserMangeProject({ project, user })

  return (
    <MaxWidth className={classes.plan}>
      {project?.plan && isExpandedDoc<Plan>(project.plan) && (
        <div>
          <SectionHeader title="Current Plan" />
          <div className={classes.borderBox}>
            <h4>{project.plan.name}</h4>
            <p className={classes.downgradeText}>
              To downgrade or upgrade your plan, please{' '}
              <a href="mailto:info@payloadcms.com?subject=Downgrade/Upgrade Cloud Plan&body=Hi! I would like to change my cloud plan.">
                contact us
              </a>{' '}
              and we will change your plan for you. This is temporary until we have a self-service
              plan change feature.
            </p>
          </div>
        </div>
      )}
      {canManageProject && project?.slug && (
        <div>
          <SectionHeader title="Delete Project" />
          <div className={classes.borderBox}>
            <h4>Warning</h4>
            <p className={classes.downgradeText}>
              Once you delete a project, there is no going back so please be certain. We recommend
              exporting your database before deleting.
            </p>
            <DeletePlanButton />
          </div>
          <DeletePlanModal
            confirmSlug={project.slug}
            canManageProject={canManageProject}
            project={project}
            environmentSlug={environmentSlug}
          />
        </div>
      )}
    </MaxWidth>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
    'environment-slug': string
  }>
}): Promise<Metadata> {
  const {
    'team-slug': teamSlug,
    'project-slug': projectSlug,
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG,
  } = await params
  return {
    title: 'Plan',
    openGraph: mergeOpenGraph({
      title: 'Plan',
      url: generateRoutePath({
        teamSlug,
        projectSlug,
        environmentSlug,
        suffix: 'settings/plan',
      }),
    }),
  }
}
