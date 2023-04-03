import Gear from "../assets/Gear";
import Students from "../assets/Students";
import Performance from "../assets/Performance";
import HappyFace from "../assets/HappyFace";
import Subjects from "../assets/Subjects";
import Flag from "../assets/Flag";
import Notes from "../assets/Notes";
import Quiz from "../assets/Quiz";
import Forum from "../assets/Forum";
import AskATeacher from "../assets/AskATeacher";
import Notification from "../assets/Notification";
import Clipboard from "../assets/Clipboard";
import ChartDistribution from "../assets/ChartDistribution";

export default [
  {
    name: "Students",
    url: "/students",
    inner: true,
    innerNavs: [
      {
        name: "Performance",
        url: "/students/performance",
        component: Performance,
      },
      {
        name: "Feedback",
        url: "/students/feedback",
        component: HappyFace,
      },
    ],
    component: Students,
  },
  {
    name: "Subjects",
    url: "/subjects",
    inner: true,
    innerNavs: [
      {
        name: "Analysis",
        url: "/subjects/analysis",
        component: Performance,
      },
      {
        name: "Flagged areas",
        url: "/subjects/flagged",
        component: Flag,
      },
    ],
    component: Subjects,
  },
  {
    name: "Notes",
    url: "/notes",
    inner: false,
    component: Notes,
  },
  {
    name: "Quizzes",
    url: "/quizzes",
    inner: true,
    innerNavs: [
      {
        name: "View questions",
        url: "/quizzes/questions",
        component: Clipboard,
      },
      {
        name: "Quiz distribution",
        url: "/quizzes/distribution",
        component: ChartDistribution,
      },
    ],
    component: Quiz,
  },
  {
    name: "Forum",
    url: "/forum",
    inner: false,
    component: Forum,
  },
  {
    name: "Ask a teacher",
    url: "/askateacher",
    inner: false,
    component: AskATeacher,
  },
  {
    name: "Notifications",
    url: "/notifications",
    inner: false,
    component: Notification,
  },
];
