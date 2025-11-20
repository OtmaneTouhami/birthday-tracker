import { format, differenceInYears } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch {
    return dateString;
  }
};

export const formatBirthday = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM d');
  } catch {
    return dateString;
  }
};

export const calculateAge = (birthDateString: string): number => {
  try {
    const birthDate = new Date(birthDateString);
    return differenceInYears(new Date(), birthDate);
  } catch {
    return 0;
  }
};

export const formatDateForInput = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  } catch {
    return '';
  }
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};
