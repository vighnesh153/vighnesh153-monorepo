import { useGlobalState } from '@vighnesh153/react-hooks';

type UseAdminSideNavigationReturnType = {
  isItemOpen: (itemId: string) => boolean;
  openItem: (itemId: string) => void;
  closeItem: (itemId: string) => void;
};

export function useAdminSideNavigation(): UseAdminSideNavigationReturnType {
  const [openNestedItems = [], setOpenNestedItems] = useGlobalState('admin/side navigation', [] as string[]);

  const isItemOpen = (itemId: string): boolean => openNestedItems.includes(itemId);

  const openItem = (itemId: string): void => {
    const allItemIds = new Set(openNestedItems);
    allItemIds.add(itemId);
    setOpenNestedItems(Array.from(allItemIds));
  };

  const closeItem = (itemId: string): void => {
    setOpenNestedItems(openNestedItems.filter((id) => id !== itemId));
  };

  return {
    isItemOpen,
    openItem,
    closeItem,
  };
}
