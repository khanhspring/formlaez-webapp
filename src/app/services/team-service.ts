import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseId } from "../models/common";
import { AddTeamMemberRequest, CreateTeamRequest, SearchTeamMemberRequest, SearchTeamRequest, Team, TeamMember, UpdateTeamRequest } from "../models/team";

export function create(request: CreateTeamRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/teams", request)
        .then(response => response.data);;
}

export function update(request: UpdateTeamRequest): Promise<any> {
  return RestClient
      .put<any>("/admin/teams/" + request.id, request)
      .then(response => response.data);;
}

function getByCode(teamCode?: string): Promise<Team> {
    return RestClient.get<any>("/admin/teams/" + teamCode).then(
      (response) => response.data
    );
}

function search(request: SearchTeamRequest): Promise<PageResponse<Team>> {
    return RestClient.get<any>("/admin/teams", {params: request}).then(
      (response) => response.data
    );
}

export function addMember(request: AddTeamMemberRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/teams/" + request.teamId + "/members", request)
        .then(response => response.data);;
}

function searchMember(request: SearchTeamMemberRequest): Promise<PageResponse<TeamMember>> {
    return RestClient.get<any>("/admin/teams/" + request.teamId + "/members", {params: request}).then(
      (response) => response.data
    );
}

const TeamService = {
    create,
    update,
    getByCode,
    search,
    addMember,
    searchMember
};

export default TeamService;