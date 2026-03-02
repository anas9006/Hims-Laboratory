import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Format a date for display: "12 Feb 2026"
 * Accepts Date objects, ISO strings, or "YYYY-MM-DD" strings.
 * Returns original value if parsing fails.
 */
export function formatDate(dateValue) {
    if (!dateValue) return '';
    try {
        const d = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
        if (isNaN(d.getTime())) return dateValue;
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
        return dateValue;
    }
}

/**
 * Format a time for display: "02:30 PM"
 * Accepts "HH:MM:SS", "HH:MM", or Date objects.
 */
export function formatTime(timeValue) {
    if (!timeValue) return '';
    try {
        // If it's a time-only string like "14:30:00" or "14:30"
        if (typeof timeValue === 'string' && /^\d{2}:\d{2}/.test(timeValue)) {
            const [h, m] = timeValue.split(':').map(Number);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const hour12 = h % 12 || 12;
            return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
        }
        // If it's a Date object
        if (timeValue instanceof Date) {
            return timeValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        }
        return timeValue;
    } catch {
        return timeValue;
    }
}

/**
 * Format a date + time for display: "12 Feb 2026  02:30 PM"
 */
export function formatDateTime(dateValue, timeValue) {
    const d = formatDate(dateValue);
    const t = timeValue ? formatTime(timeValue) : '';
    return t ? `${d}  ${t}` : d;
}
