import formatDistanceToNow from "date-fns/formatDistanceToNow";

export function formatDate(date) {
    const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })
    return formattedDate;
}