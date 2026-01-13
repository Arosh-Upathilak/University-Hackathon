export const DateTimeConfig = (dateTime: string | Date): string => {
  const date = new Date(dateTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "P.M." : "A.M.";
  hours = hours % 12 || 12; 

  return `${year}-${month}-${day} ${hours}.${minutes} ${ampm}`;
};


export const CompetitionStatus = (
  startDateTime: string | Date,
  endDateTime: string | Date
): string => {
  const now = new Date(); 

  const start = new Date(startDateTime); 
  const end = new Date(endDateTime);     

  if (now.getTime() < start.getTime()) {
    return "Upcoming";
  }

  if (
    now.getTime() >= start.getTime() &&
    now.getTime() <= end.getTime()
  ) {
    return "Live";
  }

  return "Completed";
};