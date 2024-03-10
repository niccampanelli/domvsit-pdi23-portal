/**
 * Combina multiplas classes em uma unica string
 * @param names Nomes das classes
 * @returns 
 */
export function classes(...names: (string | undefined)[]) {
    return names.filter(Boolean).join(" ")
}