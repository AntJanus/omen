import { combineReducers } from 'redux'
import { IFile, fileReducer } from './file.reducer'
import { settingsReducer } from './settings.reducer'

export interface IAppState {
  files?: IFile[],
  settings?: any
}

export const rootReducer = combineReducers<IAppState>({
  files: fileReducer,
  settings: settingsReducer
})
