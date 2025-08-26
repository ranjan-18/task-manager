import axios from "axios";

const fetch = () => axios.get("/events");

// const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/events", {
    ...payload,
  });

const update = ({ id, payload }) =>
  axios.put(`/events/${id}`, {
    ...payload,
  });
  const updateStatus = ({ id, status }) =>
  axios.patch(`/events/${id}/status`, { status });

// const destroy = ({ slug, quiet }) =>
//   axios.delete(`/posts/${slug}${quiet ? "?quiet" : ""}`);

const eventsApi = {
  fetch,
  create,
  update,
   updateStatus,
};

export default eventsApi;