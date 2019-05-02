export const defaultApi = {
  search: async query => {
    // Returns a max of 25 results by default, which should be fine.
    // See: api-docs.npms.io
    const response = await fetch(
      `https://api.npms.io/v2/search/suggestions?q=${query}`
    )

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`)
    }

    const json = await response.json()
    const results = json.map(result => result.package)

    return results
  }
}

export const brokenApi = {
  search: async () => {
    await setTimeout(() => {}, 5000)
    throw new Error(`Mock network error`)
  }
}
