export interface NavItem {
  label: string;
  href: string;
}

export interface UserData {
  name: string;
  email: string;
  photo: string;
}

export interface MenuProps {
  user: UserData;
  navItems: NavItem[];
  ref?: any;
}

export interface MobileMenuHandler {
  openMenu: boolean;
}

export interface MobileMenuProps {
  onChange: (data: MobileMenuHandler) => void;
}
