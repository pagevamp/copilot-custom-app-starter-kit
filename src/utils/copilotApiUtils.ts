import { copilotApi } from 'copilot-node-sdk';

import appConfig from '@/config/app';
import { DefaultService as Copilot } from 'copilot-node-sdk/codegen/api/services/DefaultService';
import {
  ClientResponse,
  ClientResponseSchema,
  CompanyResponse,
  CompanyResponseSchema,
  MeResponse,
  MeResponseSchema,
  Token,
  TokenSchema,
  WorkspaceResponse,
  WorkspaceResponseSchema,
} from '@/types/common';

export type CopilotSDK = typeof Copilot & { getTokenPayload?: () => Promise<Token> };

export class CopilotAPI {
  copilot: CopilotSDK;

  constructor(apiToken: string) {
    this.copilot = copilotApi({
      apiKey: appConfig.copilotApiKey,
      token: apiToken,
    });
  }

  async me(): Promise<MeResponse> {
    return MeResponseSchema.parse(await this.copilot.getUserInfo());
  }

  async getWorkspaceInfo(): Promise<WorkspaceResponse> {
    return WorkspaceResponseSchema.parse(await this.copilot.getWorkspaceInfo());
  }

  async getTokenPayload(): Promise<Token | undefined> {
    return TokenSchema.parse(await this.copilot.getTokenPayload?.());
  }

  async getClient(clientId: string): Promise<ClientResponse> {
    return ClientResponseSchema.parse(await this.copilot.retrieveAClient({ id: clientId }));
  }

  async getCompany(companyId: string): Promise<CompanyResponse> {
    return CompanyResponseSchema.parse(await this.copilot.retrieveACompany({ id: companyId }));
  }
}
