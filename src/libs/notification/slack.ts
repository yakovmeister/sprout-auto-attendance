import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type SlackWebHookPayload = {
  blocks: SlackWebHookPayloadBlock[];
};

export type SlackWebHookPayloadBlock = {
  type?: string;
  fields?: SlackWebHookPayloadBlock[];
  text?: string | SlackWebHookPayloadBlock;
  emoji?: boolean;
};

export default async function notifySlack(data: SlackWebHookPayload): Promise<AxiosResponse['data']> {
  try {
    const url: string = process.env.SLACK_WEBHOOK_URL;

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(url, data, requestConfig);

    return response.data;
  } catch (error) {
    // throw error later
  }
}

export function reportInterrupt(message: string) {
  const formattedPayload: SlackWebHookPayload = {
    blocks: []
  };

  formattedPayload.blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: ':warning::warning::warning::warning::warning:',
      emoji: true
    }
  });

  formattedPayload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Attendance log interrupted'
    }
  });

  formattedPayload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Message:* ${message}`
    }
  });

  return notifySlack(formattedPayload);
}

export function reportSuccess(response: string) {
  const formattedPayload: SlackWebHookPayload = {
    blocks: []
  };

  formattedPayload.blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: ':white_check_mark::white_check_mark::white_check_mark::white_check_mark::white_check_mark:',
      emoji: true
    }
  });

  formattedPayload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Successfully automated your request'
    }
  });

  formattedPayload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Response:* ${response}`
    }
  });

  return notifySlack(formattedPayload);
}

export function reportError(error: any) {
  const formattedPayload: SlackWebHookPayload = {
    blocks: []
  };
  const severity = error.severity ? error.severity : 'error';

  formattedPayload.blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: `${severity === 'error' ? ':x::x::x::x::x:' : ':warning::warning::warning::warning::warning:' }`,
      emoji: true
    }
  });

  formattedPayload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'I could not process your request, please proceed logging in or logging out manually'
    }
  });

  formattedPayload.blocks.push({
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: `*Cause:* ${error.name}`
      },
      {
        type: 'mrkdwn',
        text: `*Status:* ${error.status}`
      }
    ]
  });

  formattedPayload.blocks.push({
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: `*Message:* ${error.message}`
      },
      {
        type: 'mrkdwn',
        text: `*Severity:* ${severity}`
      }
    ]
  });

  return notifySlack(formattedPayload);
}
