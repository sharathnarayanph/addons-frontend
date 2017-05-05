import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  categoriesFail,
  categoriesLoad,
} from 'core/actions/categories';
import { categories as categoriesApi } from 'core/api';
import { CATEGORIES_FETCH } from 'core/constants';

import { getApi } from './utils';


// worker Saga: will be fired on every CATEGORIES_FETCH action.
export function* fetchCategories() {
  try {
    yield put(showLoading());
    const api = yield select(getApi);
    const response = yield call(categoriesApi, { api });
    yield put(categoriesLoad(response));
  } catch (err) {
    yield put(categoriesFail(err));
  } finally {
    yield put(hideLoading());
  }
}

/*
  Starts fetchUser on each dispatched `categoriesFetch` action.
  Allows concurrent fetches of categoriesFetch.
*/
export default function* categoriesSaga() {
  yield takeEvery(CATEGORIES_FETCH, fetchCategories);
}