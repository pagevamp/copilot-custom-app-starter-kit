import { CopilotAPI } from '@/utils/copilotApiUtils';
import '@js-joda/timezone';
import { MeResponse } from '@/types/common';

export async function getCurrentUser(apiToken: string): Promise<MeResponse> {
  const copilotClient = new CopilotAPI(apiToken);
  return await copilotClient.me();
}
