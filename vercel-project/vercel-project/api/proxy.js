/**
 * Vercel 서버리스 함수 - 소상공인365 공공API 프록시
 * 브라우저 CORS 문제를 서버 경유로 완전 해결
 */

const SERVICE_KEY = 'bbb0fe45cafaabca4200eeff31b52c67d35ce54eb99b0939f0527dc95fa967c4';
const BASE_URL    = 'https://apis.data.go.kr/B553077/api/open/sdsc2';

const ALLOWED_ENDPOINTS = [
  'storeListInAdmdistrictCode',
  'storeListInUpjong',
  'trdarQtarisAnals',
  'storeListInBuilding',
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { endpoint, ...rest } = req.query;

  if (!endpoint || !ALLOWED_ENDPOINTS.includes(endpoint)) {
    return res.status(400).json({ error: `허용되지 않은 엔드포인트: ${endpoint}` });
  }

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: 'json',
    pageNo: 1,
    numOfRows: 1000,
    ...rest,
  });

  const apiUrl = `${BASE_URL}/${endpoint}?${params}`;

  try {
    const apiRes = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(12000),
    });

    if (!apiRes.ok) throw new Error(`공공API HTTP 오류: ${apiRes.status}`);

    const data = await apiRes.json();

    const resultCode = data?.response?.header?.resultCode || data?.header?.resultCode;
    if (resultCode && resultCode !== '00' && resultCode !== '000') {
      const msg = data?.response?.header?.resultMsg || data?.header?.resultMsg || '공공API 오류';
      return res.status(502).json({ error: msg, resultCode });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('[proxy] 오류:', err.message);
    return res.status(502).json({ error: err.message });
  }
}
