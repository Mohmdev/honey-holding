'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

import { useAuth } from '@providers/Auth'
import { useDebounce } from '@utils/useDebounce'

import type { User } from '@payload-types' // Update this import

import { Text } from '@forms/fields/Text'

import { Gutter } from '@components/Gutter'
import { Pagination } from '@components/Pagination'
import { NewProjectBlock } from '@dashboard/components/NewProject'

import classes from './page.module.scss'

const delay = 500
const debounce = 350

type Project = {
  id: string
  title: string
  description: string
  createdAt: string
}

type ProjectsResponse = {
  docs: Project[]
  totalDocs: number
  page: number
  totalPages: number
}

const sampleProjects: ProjectsResponse = {
  docs: [
    {
      id: '1',
      title: 'Project 1',
      description: 'Sample project 1',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Sample project 2',
      createdAt: new Date().toISOString()
    }
  ],
  totalDocs: 2,
  page: 1,
  totalPages: 1
}

export const DashboardPage: React.FC<{
  initialState?: ProjectsResponse
  user: User // This now uses Payload's User type
}> = ({ initialState = sampleProjects }) => {
  const { user } = useAuth()

  const [result, setResult] = React.useState(initialState)
  const [page, setPage] = React.useState<number>(initialState?.page || 1)
  const [search, setSearch] = React.useState<string>('')
  const debouncedSearch = useDebounce(search, debounce)
  const prevSearch = React.useRef<string>(debouncedSearch)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const [enableSearch, setEnableSearch] = React.useState<boolean>(false)
  const requestRef = React.useRef<NodeJS.Timeout | null>(null)

  const ProjectCard: React.FC<{ project?: Project; isLoading?: boolean }> = ({
    project,
    isLoading
  }) => (
    <div className={classes.projectCard}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        project && (
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <small>{new Date(project.createdAt).toLocaleDateString()}</small>
          </div>
        )
      )}
    </div>
  )

  useEffect(() => {
    if (requestRef.current) clearTimeout(requestRef.current)

    if (enableSearch) {
      setIsLoading(true)

      const searchChanged = prevSearch.current !== debouncedSearch
      if (searchChanged) {
        setPage(1)
        prevSearch.current = debouncedSearch
      }

      const doFetch = async () => {
        const start = Date.now()

        try {
          requestRef.current = setTimeout(() => {
            // Simulate API call with sample data
            const filtered = sampleProjects.docs.filter((p) =>
              p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            )

            setResult({
              ...sampleProjects,
              docs: filtered,
              totalDocs: filtered.length
            })
            setIsLoading(false)
          }, delay)
        } catch (error: any) {
          setError(error.message || 'Something went wrong')
          setIsLoading(false)
        }
      }
      doFetch()
    }
  }, [page, debouncedSearch, enableSearch, user])

  return (
    <Gutter>
      {error && <p className={classes.error}>{error}</p>}
      <div className={['grid', classes.controls].join(' ')}>
        <Text
          placeholder="Search projects"
          initialValue={search}
          onChange={(value: string) => {
            setSearch(value)
            setEnableSearch(true)
          }}
          className={['cols-8 cols-l-8 cols-m-8', classes.search].join(' ')}
        />
        <div className="cols-2 cols-l-4 cols-m-2 cols-s-4">
          <Link className={classes.createButton} href="">
            New Project
          </Link>
        </div>
      </div>
      {!isLoading && (
        <NewProjectBlock
          heading="You have no projects"
          cardLeader="New"
          largeHeading={false}
          // teamSlug={matchedTeam?.slug}
        />
      )}

      <div className={classes.content}>
        {!isLoading && debouncedSearch && result?.totalDocs === 0 ? (
          <p className={classes.description}>
            {"Your search didn't return any results, please try again."}
          </p>
        ) : (
          <div className={['grid', classes.projects].join(' ')}>
            {isLoading ? (
              <ProjectCard isLoading />
            ) : (
              result?.docs.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        )}
      </div>

      {result?.totalPages > 1 && (
        <Pagination
          className={classes.pagination}
          page={result?.page}
          totalPages={result?.totalPages}
          setPage={(page) => {
            setPage(page)
            setEnableSearch(true)
          }}
        />
      )}
    </Gutter>
  )
}
