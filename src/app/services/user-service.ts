import RestClient from "../configurations/axios-config";
import { PageResponse } from "../models/common";
import { SearchUserRequest, User } from "../models/user";

function search(request?: SearchUserRequest): Promise<PageResponse<User>> {
    return RestClient.get<any>("/admin/users", {params: request}).then(
      (response) => response.data
    );
}

const UserService = {
    search,
};

export default UserService;