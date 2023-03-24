import { NewEngine, LichessEngine } from '../stores/engines'
import { useSettingsStore } from '../stores/settings'

export async function saveEngineToLichess(
  engine: NewEngine
): Promise<LichessEngine> {
  const settings = useSettingsStore()

  return await fetch(`${settings.lichessHost}/api/external-engine`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${settings.lichess_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: engine.name,
      maxThreads: engine.maxThreads,
      maxHash: engine.maxHash,
      defaultDepth: engine.defaultDepth,
      variants: engine.variants,
      providerSecret: settings.providerSecret,
    }),
  }).then<LichessEngine>(async (response) => {
    if (!response.ok) {
      throw await response.json()
    }

    return response.json()
  })
}

export async function deleteEngineFromLichess(
  engine: LichessEngine
): Promise<void> {
  const settings = useSettingsStore()

  return await fetch(
    `${settings.lichessHost}/api/external-engine/${engine.id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${settings.lichess_token}`,
      },
    }
  ).then(async (response) => {
    if (!response.ok) {
      throw await response.json()
    }
  })
}
