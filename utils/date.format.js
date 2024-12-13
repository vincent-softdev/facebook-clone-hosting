import { formatDistanceToNow, format } from 'date-fns';

// e.g., "5 hours ago"
// e.g., "October 12, 2024"
export const DateFormating = (date) => {
    // Parse the date from the post object
    const parsedDate = date?.toDate ? date.toDate() : new Date(date);

    // Format post date based on how recent it is
    const formattedDate = (Date.now() - parsedDate.getTime() < 7 * 24 * 60 * 60 * 1000)
        ? formatDistanceToNow(parsedDate, { addSuffix: true }).replace('about ', '') // e.g., "5 hours ago"
        : format(parsedDate, 'MMMM d, yyyy'); // e.g., "October 12, 2024"

    return formattedDate
}
