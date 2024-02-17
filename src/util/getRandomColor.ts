export default function getRandomColor() {
    const colors = [
        "#FF0077",
        "#1600DA",
        "#0496FF",
        "#FFB52D",
        "#43ed00",
        "#AA00FF",
        "#FE5D26",
        "#5F00BA",
        "#FF00AA",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}