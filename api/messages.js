export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  const apiKey = 'sk-ant-api03-KttJuB73y9977AIfmI0EsU9GNL4px-D8G-oy70XebooyFyhDoaltudmRzba8hePfHWLy7UkU7j91b6sopgUw-gwiQqAAA';
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.' } });
  }

  try {
    const { model, max_tokens, system, messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: { message: 'messages 배열이 필요합니다.' } });
    }

    const payload = {
      model: model || 'claude-sonnet-4-6',
      max_tokens: Number(max_tokens) || 1000,
      system: typeof system === 'string' ? system : '',
      messages,
    };

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: { message: error?.message || '서버에서 Anthropic API 호출 중 오류가 발생했습니다.' }
    });
  }
}
