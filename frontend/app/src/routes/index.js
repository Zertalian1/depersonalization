import View from "../components/requests/View";
import GetDataBaseData from "../components/requests/GetDataBaseData";
import GetUserData from "../components/requests/GetUserData";
import PutUserData from "../components/requests/PutUserData";
import DeleteUserData from "../components/requests/DeleteUserData";
import PostUserData from "../components/requests/PostUserData";
import Depersonalize from "../components/requests/Depersonalize";
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