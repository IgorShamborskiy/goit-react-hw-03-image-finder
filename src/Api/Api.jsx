const BASE_URL = 'https://pixabay.com/api';
const KEY = '32876587-b0e3dd5d308a258610a0fd70a';

export function ImagesApi(nextKeyword, page, per_page) {
  return fetch(
    `${BASE_URL}/?q=${nextKeyword}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  ).then(res => {
    if (!res.ok) {
      return Promise.reject(
        new Error('Помилка підключення. Спробуйте пізніше')
      );
    }
    return res.json();
  });
}
