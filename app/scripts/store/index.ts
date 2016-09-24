import { combineReducers } from 'redux'
import { IFile, fileReducer } from './file.reducer'

export interface IAppState {
  files?: IFile[]
}

export const rootReducer = combineReducers<IAppState>({
  files: fileReducer
})
