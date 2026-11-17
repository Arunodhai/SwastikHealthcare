// WhatsApp number that receives appointment requests.
// India country code (+91) followed by 9995290251.
export const APPOINTMENT_WHATSAPP_NUMBER = '919995290251';

/** Display format for the clinic phone, e.g. +91 99952 90251. */
export function formatPhoneDisplay(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/[^0-9]/g, '');
  if (!digits) return '';

  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return trimmed.startsWith('+') ? trimmed : `+${digits}`;
}

/** Dialable format for tel: links, e.g. +919995290251. */
export function toDialableNumber(value: string): string {
  const digits = value.replace(/[^0-9]/g, '');
  return digits ? `+${digits}` : '';
}

export function buildWhatsAppUrl(
  message: string,
  phone: string = APPOINTMENT_WHATSAPP_NUMBER
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp with a pre-filled message.
 * Call this synchronously from a submit handler so browsers allow the new tab.
 * Returns the generated URL so the UI can offer a fallback link.
 */
export function openWhatsApp(
  message: string,
  phone: string = APPOINTMENT_WHATSAPP_NUMBER
): string {
  const url = buildWhatsAppUrl(message, phone.trim() || APPOINTMENT_WHATSAPP_NUMBER);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
