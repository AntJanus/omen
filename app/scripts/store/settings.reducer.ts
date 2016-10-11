import { SettingsActions } from '../actions/settings.actions'

const defaultState = {
  path: ''
}

export function settingsReducer (state = defaultState, action) {
  switch (action.type) {
    case SettingsActions.SET_PATH:
    case SettingsActions.GET_PATH:
      return Object.assign({}, state, {
        path: actions.payload.path
      })
    default:
      return state
  }
}
