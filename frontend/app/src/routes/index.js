import View from "../components/View";
import GetDataBaseData from "../components/GetDataBaseData";
import GetUserData from "../components/GetUserData";
import PutUserData from "../components/PutUserData";
import DeleteUserData from "../components/DeleteUserData";
import PostUserData from "../components/PostUserData";
import Depersonalize from "../components/Depersonalize";
const publicRoutes = [
    { path: "api/database/personalize/view", component: View },
    { path: "api/database/personalize/{{id}}", component: GetUserData },
    { path: "api/database/personalize/{{id}}", component: PutUserData },
    { path: "api/database/personalize/{{id}}", component: DeleteUserData },
    { path: "api/database/personalize/save", component: PostUserData },
    { path: "api/database/depersonalize/view", component: GetDataBaseData },
    { path: "api/database/personalize/depersonalize", component: Depersonalize },
];

export {publicRoutes};