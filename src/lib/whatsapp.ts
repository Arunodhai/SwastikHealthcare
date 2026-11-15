// WhatsApp number that receives appointment requests.
// India country code (+91) followed by 9995290251.
export const APPOINTMENT_WHATSAPP_NUMBER = '919995290251';

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
