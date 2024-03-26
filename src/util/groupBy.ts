export default function groupBy<T>(list: T[], key: keyof T, keyTransform?: (key: string) => string): { [key: string]: T[] } {
    const grouped: { [key: string]: T[] } = {}

    list.forEach(item => {
        const value = item[key]
        const transformedKey = keyTransform ? keyTransform(value as string) : value as string

        if (!grouped[transformedKey]) {
            grouped[transformedKey] = []
        }

        grouped[transformedKey].push(item)
    })

    return grouped
}