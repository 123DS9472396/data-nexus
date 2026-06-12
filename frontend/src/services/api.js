import axios from "axios";

const django = axios.create({
  baseURL: import.meta.env.VITE_DJANGO_URL || "http://localhost:8000"
});

django.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

django.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_DJANGO_URL}/api/auth/refresh/`,
            { refresh }
          );
          localStorage.setItem("access_token", data.access);
          err.config.headers.Authorization = `Bearer ${data.access}`;
          return axios(err.config);
        } catch {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(err);
  }
);

export const auth = {
  login:    (data) => django.post("/api/auth/login/", data),
  register: (data) => django.post("/api/users/register/", data),
  profile:  ()     => django.get("/api/users/profile/"),
};

export const pipelines = {
  list:   ()       => django.get("/api/pipelines/"),
  create: (data)   => django.post("/api/pipelines/", data),
  update: (id, d)  => django.patch(`/api/pipelines/${id}/`, d),
  delete: (id)     => django.delete(`/api/pipelines/${id}/`),
  runs:   ()       => django.get("/api/pipelines/runs/"),
};

export const datasets = {
  list:   ()      => django.get("/api/datasets/"),
  create: (data)  => django.post("/api/datasets/", data),
  delete: (id)    => django.delete(`/api/datasets/${id}/`),
};
