import { Api } from '@seleniumhq/side-api/dist/index'
import { processApi } from '@seleniumhq/side-api'
import { Session } from 'main/types'

export type MainApiMapper = {
  [Namespace in keyof Api]: {
    [Handler in keyof Api[Namespace]]: ReturnType<
      Api[Namespace][Handler]['main']
    >
  }
}

export default (session: Session) =>
  processApi<MainApiMapper>((name, handler) => {
    if (handler.main) {
      return handler.main(name, session, handler.mutator)
    }
  })
