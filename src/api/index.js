/* eslint-disable no-unused-vars */
import axios from "axios";
import {getToken} from "../utils/localStorage"
import React, { useState, useCallback } from 'react';

const API = axios.create({ baseURL: 'https://api.realworld.io/api' });


API.interceptors.request.use((req) => {
    const token = getToken();
    if (token) {
      req.headers.Authorization = `Token ${token}`;
    }
     return req;
 });

 export const getArticles = (limit, offset) => API.get(`/articles?offset=${offset}&limit=${limit}`);
 export const signUp = (values) => API.post(`/users`, { "user": values});
 export const signIn = (values) => API.post(`/users/login`, { "user": values});
 export const getUser = () => API.get(`/user`);
 export const editUser = (values) => API.put(`/user`, { "user": values});
 export const updateSettings = (values) => API.put(`/user`,{ "user": values});
 export const createArticle = (values) => API.post(`/articles`, { "article": values});
 export const favouriteArticle = (slug) => API.post(`/articles/${slug}/favorite`);
 export const unfavouriteArticle = (slug) => API.delete(`/articles/${slug}/favorite`);
 export const getTags = () => API.get(`/tags`);
 export const filterByTag = (value, limit, offset) => API.get(`/articles?tag=${value}&offset=${offset}&limit=${limit}`)
 export const getUserArticles = (value) => API.get(`/articles?author=${value}&limit=10&offset=0`);
 export const getFavoritedArticles = (value) => API.get(`/articles?favorited=${value}`);
 export const getArticle = (slug) => API.get(`/articles/${slug}`);
 export const removeArticle = (slug) => API.delete(`/articles/${slug}`)
 export const editArticle = (slug, values) => API.put(`/articles/${slug}`, { "article": values})
 export const getComments = (slug) => API.get(`/articles/${slug}/comments`)
 export const postComments = (slug, values ) => API.post(`/articles/${slug}/comments`, {"comment": {
  "body": values
}})
export const removeComment = (slug, id) => API.delete(`/articles/${slug}/comments/${id}`)
export const getProfile = (id) => API.get(`/profiles/${id}`);
export const followUser = (id) => API.post(`/profiles/${id}/follow`)
export const unfollowUser = (id) => API.delete(`/profiles/${id}/follow`)
export const getFollowedArticles = (offset) => API.get(`/articles/feed?limit=9&offset=${offset}`)


export const useApiWrapper = func => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const trigger = useCallback(

    async params => {

      try {
        setLoading(true)
        const response = await func(params)
        setData(response.data)
      } catch (error) {
        setError(error)
        setData('didnt work')
      } finally {
        setLoading(false)
      }
    },
    [func],
  )
  return [trigger, data, loading, error]
}
