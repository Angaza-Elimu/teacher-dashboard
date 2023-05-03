import api from "./base";

const authorization = (token) => ({ Authorization: "Bearer " + token });

//getSubjects
const getSubjects = async (token) => api.get("/getSubjects", { headers: authorization(token) });

//getTopics
const getTopics = async ({ token, class_id, subject_id }) =>
  api.post("/getTopics", { class: class_id, subject_id }, { headers: authorization(token) });

//getSubtopics
const getSubtopics = async ({ token, topic_id }) =>
  api.post("/getSubtopics", { topic_id }, { headers: authorization(token) });

//getQuiz
const getQuiz = async ({ token, subtopic_id }) =>
  api.post("/getQuiz", { subtopic_id, type: "quizq_questions" }, { headers: authorization(token) });

export { getSubjects, getTopics, getSubtopics, getQuiz };
