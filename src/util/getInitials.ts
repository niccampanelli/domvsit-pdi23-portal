export default function getInitials(name: string) {
    if (!name) return '';

    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}