import { ProjectWithSubscription } from '@dashboard/api/fetchProject'
import { Project } from '@dashboard/types'

type Props<ReturnProject = Project> = {
  environmentSlug: string
  project: ReturnProject | ProjectWithSubscription
}
export function mergeProjectEnvironment({ environmentSlug, project }: Props) {
  return {
    ...project,
    ...(project?.environments?.find(
      ({ environmentSlug: projectEnvironmentSlug }) =>
        projectEnvironmentSlug === environmentSlug
    ) || {}),
    id: project.id
  }
}
