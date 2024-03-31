export default function getInitials(name: string) {
    if (!name) return '';

    const words = name.split(' ');
    let initials = '';

    if (words.length === 1) {
        initials = words[0].substring(0, 2);
    } else {
        initials = (words[0][0] || '') + (words[1][0] || '');
    }

    return initials.toUpperCase();
}