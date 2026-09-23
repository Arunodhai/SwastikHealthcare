import { ClinicSettings, ManagedPage } from '../types/clinic';

export function getManagedPage(settings: ClinicSettings, pageKey: ManagedPage['pageKey']): ManagedPage {
  return settings.navbarPages?.find((page) => page.pageKey === pageKey) || {
    pageKey,
    filters: [],
    sections: [],
  };
}

export const getManagedSection = (page: ManagedPage, key: string) =>
  page.sections?.find((section) => section.key === key);
