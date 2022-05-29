export function todaysDate(): string {
    const now = new Date();
    return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
}

export function formatTime(date_now: number, cityname?: string): string {
    // TODO: get local time to the location of the city
    let now = new Date(date_now);
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} `
}