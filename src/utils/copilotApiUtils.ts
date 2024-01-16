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
} from '@/types/common';

export class CopilotAPI {
  copilot: typeof Copilot;

  constructor(apiToken: string) {
    this.copilot = copilotApi({
      apiKey: appConfig.copilotApiKey,
      token: apiToken,
    });
  }

  async me(): Promise<MeResponse> {
    return MeResponseSchema.parse(await this.copilot.getUserAndPortalInfo());
  }

  async getClient(clientId: string): Promise<ClientResponse> {
    return ClientResponseSchema.parse(await this.copilot.retrieveAClient({ id: clientId }));
  }

  async getCompany(companyId: string): Promise<CompanyResponse> {
    return CompanyResponseSchema.parse(await this.copilot.retrieveACompany({ id: companyId }));
  }
}
