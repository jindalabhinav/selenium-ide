import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import defaultProject from 'api/models/project'
import defaultState from 'api/models/state'
import { CoreSessionData } from 'api/types'
import { LoadedWindow } from 'browser/types'

const { sideAPI } = window as LoadedWindow

const performSubscription = async (
  updateSession: Dispatch<SetStateAction<CoreSessionData>>
) => {
  const session = await sideAPI.state.get()
  updateSession(session)
  sideAPI.state.onMutate.addListener((path, data) => {
    const [namespace, method] = path.split('.')
    console.log('Queueing Mutator', path, data)
    updateSession((session) => {
      console.log('Running Mutator', path, data)
      // @ts-expect-error
      return sideAPI.mutators[namespace][method](session, data)
    })
  })
}

export default () => {
  const [session, updateSession] = useState<CoreSessionData>({
    project: defaultProject,
    state: defaultState,
  })
  useEffect(() => {
    performSubscription(updateSession)
  }, [])
  return session
}
