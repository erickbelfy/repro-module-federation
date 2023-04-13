type solutionInstance = {
  solutionInstanceUuid: string;
  status: string;
};
export type UserPool = {
  accountUuid: string;
  clientId: string;
  realmId: string;
  redirectUrl: string;
  solutionInstanceInfos: solutionInstance[];
};
