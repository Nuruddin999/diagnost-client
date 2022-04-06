import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import applicationSlice from '../reducers/applicationSlice';
import userSlice from '../reducers/userSlice';
import runSagas from '../sagas';

const rootReducer = combineReducers({
  user: userSlice,
  application:applicationSlice
})

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(runSagas)

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;